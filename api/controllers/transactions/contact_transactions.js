const { User, Transaction, Account } = require("../../db");

module.exports = async (ctx) => {
	const userId = ctx.meta.user.id;
	const { contactId } = ctx.params;

	const contact = await User.findOne({
		where: { id: contactId },
		include: Account,
	});

	const user = await User.findOne({
		where: { id: userId },
		include: Account,
	});

	const transactions = await Transaction.findAll({
		where: { account_id: contact.accounts[1].id },
	});

	const references_obj = await Transaction.findAll({
		attributes: ["reference"],
		where: { account_id: user.accounts[1].id },
	});

	const references = references_obj.map((el) => {
		return el.reference;
	});

	const filtered = transactions.filter((transaction) =>
		references.includes(transaction.reference)
	);

	return filtered;
};
