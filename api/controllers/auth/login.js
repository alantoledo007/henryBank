require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const jwt = require('jsonwebtoken');
const {User, Account} = require('../../db');

module.exports = async (ctx,res) => {
    const {email, password} = ctx.params;

    const data = await User.findOne({where:{email:email}, include:{model:Account, through:'account_user',as:'accounts'}, attributes:['id','name','surname', 'avatar','password', 'dataCompletedAt','emailVerifiedAt','email']})
    .then(async user => {
        if(!user || (user && !await user.matchPassword(password)))
            throw new MoleculerError("Email or password wrong", 401, "AUTHENTICATION_FAILED", { nodeID: ctx.nodeID, action:ctx.action.name });
        const payload = {id: user.id}
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        user.password = undefined;
        let recharge_code = null;
        let cvu = null;
        let balance = 0;
        if(user.accounts.length){
            let acc = user.accounts.find(item => item.currency === 'ars').toJSON();
            cvu = acc.cvu;
            recharge_code = acc.recharge_code;
            balance = acc.balance;
        }
        return {user:{...user.toJSON(), cvu, recharge_code, balance}, token};
    });
    return {data};
}