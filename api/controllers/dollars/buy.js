const Axios = require("axios");
const { User, Account, Transaction } = require("../../db");
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
	const { id } = ctx.meta.user;
	const { amount } = ctx.params;

	const user = await User.findOne({
		where: {
			id: id,
		},
		include: {
			model: Account,
			through: "account_user",
			as: "accounts",
		},
	});

	if (user == null) {
		throw new MoleculerError(
			"User doesn't exists by its was deleted",
			410,
			"USER_NOT_FOUND",
			{
				nodeID: ctx.nodeID,
				action: ctx.action.name,
			}
		);
	}

	const usd = await Axios.get(
		"https://free.currconv.com/api/v7/convert?q=USD_ARS&compact=ultra&apiKey=771ba0bd5ac4f83cd414"
	)
		.then((res) => res.data)
		.then((res) => {
			return res.USD_ARS;
		})
		.catch((err) => {
			throw new MoleculerError(
				"Requests exceeded on external API",
				417,
				"TRY_AGAIN_ON_1_HOUR",
				{
					nodeID: ctx.nodeID,
					action: ctx.action.name,
				}
			);
		});

	let cost = parseFloat((usd * amount).toFixed(2));
	cost = cost + cost * 0.3;
	cost = cost + cost * 0.35;
	//const cost = 100;

	let accounts_id = {};
	user.accounts.forEach((item) => {
		accounts_id[item.currency] = item.id;
	});
	const account_ars = await Account.findOne({
		where: { id: accounts_id.ars },
	});

	if (account_ars.balance < cost) {
		throw new MoleculerError(
			"Necesitas AR$" + cost,
			403,
			"INSUFFICIENT_FOUNDS",
			{
				nodeID: ctx.nodeID,
				action: ctx.action.name,
			}
		);
	}
	const account_usd = await Account.findOne({
		where: { id: accounts_id.usd },
	});

	account_ars.balance = account_ars.balance - cost;
	account_usd.balance = account_usd.balance + amount;

	await account_ars.save();
	await account_usd.save();

	const reference = await codeGenerator();

	await Transaction.create({
		title: `Compraste $${amount} dolares`,
		description: "Compra de dolares",
		message: description,
		amount: 0 - cost,
		account_id: usuario_emisor.accounts.find(
			(item) => item.currency === "ars"
		).id,
		reference,
		currency: "ARS",
	});

	await Transaction.create({
		title: `Compraste $${amount} dolares`,
		description: "Compra de dolares",
		message: description,
		amount: amount,
		account_id: usuario_emisor.accounts.find(
			(item) => item.currency === "usd"
		).id,
		reference,
		currency: "USD",
	});

	return { usdBalance: account_usd.balance, arsBalance: account_ars.balance };
};
