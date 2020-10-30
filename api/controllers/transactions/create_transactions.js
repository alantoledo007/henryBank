require("dotenv").config();
const { User, Transaction, Account } = require("../../db");
const { MoleculerError } = require("moleculer").Errors;

const codeGenerator = async () => {
	let code = Math.floor(Math.random() * 100000000);

	const transaction = await Transaction.findOne({
		where: { reference: code },
	});
	if (!transaction) {
		return code;
	} else {
		return codeGenerator();
	}
};

module.exports = async (ctx) => {
	const getUserId = async (identifier) => {
		//revisamos si hay un @, lo que quiere decir que es un email
		for (let i = 0; i < identifier.length; i++) {
			if (identifier[i] === "@") {
				//entonces buscamos el id de ese usuario y lo devolvemos.
				const emailID = await User.findOne({
					where: { email: identifier },
					attributes: ["id"],
				});
				return emailID.dataValues.id;
			}
		}
		return identifier;
	};

	const { identifier, amount, description } = ctx.params;
	const { id } = ctx.meta.user;

	const user_id = await getUserId(identifier);

	const usuario_emisor = await User.findOne({
		where: { id },
		include: Account,
	});
	const usuario_receptor = await User.findOne({
		where: { id: user_id },
		include: Account,
	});

	//Verificacion no mandarse balance a sí mismo
	if (id == user_id) {
		throw new MoleculerError(
			`You can't send money to yourself`,
			402,
			"WRONG_RECEPTOR",
			{ nodeID: ctx.nodeID, action: ctx.action.name }
		);
	}

	//Verificacion de balance
	if (
		usuario_emisor.accounts.find((item) => item.currency === "ars")
			.balance < amount
	) {
		throw new MoleculerError("Sos pobre", 409, "NOTENOUGH_BALANCE", {
			nodeID: ctx.nodeID,
			action: ctx.action.name,
		});
	}

	const reference_code = await codeGenerator();

	const emisor_account = await Account.findOne({
		where: {
			id: usuario_emisor.accounts.find((item) => item.currency === "ars")
				.id,
		},
	});

	const transaccion = await Transaction.create({
		title: `Enviaste $${amount} a ${usuario_receptor.name} ${usuario_receptor.surname}`,
		description: "Transferencia",
		message: description,
		amount: 0 - amount,
		account_id: usuario_emisor.accounts.find(
			(item) => item.currency === "ars"
		).id,
		reference: reference_code,
		currency: "ARS",
	}).then(async (res) => {
		emisor_account.balance = emisor_account.balance - amount;
		await emisor_account.save();

		Transaction.create({
			title: `Recibiste $${amount} de ${usuario_emisor.name} ${usuario_emisor.surname}`,
			description: "Transferencia",
			message: description,
			amount,
			account_id: usuario_receptor.accounts.find(
				(item) => item.currency === "ars"
			).id,
			reference: reference_code,
			currency: "ARS",
		}).then(async () => {
			const receptor_account = await Account.findOne({
				where: {
					id: usuario_receptor.accounts.find(
						(item) => item.currency === "ars"
					).id,
				},
			});

			receptor_account.balance = receptor_account.balance + amount;
			await receptor_account.save();
		});

		return res;
	});

	return { transaccion, balance: emisor_account.balance };
};
