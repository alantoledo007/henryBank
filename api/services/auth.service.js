"use strict";
const controller = require('../controllers/authController');
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "auth",

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
		hello: {
			rest: {
				method: "GET",
				path: "/hello"
			},
			async handler() {
				return "Hello Moleculer";
			}
		},

		/**
		 * Welcome, a username
		 *
		 * @param {String} name - User name
		 */
		register: {
			rest: {
                method: "POST",
                path: "/register",
            },
			params: {
				email: "string",
				password:"string"
			},
			/** @param {Context} ctx  */
			handler: controller.register
		},
		client_registration:{
			rest:{
				method:"PUT",
				path:"/client_registration",
			},
			params:{
				doc_type:"string",
				doc_number:"number",
				name:"string",
				surname:"string",
				birthdate:"string",
				phone_number:"number",
				address_street:"string",
				address_number:"number",
				locality:"string",
				province:"string",
				country:"string"
			},
			handler: controller.client_registration
		},
		login: {
			rest: {
				method: "POST",
				path: "/login"
			},
			params: {
				email: "email",
				password: "string"
			},
			handler:controller.login
			
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
