"use strict";
const { conn } = require("../db.js");
const { User } = require("../db");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "database",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		conn.sync(/*{force:true}*/).then(async () => {
			const cce_user = await User.findOne({where: {role: 'CCE'}})
			if (cce_user) return
			await User.create({
				email: "cce_user@gmail.com",
				password: "1234567",
				role: "CCE",
			});
		});
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {},
};
