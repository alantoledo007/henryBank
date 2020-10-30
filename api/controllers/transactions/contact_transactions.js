const { User, Transaction, Account, Contact } = require("../../db");
const { MoleculerError } = require("moleculer").Errors;

module.exports = async (ctx) => {
	const userId = ctx.meta.user.id;
	const { contactId } = ctx.params;

	const contact = await Contact.findOne({
		where: { id: contactId },
	}
	);
	const contact_user = await User.findOne({
		where: { id: contact.user_id },
		include: Account,
	});

	const user = await User.findOne({
		where: { id: userId },
		include: Account,
	});

	if (!contact_user) {
		throw new MoleculerError(`No user found`, 422, "NO_CONTACT", {
			nodeID: ctx.nodeID,
			action: ctx.action.name,
		});
	}

	const transactions = await Transaction.findAll({
		where: { account_id: contact_user.accounts[1].id },
	});

	const references_obj = await Transaction.findAll({
		attributes: ["reference"],
		where: { account_id: user.accounts.find(item => item.currency === 'ars').id },
	});

	const references = references_obj.map((el) => {
		return el.reference;
	});

	const filtered = transactions.filter((transaction) =>
		references.includes(transaction.reference)
	);
	return filtered;
};
