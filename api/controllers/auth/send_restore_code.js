require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const LocalStorage = require('node-localstorage').LocalStorage; //localStorage backend-side
const {User} = require('../../db');
const nodemailer = require("nodemailer");
const sender = require('../../emails/sender');

module.exports = async (ctx,res) => {
	
	const sendEmail = async (email,code) => {
		await sender({
	        to:email,
	        subject:'Su código para restablecer la contraseña',
	        html: 'email_pass_restore',
	        data:{app_name:'Quantum', code}
    	});

	}

	const localStorage = new LocalStorage('./storage');
	const {email} = ctx.params;

	
	const data = await User.findOne({
		where:{email:email},
		attributes:['id','name','surname']
	})
    .then(async user => {
    	if(!user)
            throw new MoleculerError("No existe un usuario asociado a ese email",401,"INNEX_EMAIL", { nodeID: ctx.nodeID, action:ctx.action.name });
    

    	const restoreCode = Math.floor(Math.random() * 899999 + 999999);
    	//envia el codigo al correo
		sendEmail(email,restoreCode);

    	const userId = user.id;//improve

		const password_reset = {
			code : restoreCode ,
			expired : false,
			createAt : Date.now()
		}
		
		//guardamos la informacion para cambiar passwd 
		//en el localStorage de BackEnd
		localStorage.setItem(userId, JSON.stringify(password_reset));

    })


	return "Codigo enviado!"
}