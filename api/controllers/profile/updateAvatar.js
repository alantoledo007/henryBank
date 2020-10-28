const { User } = require("../../db");

module.exports = async (ctx) => {
    const {id} = ctx.meta.user;
    const { avatar } = ctx.params;
    
    const profile = await User.findOne({
        where: {
            id
        }
    });

    await profile.update({
        avatar
    });

    await profile.save();

    return {profile}
}