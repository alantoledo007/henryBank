"use strict";
const controller = require("../controllers/transactionsController");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "transactions",

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
		transaction: {
			rest: {
				method: "POST",
				path: "/newtransaction",
			},
			params: {
				identifier: "string",
				amount: "number",
				description: "string",
			},
			handler: controller.create_transaction,
		},
		transaction_get: {
			rest: {
				method: "GET",
				path: "/mytransactions",
			},
			params: {
				startDate: "string",
				endDate: "string",
			},
			handler: controller.get_transactions,
		},
		contact_transactions: {
			rest: {
				method: "POST",
				path: "/contact_transactions",
			},
			params: {
				contactId: "string",
			},
			handler: controller.contact_transactions,
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
