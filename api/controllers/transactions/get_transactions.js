require("dotenv").config();
const { User, Transaction, Account } = require("../../db");
const jwt = require("jsonwebtoken");
const { transaction } = require("../authController");
const { MoleculerError } = require("moleculer").Errors;
const { Op } = require("sequelize");

module.exports = async (ctx) => {
	const { id } = ctx.meta.user;
	const { startDate, endDate } = ctx.params;

	if (startDate && endDate) {
		const user = await User.findOne({ where: { id }, include: Account });

		const account = await Account.findOne({
			where: { id: user.accounts.find(item => item.currency === 'ars').id },
		});

		const transaccionList = await Transaction.findAll({
			where: {
				account_id: account.id,
				createdAt: {
					[Op.between]: [
						`${startDate}T00:00:00.000Z`,
						`${endDate}T23:59:59.999Z`,
					],
				},
			},
		});

		return transaccionList;
	} else {
		const user = await User.findOne({ where: { id }, include: Account });

		const account = await Account.findOne({
			where: { id: user.accounts.find(item => item.currency === 'ars').id },
			include: Transaction,
		});

		const transaccionList = await account.Transactions;

		return transaccionList;
	}
};
