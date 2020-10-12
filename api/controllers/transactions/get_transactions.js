require("dotenv").config();
const {User,Transaction} = require('../../db');
const jwt = require ('jsonwebtoken');
const { transaction } = require("../authController");
const {MoleculerError} = require('moleculer').Errors;


module.exports = async (ctx)=>{
    const {id} = ctx.meta.user
    
    const transactionsList = Transaction.findAll({where:{user_id:id}})
        .then(transactions=>{
            return transactions
        })

    return transactionsList
}