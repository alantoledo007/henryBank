require("dotenv").config();
const { User } = require("../../../db");
const jwt = require("jsonwebtoken");
const sender = require("../../../emails/sender");
const { MoleculerError } = require("moleculer").Errors;
const { Op } = require("sequelize");
const LocalStorage = require("node-localstorage").LocalStorage; //localStorage backend-side

async function email_reset_verify(ctx) {
	const { id } = ctx.meta.user
	const { code } = ctx.params;

	const user = await User.findOne({
		where: { id },
		attributes: ["id", "email", "emailVerifiedAt", "dataCompletedAt", "name", "surname", "avatar"],
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

	const localStorage = new LocalStorage("./email_reset_storage");
	const limitTime = 3600000; //una hora en milisegundos
	let codeData = JSON.parse(await localStorage.getItem(user.id));

	//Si el código expiró o no es igual al que teníamos guardado en localStorage, devolvemos 401
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

	user.email = codeData.email;
	user.emailVerifiedAt = Date.now();
	await user.save();

	codeData.expired = true;
	await localStorage.setItem(user.id, JSON.stringify(codeData));

	//Devolvemos mensaje satisfactorio. Mandamos los datos del usuario
	return { status: 200, message: 'Dirección de e-mail actualizada exitosamente.', user};
}

module.exports = email_reset_verify;
