require ( 'dotenv' ).config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
module.exports = {
    db_uri: `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:3306/henryBank`
}