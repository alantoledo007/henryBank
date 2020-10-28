const { MoleculerError } = require("moleculer").Errors;
const {User, Account} = require('../../db');


module.exports = async (ctx) =>{

    const {id} = ctx.meta.user

    const user = await User.findOne({
        where:{
            id:id
        },
        include:Account
    })

    return user.accounts
}