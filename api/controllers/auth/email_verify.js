require("dotenv").config();
const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const sender = require("../../emails/sender");
const { MoleculerError } = require("moleculer").Errors;
const { Op } = require("sequelize");
const LocalStorage = require("node-localstorage").LocalStorage; //localStorage backend-side

async function email_verify(ctx) {
	const { email, code } = ctx.params;

	const user = await User.findOne({
		where: { email, emailVerifiedAt: { [Op.is]: null } },
		attributes: ["id", "email", "emailVerifiedAt", "dataCompletedAt"],
	});
	
	if (!user) {
		//si retornamos un 404 o si indicamos que el correo ya está verificado... estaríamos dando información de más.
		throw new MoleculerError(
			"It is not allowed to verify: " + email,
			417,
			"EXPECTATION_FAILED",
			{ nodeID: ctx.nodeID, action: ctx.action.name }
		);
	}

	const localStorage = new LocalStorage("./email_validation_storage");
	const limitTime = 3600000; //una hora en milisegundos
	let codeData = JSON.parse(await localStorage.getItem(user.id));

	if (
		codeData.expired === true ||
		codeData.code !== code ||
		Date.now() > codeData.createdAt + limitTime
	) {
		throw new MoleculerError("The code is not valid", 401, "UNAUTHORIZED", {
			nodeID: ctx.nodeID,
			action: ctx.action.name,
		});
	}

	user.emailVerifiedAt = Date.now();
	await user.save();

	codeData.expired = true;
	await localStorage.setItem(user.id, JSON.stringify(codeData));

	const payload = { id: user.id };
	const token = await jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});

	return { data: { user, token } };
}

module.exports = email_verify;
