require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const jwt = require('jsonwebtoken');
const {User, Account} = require('../../db');
const Accounts = require("../../models/Accounts");

module.exports = async (ctx,res) => {
    const {email, password} = ctx.params;

    const data = await User.findOne({where:{email:email}, include:Account, attributes:['id','name','surname', 'avatar','password', 'dataCompletedAt','emailVerifiedAt','email']})
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
        if(user.Accounts.length){
            let acc = Accounts[0];
            cvu = acc.cvu;
            recharge_code = acc.rechage_code;
        }
        return {user:{...user.toJSON(), cvu, recharge_code}, token};
    });
    return {data};
}