require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const jwt = require('jsonwebtoken');
const LocalStorage = require('node-localstorage').LocalStorage; //localStorage backend-side
const {User} = require('../../db');
const bcrypt = require("bcrypt");
const sender = require('../../emails/sender');


const encryptPassword = async (password) => {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        };

module.exports = async (ctx,res) => {
    const codeStorage = new LocalStorage('./storage');
    const {email,newPassword,code} = ctx.params;
    
    
    //buscamos el usuario con ese email para cambiarle
    //la contraseña


    const data = await User.findOne({where:{email:email}, attributes:['id','name','surname','avatar']})
    .then(async user =>{
        if(!user)
            throw new MoleculerError("No email registered",401,"RESTORE_FAILED", { nodeID: ctx.nodeID, action:ctx.action.name });
    
        //comprobamos la validez del código enviado
        // valido : 1) coincide 2) no esta expirado 3) no pasó más de una hora

        const codeLocal = JSON.parse(codeStorage.getItem(user.id +""))
        
        const limitTime = 3600000;
        //if(codeLocal.code !== code || codeLocal.expired === true || Date.now() > codeLocal.createdAt + limitTime){
        if(codeLocal.code !== code || Date.now() > codeLocal.createdAt + limitTime){
            throw new MoleculerError("Invalid code or expired",401,"INVALID_RESTORE_CODE", { nodeID: ctx.nodeID, action:ctx.action.name });
        }

      

        //hacemos un update en la db con la nueva contraseña encriptada

        User.update({
            password : await encryptPassword(newPassword)
        },{
            where:{email}
        })
        .then(() => console.log("password changed") )
        .catch(err => console.log("ERROR: ",err))

        // creamos un nuevo objeto para cambiarle el estado en el LOCALSTORAGE
      
        const password_expired = {
            code : codeLocal.code,
            expired : true,
            createAt : Date.now()
        }

        //guardamos el objeto con el nuevo estado
        codeStorage.setItem(user.id, JSON.stringify(password_expired));
        

        //enviamos un correo avisando que la contraseña fue restablecida de forma satisfactoria

        await sender({
            to:email,
            subject:'Cambio de contraseña',
            html: 'email_pass_restore_confirmation',
            data:{app_name:'Quantum', code}
        });

        return "password changed!"

    })
    
    return {data};
}