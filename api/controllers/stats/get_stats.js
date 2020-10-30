const { Transaction, Account, User } = require("../../db");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");

module.exports = async (ctx) => {
	const client_id = ctx.meta.user.id;

	const { period, income } = ctx.params;

	const days = ctx.params.days || 10;

	const client = await User.findOne({
		where: { id: client_id },
		include: { model: Account, through: "account_user", as: "accounts" },
	});

	// 	attributes: ['column1',
	// 	sequelize.fn('count', sequelize.col('column2'))],
	//   group: ["Table.column1"]

	let transactions;
	let data = [];
	let labels = [];

	switch (period) {
		case "daily": {
			transactions = await Transaction.findAll({
				attributes: [
					"createdAt",
					[
						Sequelize.fn("sum", Sequelize.col("amount")),
						"total_amount",
					],
					Sequelize.literal("SUBSTRING(createdAt, 1, 10) as date"),
				],
				where: {
					account_id: client.accounts.find(item => item.currency === 'ars').id,
					amount: {
						...(income
							? {
									[Op.gte]: 0,
							  }
							: {
									[Op.lt]: 0,
							  }),
					},
					createdAt: {
						[Op.gte]: moment().subtract(days, "days").toDate(),
					},
				},
				group: ["date"],
			});

			let dbdatakeys = {};
			transactions.forEach((item) => {
				let day = moment(item.dataValues.createdAt).format("DD-MM");
				let total_amount = item.dataValues.total_amount;
				dbdatakeys[day] =
					total_amount >= 0 ? total_amount : total_amount * -1;
			});

			for (let i = 1; i < days + 1; i++) {
				let ref = moment()
					.subtract(days - i, "days")
					.format("DD-MM");
				labels.push(ref);
				if (dbdatakeys[ref]) {
					data.push(dbdatakeys[ref]);
					continue;
				}
				data.push(0);
			}

			console.log(data, labels);

			break;
		}
		case "weekly": {
			transactions = await Transaction.findAll({
				attributes: [
					"createdAt",
					[
						Sequelize.fn("sum", Sequelize.col("amount")),
						"total_amount",
					],
					Sequelize.literal(
						"CONCAT(YEAR(createdAt), '/', WEEK(createdAt)) as date"
					),
				],
				where: {
					account_id: client.accounts.find(item => item.currency === 'ars').id,
					amount: {
						...(income
							? {
									[Op.gte]: 0,
							  }
							: {
									[Op.lt]: 0,
							  }),
					},
					createdAt: {
						[Op.gte]: moment().subtract(12, "weeks").toDate(),
					},
				},
				group: ["date"],
			});

			let dbdatakeys = {};
			transactions.forEach((item) => {
				let day = moment(item.dataValues.createdAt).week();
				let total_amount = item.dataValues.total_amount;
				dbdatakeys[day] =
					total_amount >= 0 ? total_amount : total_amount * -1;
			});

			for (let i = 1; i < 13; i++) {
				let ref = moment().subtract(12 - i, "weeks");
				labels.push(ref.format("DD-MM"));
				if (dbdatakeys[ref.week()]) {
					data.push(dbdatakeys[ref.week()]);
					continue;
				}
				data.push(0);
			}

			console.log(dbdatakeys, data, labels);

			break;
		}
		case "monthly": {
			transactions = await Transaction.findAll({
				attributes: [
					"createdAt",
					[
						Sequelize.fn("sum", Sequelize.col("amount")),
						"total_amount",
					],
					Sequelize.literal("SUBSTRING(createdAt, 1, 7) as date"),
				],
				where: {
					account_id: client.accounts.find(item => item.currency === 'ars').id,
					amount: {
						...(income
							? {
									[Op.gte]: 0,
							  }
							: {
									[Op.lt]: 0,
							  }),
					},
					createdAt: {
						[Op.gte]: moment().subtract(6, "months").toDate(),
					},
				},
				group: ["date"],
			});

			let dbdatakeys = {};
			transactions.forEach((item) => {
				let day = moment(item.dataValues.createdAt).format("MM");
				let total_amount = item.dataValues.total_amount;
				dbdatakeys[day] =
					total_amount >= 0 ? total_amount : total_amount * -1;
			});

			for (let i = 1; i < 7; i++) {
				let ref = moment().subtract(6 - i, "months");
				labels.push(ref.format("MM-YYYY"));
				if (dbdatakeys[ref.format("MM")]) {
					data.push(dbdatakeys[ref.format("MM")]);
					continue;
				}
				data.push(0);
			}

			console.log(data, labels);

			break;
		}
		default:
			break;
	}

	return { data, labels };
};
