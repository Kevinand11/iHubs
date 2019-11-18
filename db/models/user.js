"use strict";

let fields = require("./fields/user");
let hooks = require("./hooks/user");
let classMethods = require("./classMethods/user");
let instanceMethods = require("./instanceMethods/user");

module.exports = (sequelize, DataTypes) => {
	let user = sequelize.define("user", fields(DataTypes), {
		hooks,
		underscored: true
	});
	Object.keys(classMethods).forEach((method) => {
		user[method] = classMethods[method];
	});
	Object.keys(instanceMethods).forEach((method) => {
		user.prototype[method] = instanceMethods[method];
	});
	return user;
};
