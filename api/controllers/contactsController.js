const list = require("./contacts/list");
const create = require("./contacts/create");
const update = require("./contacts/update");
const _delete = require("./contacts/delete");

module.exports = {
	list,
	create,
	update,
	delete:_delete
};
