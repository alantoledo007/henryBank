const register = require('./auth/register');
const client_registration = require('./auth/client_registration')
const login = require('./auth/login');

module.exports = {
    register,
    client_registration,
    login
}