const register = require("./auth/register");
const register_confirmation = require("./auth/register_confirmation");
const login = require("./auth/login");
const restore_password = require("./auth/restore_password");
const send_restore_code = require("./auth/send_restore_code");
const send_code_email_verifier = require('./auth/send_code_email_verifier');
const email_verify = require('./auth/email_verify');
const send_code_email_reset = require('./auth/email_reset/send_code_email_reset');
const email_reset_verify = require('./auth/email_reset/email_reset_verify')
module.exports = {
	register,
	register_confirmation,
	login,
	restore_password,
	send_restore_code,
	send_code_email_verifier,
	email_verify,
	send_code_email_reset,
	email_reset_verify
};
