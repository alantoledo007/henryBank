"use strict";
const controller = require('../controllers/contactsController');
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "contacts",

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

		list: {
			rest: {
                method: "GET",
                path: "/",
            },
			/** @param {Context} ctx  */
			handler: controller.list
		},
		create: {
			rest: {
				method: "POST",
				path: "/"
			},
			params: {
				email: "email",
				nickname: "string"
			},
			handler:controller.create
			
		},
		update: {
			rest:{
				method: "PUT",
				path:"/:id"
			},
			params:{
				id : "string",
				nickname: "string"
			},
			handler: controller.update
		},


		delete:{
			rest: {
				method:"DELETE",
				path:"/:id"
			},
			params:{
				id: 'string',
			},
			handler: controller.delete
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
