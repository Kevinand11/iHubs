"use strict";

let fields = require("./fields/token");
let hooks = require("./hooks/token");
let classMethods = require("./classMethods/token");
let instanceMethods = require("./instanceMethods/token");

module.exports = (sequelize, DataTypes) => {
	let token = sequelize.define("token", fields(DataTypes), {
		hooks,
		underscored: true
	});
	Object.keys(classMethods).forEach((method) => {
		token[method] = classMethods[method];
	});
	Object.keys(instanceMethods).forEach((method) => {
		token.prototype[method] = instanceMethods[method];
	});
	return token;
};
