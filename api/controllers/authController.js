const register = require("./auth/register");
const register_confirmation = require("./auth/register_confirmation");
const login = require("./auth/login");
const restore_password = require("./auth/restore_password");
const codeMailer = require("./auth/codeMailer");

module.exports = {
	register,
	register_confirmation,
	login,
	restore_password,
	codeMailer,
};
