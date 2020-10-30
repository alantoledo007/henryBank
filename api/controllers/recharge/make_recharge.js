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
	const { amount, recharge_code } = ctx.params;
	const cce_user_id = ctx.meta.user.id;

	const cce_user = await User.findOne({ where: { id: cce_user_id } });

	if (cce_user.role !== "CCE") {
		throw new MoleculerError(
			`Usuario no autorizado para efectuar recargas de saldo`,
			401,
			"UNAUTHORIZED",
			{ nodeID: ctx.nodeID, action: ctx.action.name }
		);
	}

	if (amount < 100) {
		throw new MoleculerError(
			`Monto minimo de recarga no alcanzado`,
			401,
			"INVALID_AMOUNT",
			{ nodeID: ctx.nodeID, action: ctx.action.name }
		);
	}

	if (String(recharge_code).length !== 10) {
		throw new MoleculerError(
			"Codigo de recarga invalido",
			401,
			"INVALID_RECHARGE_CODE",
			{ nodeID: ctx.nodeID, action: ctx.action.name }
		);
	}

	const client = await User.findOne({
		where: { id: client_id },
		include: Account,
	});

	if (!client) {
		throw new MoleculerError("User doesn't exists", 410, "USER_NOTFOUND", {
			nodeID: ctx.nodeID,
			action: ctx.action.name,
		});
	}

	if (client.id === cce_user_id) {
		throw new MoleculerError(
			`You can't send money to yourself`,
			402,
			"WRONG_RECEPTOR",
			{ nodeID: ctx.nodeID, action: ctx.action.name }
		);
	}

	const reference = await codeGenerator();

	const recharge = await Transaction.create({
		title: `Recargaste $ ${amount}`,
		description: "Recarga de saldo",
		amount,
		account_id: client.accounts[1].id,
		reference,
		currency: "ARS",
	});

	const account = await Account.findOne({
		where: { id: recharge.account_id },
	});

	account.balance = account.balance + amount;
	await account.save();

	return recharge;
};
