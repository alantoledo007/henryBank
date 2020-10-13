require("dotenv").config();
const {User,Transaction} = require('../../db');
const jwt = require ('jsonwebtoken');
const { transaction } = require("../authController");
const {MoleculerError} = require('moleculer').Errors;

module.exports = async (ctx)=>{

    const {user_id,amount,description} = ctx.params
    const {id} = ctx.meta.user

    const usuario_emisor = await User.findOne({where:{id}})
    const usuario_receptor = await User.findOne({where:{id:user_id}})

    //Verificacion no mandarse balance a sí mismo
    if(id == user_id){
        throw new MoleculerError(`You can't send money to yourself`,402,"WRONG_RECEPTOR",{ nodeID: ctx.nodeID, action:ctx.action.name })
    }

    //Verificacion de balance 
    if(usuario_emisor.balance < amount){
        throw new MoleculerError("Sos pobre",409,"NOTENOUGH_BALANCE",{ nodeID: ctx.nodeID, action:ctx.action.name })
    }   


    const transaccion = Transaction.create({
        title:`Enviaste ${amount} a ${usuario_receptor.name} ${usuario_receptor.surname}`,
        description:description,
        amount: 0-amount,
        user_id:id
    }).then((res)=>{
        
        User.update({
            balance: usuario_emisor.balance - amount
        },{where:{id}})

        Transaction.create({
            title:`Recibiste ${amount} de ${usuario_emisor.name} ${usuario_emisor.surname}`,
            description:description,
            amount,
            user_id:user_id
        }).then(()=>{
            User.update({
                balance:usuario_receptor.balance+amount
            },{
                where:{id:user_id}
            })
        })
        
        return res
    })

    
    return transaccion
}
 