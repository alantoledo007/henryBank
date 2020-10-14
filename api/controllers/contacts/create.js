require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const jwt = require('jsonwebtoken');
const {User, Contact} = require('../../db');

module.exports = async (ctx) => {
    const {email,nickname} = ctx.params;
    const {id} = ctx.meta.user;
    const user = await User.findByPk(id);
    if(!user){
        /*
            la id almacenada es válida, pero si a pesar de eso no se encuentra el usuario,
            quiere decir que el mísmo fué eliminado y el token no expiró.
        */
        throw new MoleculerError("User deleted",410,"DELETED", { nodeID: ctx.nodeID, action:ctx.action.name });
    }

    const toSave = await User.findOne({where:{email:email}});
    if(!toSave){
        //no es un usuario registrado.
        throw new MoleculerError("User (contact) not found",404,"NOT_FOUND", { nodeID: ctx.nodeID, action:ctx.action.name });
    }

    const exists = await Contact.findOne({where:{user_id:id,contact_id:toSave.id}});
    if(exists){
        //El contacto ya existe
        throw new MoleculerError("Contact exists",422,"EXISTS", { nodeID: ctx.nodeID, action:ctx.action.name });
    }

    const contact = await Contact.create({email:toSave.email, contact_id: toSave.id, user_id: id, nickname});
    
    return {data:{...contact.dataValues, contact:toSave, user}};
}