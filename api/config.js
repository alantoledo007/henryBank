require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

module.exports = {
	db_uri: `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,

	actions_protected: [ //todas las acciones incorporadas dentro de este array requerirán autenticación jwt
		'auth.register_confirmation',
		'transactions.transaction'
	]
};
