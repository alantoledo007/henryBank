require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const jwt = require('jsonwebtoken');
const LocalStorage = require('node-localstorage').LocalStorage; //localStorage backend-side
const {User} = require('../../db');
const bcrypt = require("bcrypt");


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
        console.log(codeLocal)
        const limitTime = 3600000;
        if(codeLocal.code !== code || codeLocal.expired === true || Date.now() > codeLocal.createdAt + limitTime){
            throw new MoleculerError("Invalid code",401,"INVALID_RESTORE_CODE", { nodeID: ctx.nodeID, action:ctx.action.name });
        }

        //encriptamos la nueva contraseña
        const encryptPassword = async (password) => {
            const salt = await bcrypt.genSalt(10);
            const hash = bcrypt.hash(password, salt);
            return hash;
        };

        //hacemos un update en la db con la nueva contraseña

        User.update({
            password : encryptPassword(newPassword)
        },{
            where:{email}
        })

      // todo : cambiar el estado de expiracion
      
        return "password changed!"

    })
    
    return {data};
}