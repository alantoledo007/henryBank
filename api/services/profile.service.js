"use strict";
const controller = require('../controllers/profileController');
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "me",

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
		myprofile: {
			rest: {
                method: "GET",
                path: "/",
            },
			/** @param {Context} ctx  */
			handler: controller.myprofile
		},
		updateprofile:{
			rest:{
				method:"PUT",
				path:"/update",
			},
			params:{
				avatar:"string",
				email:"string",
				phone_number:"number",
				address_street:"string",
				address_number:"string",
				locality:"string",
				province:"string",
			},
			handler: controller.updateprofile
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
