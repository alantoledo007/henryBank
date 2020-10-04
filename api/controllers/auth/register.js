const {User} = require('../../db');

module.exports = async (ctx) => {
	const newUser = await User.create(ctx.params);
	newUser.password = await newUser.encryptPassword(newUser.password);
	await newUser.save();
};
