const Sequelize = require("sequelize");

module.exports = {
	name: "users",
	define: {
		id: { // id must always exist
			type: Sequelize.UUID, // Uses uuidv4 by default (default value is recommended)
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},

		name: {
			type: Sequelize.STRING(255),
			allowNull: true
		},

		surname: {
			type: Sequelize.STRING(255),
			allowNull: true
		},

		avatar: {
			type: Sequelize.TEXT,
			allowNull: true
    },
    doc_type: {
			type: Sequelize.ENUM(['dni','passport']),
			allowNull: true
    },
    doc_number: {
			type: Sequelize.STRING(10),
			allowNull: true
    },
    phone_number: {
			type: Sequelize.STRING(20),
			allowNull: true
    },
    role: {
			type: Sequelize.ENUM(['client','admin']),
      allowNull: false,
      defaultValue: 'client'
    },
    balance: {
			type: Sequelize.FLOAT(12,2),
      allowNull: false,
      defaultValue: 0
    },
    email: {
			type: Sequelize.STRING(255),
      allowNull: false,
      unique:true
    },
    address_street: {
			type: Sequelize.STRING(255),
			allowNull: true
    },
    address_number: {
			type: Sequelize.INTEGER(7),
			allowNull: true
    },
    locality: {
			type: Sequelize.STRING(255),
			allowNull: true
    },
    province: {
			type: Sequelize.STRING(60),
			allowNull: true
    },
    country: {
			type: Sequelize.STRING(80),
			allowNull: true
    },
    cvu: {
			type: Sequelize.STRING(22),
			allowNull: true
    },
    birthdate: {
			type: Sequelize.DATE,
			allowNull: true
		}
	},
	options: {
		timestamps: false
	}
};