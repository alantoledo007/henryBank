const { User } = require("../../db");
const LocalStorage = require("node-localstorage").LocalStorage;
const nodemailer = require("nodemailer");
const sender = require("../../emails/sender");
require("dotenv").config();

module.exports = async (ctx) => {
	const newUser = await User.create(ctx.params);
	newUser.password = await newUser.encryptPassword(newUser.password);
	await newUser.save();

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

	return {
		id: newUser.id,
		email: newUser.email,
	};
};
