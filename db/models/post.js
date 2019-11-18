"use strict";

let fields = require("./fields/post");
let hooks = require("./hooks/post");
let classMethods = require("./classMethods/post");
let instanceMethods = require("./instanceMethods/post");

module.exports = (sequelize, DataTypes) => {
	let post = sequelize.define("post", fields(DataTypes), {
		hooks,
		underscored: true
	});
	Object.keys(classMethods).forEach((method) => {
		post[method] = classMethods[method];
	});
	Object.keys(instanceMethods).forEach((method) => {
		post.prototype[method] = instanceMethods[method];
	});
	return post;
};
