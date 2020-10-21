require("dotenv").config();
const {User,Transaction,Account} = require('../../db');
const jwt = require ('jsonwebtoken');
const { transaction } = require("../authController");
const {MoleculerError} = require('moleculer').Errors;


module.exports = async (ctx)=>{
    const {id} = ctx.meta.user
    
    const user = await User.findOne({where:{id},include:Account})

    const account = await Account.findOne({where:{id:user.accounts[0].id},include:Transaction})
    
    const transaccionList = await account.Transactions
        
    return transaccionList
}