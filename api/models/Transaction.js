const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Transaction = sequelize.define("Transaction", {
		transaction_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4,
		},
		title: {
			type: DataTypes.STRING(255),
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		message: {
			type: DataTypes.STRING(255),
		},
		amount: {
			type: DataTypes.FLOAT(12, 2),
			allowNull: false,
		},
		reference: {
			type: DataTypes.STRING(8),
		},
		currency: {
			type: DataTypes.ENUM(["ARS", "USD"]),
			allowNull: false,
		},
	});
};
