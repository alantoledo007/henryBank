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
				email: {type:"email"},
				password:{type:"string",min:8,max:16}
			},
			/** @param {Context} ctx  */
			handler: controller.register
		},
		register_confirmation:{
			rest:{
				method:"PUT",
				path:"/register_confirmation",
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
			handler: controller.register_confirmation
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
			
		},
		restore_password: {
			rest:{
				method: "PUT",
				path:"/restore_password"
			},
			params:{
				email : "email",
				newPassword: "string",
				code : "number"
			},
			handler: controller.restore_password
		},
		send_restore_code:{
			rest:{
				method:"POST",
				path:"/send_restore_code"
			},
			params:{
				email : "email"
			},
			handler: controller.send_restore_code
		},

		send_code_email_verifier:{
			rest: {
				method:"POST",
				path:"/email-verifier"
			},
			params:{
				email: 'email'
			},
			handler: controller.send_code_email_verifier
		},

		email_verify:{
			rest: {
				method:"PUT",
				path:"/email-verifier"
			},
			params:{
				email: 'email',
				code: 'string|length:6'
			},
			handler: controller.email_verify
		},

		send_code_email_reset:{
			rest: {
				method:"POST",
				path: "/email-reset"
			},
			params: {
				email: 'email'
			},
			handler: controller.send_code_email_reset
		},

		email_reset_verify:{
			rest: {
				method: "PUT",
				path: "email-reset"
			},
			params: {
				code: 'string|length:6'
			},
			handler: controller.email_reset_verify
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
