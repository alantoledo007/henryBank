require("dotenv").config();
const {User,Transaction,Account} = require('../../db');
const jwt = require ('jsonwebtoken');
const { transaction } = require("../authController");
const {MoleculerError} = require('moleculer').Errors;

module.exports = async (ctx)=>{

    const getUserId = async (identifier) =>{
        //revisamos si hay un @, lo que quiere decir que es un email
        for(let i = 0;i < identifier.length ; i++){
            if(identifier[i] === '@'){
                //entonces buscamos el id de ese usuario y lo devolvemos. 
                const emailID = await User.findOne({where:{email:identifier},attributes:['id']})
                return emailID.dataValues.id
            }
        }
        return identifier
    }


    const {identifier,amount,description} = ctx.params
    const {id} = ctx.meta.user

    const user_id = await getUserId(identifier)
    
    const usuario_emisor = await User.findOne({where:{id},include:Account})
    const usuario_receptor = await User.findOne({where:{id:user_id},include:Account})

    //Verificacion no mandarse balance a sí mismo
    if(id == user_id){
        throw new MoleculerError(`You can't send money to yourself`,402,"WRONG_RECEPTOR",{ nodeID: ctx.nodeID, action:ctx.action.name })
    }

    //Verificacion de balance   
    if(usuario_emisor.accounts[0].balance < amount){
        throw new MoleculerError("Sos pobre",409,"NOTENOUGH_BALANCE",{ nodeID: ctx.nodeID, action:ctx.action.name })
    }   


    const transaccion = Transaction.create({
        title:`Enviaste ${amount} a ${usuario_receptor.name} ${usuario_receptor.surname}`,
        description:description,
        amount: 0-amount,
        account_id:usuario_emisor.accounts[0].id
    }).then( async (res)=>{
        
        const emisor_account = await Account.findOne({
            where: { id: usuario_emisor.accounts[0].id },
        });
    
        emisor_account.balance = emisor_account.balance - amount;
        await emisor_account.save();


        Transaction.create({
            title:`Recibiste ${amount} de ${usuario_emisor.name} ${usuario_emisor.surname}`,
            description:description,
            amount,
            account_id:usuario_receptor.accounts[0].id
        }).then( async ()=>{
            
            const receptor_account = await Account.findOne({
                where: { id: usuario_receptor.accounts[0].id },
            });
        
            receptor_account.balance = receptor_account.balance + amount;
            await receptor_account.save();

        })
        
        return res
    })

    
    return transaccion
}
 