"use strict";
const DbMixin = require("../mixins/db.mixin");
const DbService = require("moleculer-db");
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const config = require('../config');

const User = require("../models/User");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "users",
	adapter: new SequelizeAdapter(config.db_uri),
	mixins: [DbService],
	model:User,

	/**
	 * Settings
	 */
	settings: {
		fields: [
			"_id",
			"name",
			"email"
		],
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
		welcome: {
			rest: {
                method: "GET",
                path: "/welcome", //tambien puede ser /welcome/:name
            },
			params: {
				name: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return `Welcome, ${ctx.params.name}`;
			}
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
