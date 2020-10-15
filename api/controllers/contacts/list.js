require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const jwt = require('jsonwebtoken');
const {User, Contact} = require('../../db');

module.exports = async (ctx) => {
    const {id} = ctx.meta.user;
    const data = await Contact.findAll({where:{user_id:id}, include:User});
    
    return {data};
}