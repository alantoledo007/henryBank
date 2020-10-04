const {User} = require('../../db');

module.exports = async (ctx) => {
    const user = await User.create(ctx.params);
    return user;
}
