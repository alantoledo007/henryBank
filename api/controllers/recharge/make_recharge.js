const { User, Transaction } = require("../../db");

module.exports = async (ctx) => {
	const { amount, recharge_code } = ctx.params;
	const client_id = ctx.meta.user;

	const cce_user = await User.findOne({ where: { role: "CCE" } });

	await Transaction.create({
		title: `Recarga de ${amount}`,
		description: "Recarga de saldo",
		amount: 0 - amount,
		user_id: cce_user.id,
		type: "egreso",
	});

	await Transaction.create({
		title: `Recargaste ${amount}`,
		description: "Recarga de saldo",
		amount,
		user_id: client_id,
		type: "ingreso",
	});

	await User.increment({ balance: +amount }, { where: { id: client_id } });
	await User.increment({ balance: -amount }, { where: { id: cce_user.id } });

	//API request simulation
	return {
		recharge_code,
		recharge_date: new Date(),
		commerce_name: "comercio 01",
		commerce_address: "Av. Libertador 2300",
		recharge_amount: amount,
	};
};
