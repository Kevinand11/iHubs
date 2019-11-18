"use strict";

let fields = require("./fields/message");
let hooks = require("./hooks/message");
let classMethods = require("./classMethods/message");
let instanceMethods = require("./instanceMethods/message");

module.exports = (sequelize, DataTypes) => {
	let message = sequelize.define("message", fields(DataTypes), {
		hooks,
		underscored: true
	});
	Object.keys(classMethods).forEach((method) => {
		message[method] = classMethods[method];
	});
	Object.keys(instanceMethods).forEach((method) => {
		message.prototype[method] = instanceMethods[method];
	});
	return message;
};
