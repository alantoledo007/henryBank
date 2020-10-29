require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

module.exports = {
	db_uri: `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,

	actions_protected: [
		//todas las acciones incorporadas dentro de este array requerirán autenticación jwt
		"auth.register_confirmation",
		"auth.send_code_email_reset",
		"auth.email_reset_verify",

		"transactions.transaction",
		"transactions.transaction_get",
		"transactions.contact_transactions",

		"stats.stats",

		"recharge.recharge_card",
		"recharge.recharge_cash",

		"contacts.list",
		"contacts.create",
		"contacts.update",
		"contacts.delete",

		"dollars.buy",
		"dollars.sell",

		"accounts.accounts_get",
		"me.myprofile",
		"me.updateprofile",
		"me.updateAvatar",
	],
};
