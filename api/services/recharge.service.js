"use strict";
const controller = require("../controllers/rechargeController");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "recharge",

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
	actions: {
		recharge_cash: {
			rest: {
				method: "POST",
				path: "/cash",
			},
			handler: controller.make_recharge,
		},
		recharge_card: {
			rest: {
				method: "POST",
				path: "/card",
			},
			handler: controller.card_recharge,
		},
	},

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
	created() {},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {},
};
