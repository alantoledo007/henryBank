const { User, Account } = require("../../db");
const { MoleculerError } = require("moleculer").Errors;




module.exports = async (ctx)=>{
    const {id} = ctx.meta.user

    const profile = await User.findOne({where:{id},attributes:['name','surname','avatar','doc_type','doc_number','phone_number','email','address_street','address_number','locality','province','createdAt']})
    
    return {profile}
    
}