const register = require("./auth/register");
const register_confirmation = require("./auth/register_confirmation");
const login = require("./auth/login");
const restore_password = require("./auth/restore_password");
const codeMailer = require("./auth/codeMailer");
const send_code_email_verifier = require('./auth/send_code_email_verifier');
const email_verify = require('./auth/email_verify');

module.exports = {
	register,
	register_confirmation,
	login,
	restore_password,
	codeMailer,
	send_code_email_verifier,
	email_verify
};
