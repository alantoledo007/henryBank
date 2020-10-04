require("dotenv").config();
const { Errors } = require("moleculer-web");
const jwt = require('jsonwebtoken');
const { MoleculerError } = require("moleculer").Errors;
const secret = process.env.JWT_SECRET;
const {actions_protected} = require('../../config');

async function authenticate(ctx, route, req) {
    // Read the token from header
    
    if(!actions_protected.includes(req.$action.name)) return null;
    
    const auth = req.headers["authorization"];

    if(!auth)
        throw new MoleculerError("The authorization header is required", 422, "AUTHENTICATION_FAILED", { nodeID: ctx.nodeID, action:req.$action.name });

    if (auth.startsWith("Bearer")) {
        const token = auth.split(' ')[1];
        let data = {token};
        await jwt.verify(token, secret, async (err, decoded) => {
            //const blacklist = await clearBlacklist();
            // console.log(token);
            if(err) {
                throw new Errors.UnAuthorizedError(Errors.ERR_INVALID_TOKEN);
            }
            // if (inArray(blacklist, token)){
            //     console.log('blacklisted');
            //     return res.sendStatus(401)
            // }
            data.id = decoded.id;
        });
        return data;
    }

    throw new Errors.UnAuthorizedError(Errors.ERR_INVALID_TOKEN);
}

module.exports = authenticate;