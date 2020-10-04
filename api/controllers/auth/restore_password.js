require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const jwt = require('jsonwebtoken');
const {User} = require('../../db');

module.exports = async (ctx,res) => {
    const {email,newPassword} = ctx.params;
    const data = await User.findOne({where:{email:email}, attributes:['id','name','surname','avatar']})
    .then(async user =>{
        if(!user)
            throw new MoleculerError("No email registred",401,"RESTORE_FAILED", { nodeID: ctx.nodeID, action:ctx.action.name });
    
        User.update({
            password : newPassword
        },{
            where:{email}
        })

        return "password changed!"

    })
    /*.then(async user => {
        if(!user || (user && !await user.matchPassword(password)))
            throw new MoleculerError("Email is not valid", 401, "RESTORE_FAILED", { nodeID: ctx.nodeID, action:ctx.action.name });
        const payload = {id: user.id}
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        user.password = undefined;
        return {user, token};
    });*/
    return {data};
}