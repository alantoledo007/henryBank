require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const jwt = require('jsonwebtoken');
const {Contact} = require('../../db');

module.exports = async (ctx) => {
    const {id} = ctx.params;
    const token_id = ctx.meta.user.id;
    console.log('ID RECIBIDO:',id)
    const contact = await Contact.findOne({where:{user_id: token_id, id: id}});
    if(!contact){
        console.log('no se encontro el user')
        /*
            la id almacenada es válida, pero si a pesar de eso no se encuentra el usuario,
            quiere decir que el mísmo fué eliminado y el token no expiró.
        */
        throw new MoleculerError("Contact not found",404,"NOT_FOUND", { nodeID: ctx.nodeID, action:ctx.action.name });
    }
    await contact.destroy();
    
    return {status:204, message:"NOT CONTENT"};
}