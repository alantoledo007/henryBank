const { User } = require("../../db");
const LocalStorage = require("node-localstorage").LocalStorage;
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = (mail, code) => {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	// send mail with defined transport object
	transporter.sendMail({
		from: '"Guitapp" <' + process.env.EMAIL_USER + ">", // sender address
		to: mail, // `${email}` ??
		subject: "Verificacion de email ✔", // Subject line
		text: `${code}`, // code
	});
};

module.exports = async (ctx) => {
	const newUser = await User.create(ctx.params);
	newUser.password = await newUser.encryptPassword(newUser.password);
	await newUser.save();

	const localStorage = new LocalStorage("./email_validation_storage");
	const code = String(Math.floor(100000 + Math.random() * 900000));

	await sendMail(newUser.email, code);

	const verify_code = {
		code,
		expired: false,
		createAt: Date.now(),
	};

	//guardamos la informacion para verificar email
	//en el localStorage de BackEnd
	await localStorage.setItem(newUser.id, JSON.stringify(verify_code));

	return {
		id: newUser.id,
		email: newUser.email,
	};
};
