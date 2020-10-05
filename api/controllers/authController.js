const register = require("./auth/register");
const client_registration = require("./auth/client_registration");
const login = require("./auth/login");
const restore_password = require("./auth/restore_password");
const codeMailer = require("./auth/codeMailer");

module.exports = {
	register,
	client_registration,
	login,
	restore_password,
	codeMailer,
};
