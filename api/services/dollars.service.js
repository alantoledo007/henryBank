"use strict";
const controller = require('../controllers/dollarsController');
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "dollars",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */

		/**
		 * Welcome, a username
		 *
		 * @param {String} name - User name
		 */
		buy: {
			rest: {
                method: "POST",
                path: "/buy",
            },
			params: {
				amount:"number"
			},
			/** @param {Context} ctx  */
			handler: controller.buy
		},
		sell:{
			rest:{
				method:"POST",
				path:"/sell",
			},
			params:{
				amount:"number"
			},
			handler: controller.sell
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
