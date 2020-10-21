require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
	`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Transaction, Contact, Account} = sequelize.models;

//Aca vendrian las relaciones|



Account.hasMany(Transaction,{
	foreignKey:'account_id'
});
Transaction.belongsTo(Account,{
	foreignKey: 'account_id'
});


User.hasMany(Contact,{
	foreignKey:'user_id'
});
Contact.belongsTo(User,{
	foreignKey: 'user_id'
});
Contact.belongsTo(User,{
	foreignKey: 'contact_id'
});

const account_user = sequelize.define('account_user',{})

User.belongsToMany(Account, { through: account_user });
Account.belongsToMany(User, { through: account_user });

// User.hasMany(Order, { foreignKey: 'userId' });
// Order.belongsTo(User)

// Product.belongsToMany(Order, { through: { model: Orderline }, foreignKey: 'productId' });
// Order.belongsToMany(Product, { through: { model: Orderline }, foreignKey: 'orderId' });

// Product.belongsToMany(User, { through: { model: Review }, foreignKey: "productId" });
// User.belongsToMany(Product, { through: { model: Review }, foreignKey: "userId" });

// User.hasMany(Orderline, { foreignKey: 'userId' });
// Orderline.belongsTo(Order, { foreignKey: 'orderId' });

// Review.belongsTo(User);

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
