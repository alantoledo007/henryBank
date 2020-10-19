const { User } = require("../../db");
const LocalStorage = require("node-localstorage").LocalStorage;
const sender = require("../../emails/sender");
const { MoleculerError } = require("moleculer").Errors;
require("dotenv").config();

module.exports = async (ctx) => {
	let data = ctx.params;
	
	let existsUser = await User.findOne({where:{email:data.email}});
	if(existsUser)
		throw new MoleculerError("An user is registered with those email address.", 422, "EMAIL_DUPLICATED", { nodeID: ctx.nodeID, action:ctx.action.name });

	let newUser = new User();

	newUser.password = await newUser.encryptPassword(data.password);
	newUser.email = data.email;

	await newUser.save()

	const localStorage = new LocalStorage("./email_validation_storage");

	const code = String(Math.floor(100000 + Math.random() * 900000));

	await localStorage.setItem(
		newUser.id,
		JSON.stringify({
			code,
			expired: false,
			createAt: Date.now(),
		})
	);

	await sender({
		to: newUser.email,
		subject: "Su código de verificación",
		html: "email_verifier",
		data: { app_name: "Quantum", code },
	});

	return {data:{
		id: newUser.id,
		email: newUser.email,
	}};
};
