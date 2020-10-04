require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const LocalStorage = require('node-localstorage').LocalStorage; //localStorage backend-side
const {User} = require('../../db');
const nodemailer = require("nodemailer");


module.exports = async (ctx,res) => {
	
	const sendEmail = async (email,code) => {
		  // Generate test SMTP service account from ethereal.email
		  // Only needed if you don't have a real mail account for testing
		  let testAccount = await nodemailer.createTestAccount();

		  // create reusable transporter object using the default SMTP transport
		  let transporter = nodemailer.createTransport({
		    host: "smtp.ethereal.email",
		    port: 587,
		    secure: false, // true for 465, false for other ports
		    auth: {
		      user: testAccount.user, // generated ethereal user
		      pass: testAccount.pass, // generated ethereal password
		    },
		  });

		  // send mail with defined transport object
		  let info = await transporter.sendMail({
		    from: '"Fred Foo 👻" <foo@example.com>', // sender address
		    to: "saul.durgan@ethereal.email", // `${email}` ??
		    subject: "Hello ✔", // Subject line
		    text: `${code}`, // plain text body
		    html: `${code}`, // html body
		  });

		  console.log("Message sent: %s", info.messageId);
		  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		  // Preview only available when sending through an Ethereal account
		  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
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
		sendEmail(user.email,restoreCode);

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