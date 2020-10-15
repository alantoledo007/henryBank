const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
	const User = sequelize.define(
		"Contact",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			nickname: {
				type: DataTypes.STRING(255),
				allowNull: true,
			}
		},
		{
			tableName: "contacts",
		}
	);
};
