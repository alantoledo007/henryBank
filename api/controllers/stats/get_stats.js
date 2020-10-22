const { Transaction, Account, User } = require("../../db");
const { Op } = require("sequelize");
const moment = require("moment");
const _ = require("underscore");

module.exports = async (ctx) => {
	const client_id = ctx.meta.user.id;

	const client = await User.findOne({
		where: { id: client_id}, 
		include:{model:Account, through:'account_user',as:'accounts'}
		});

	let transactions;
	let data;
	let grouped_items;

	switch (ctx.params.period) {
		case "daily": {
			transactions = await Transaction.findAll({
				where: {
					account_id: client.accounts[0].id,
					createdAt: {
						[Op.gte]: moment().subtract(30, "days").toDate(),
					},
				},
			});
			data = transactions.map((transaction) => {
				return transaction.dataValues;
			});
			grouped_items = _.groupBy(data, (b) =>
				moment(b.createdAt).startOf("day").format("DD MM YYYY")
			);
			_.values(grouped_items).forEach((arr) =>
				arr.sort(
					(a, b) =>
						moment(a.createdAt).day() - moment(b.createdAt).day()
				)
			);
			break;
		}
		case "weekly": {
			transactions = await Transaction.findAll({
				where: {
					account_id: client.accounts[0].id,
					createdAt: {
						[Op.gte]: moment().subtract(12, "weeks").toDate(),
					},
				},
			});
			data = transactions.map((transaction) => {
				return transaction.dataValues;
			});
			grouped_items = _.groupBy(data, (b) =>
				moment(b.createdAt).startOf("week").format("DD MM YYYY")
			);
			_.values(grouped_items).forEach((arr) =>
				arr.sort(
					(a, b) =>
						moment(a.createdAt).week() - moment(b.createdAt).week()
				)
			);
			break;
		}
		case "monthly": {
			transactions = await Transaction.findAll({
				where: {
					account_id: client.accounts[0].id,
					createdAt: {
						[Op.gte]: moment().subtract(6, "months").toDate(),
					},
				},
			});
			data = transactions.map((transaction) => {
				return transaction.dataValues;
			});
			grouped_items = _.groupBy(data, (b) =>
				moment(b.createdAt).startOf("month").format("MM YYYY")
			);
			_.values(grouped_items).forEach((arr) =>
				arr.sort(
					(a, b) =>
						moment(a.createdAt).month() -
						moment(b.createdAt).month()
				)
			);
			break;
		}
		default:
			transactions = null;
			data = null;
			grouped_items = null;
	}

	const final_array = Object.values(grouped_items);

	return final_array;
};
