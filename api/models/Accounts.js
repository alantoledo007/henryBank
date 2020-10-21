const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const User = sequelize.define(
		"account",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			recharge_code: {
				type: DataTypes.STRING(10),
				allowNull: true
			},
			balance: {
				type: DataTypes.FLOAT(12, 2),
				allowNull: false,
				defaultValue: 0,
			},
			cvu: {
				type: DataTypes.STRING(22),
				allowNull: true,
            },
            currency: {
                type: DataTypes.ENUM(['ars','usd']),
                allowNull: false,
                defaultValue: 'ars'
            }
		},
		{
			tableName: "accounts",
		}
	);
};
