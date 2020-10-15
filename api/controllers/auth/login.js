require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const jwt = require('jsonwebtoken');
const {User} = require('../../db');

module.exports = async (ctx,res) => {
    const {email, password} = ctx.params;
    const data = await User.findOne({where:{email:email}, attributes:['id','name','surname','avatar','password', 'dataCompletedAt','emailVerifiedAt','email', 'recharge_code']})
    .then(async user => {
        if(!user || (user && !await user.matchPassword(password)))
            throw new MoleculerError("Email or password wrong", 401, "AUTHENTICATION_FAILED", { nodeID: ctx.nodeID, action:ctx.action.name });
        const payload = {id: user.id}
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        user.password = undefined;
        return {user, token};
    });
    return {data};
}