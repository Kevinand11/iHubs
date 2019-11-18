"use strict";

let field = require("./fields/friend");
let hooks = require("./hooks/friend");
let classMethods = require("./classMethods/friend");
let instanceMethods = require("./instanceMethods/friend");

module.exports = (sequelize, DataTypes) => {
	let friend = sequelize.define("friend", field(DataTypes), {
		hooks,
		underscored: true
	});
	Object.keys(classMethods).forEach((method) => {
		friend[method] = classMethods[method];
	});
	Object.keys(instanceMethods).forEach((method) => {
		friend.prototype[method] = instanceMethods[method];
	});
	return friend;
};
