require("dotenv").config();
const {User} = require('../../db');
const sender = require('../../emails/sender');
const { MoleculerError } = require("moleculer").Errors;
const { Op } = require("sequelize");
const LocalStorage = require('node-localstorage').LocalStorage; //localStorage backend-side

async function send_code_email_verifier(ctx){
    const {email} = ctx.params;
    
    
    const user = await User.findOne({where:{email, emailVerifiedAt: {[Op.is]: null}},attributes:['id','email','emailVerifiedAt']});
    if(!user){
        //si retornamos un 404 o si indicamos que el correo ya está verificado... estaríamos dando información de más.
        throw new MoleculerError("It is not allowed to send verification emails to: "+email, 417, "EXPECTATION_FAILED", { nodeID: ctx.nodeID, action:ctx.action.name });
    }
    
    const code = String(Math.floor(100000 + Math.random() * 900000)); // se genera un código de 6 dígitos.
    const localStorage = new LocalStorage("./email_validation_storage");
    await localStorage.setItem(user.id,JSON.stringify({
        code,
        expired: false,
        createdAt: Date.now()
    }));

    await sender({
        to:email,
        subject:'Su código de verificación',
        html: 'email_verifier',
        data:{app_name:'Quantum', code}
    });

    return {status:200, message: "E-mail sent."};
}

module.exports = send_code_email_verifier