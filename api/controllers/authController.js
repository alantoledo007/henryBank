const register = require('./auth/register');
const client_registration = require('./auth/client_registration')
const login = require('./auth/login');
const restore_password = require('./auth/restore_password');

module.exports = {
    register,
    client_registration,
    login,
    restore_password
}