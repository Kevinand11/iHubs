"use strict";

let fields = require("./fields/like");
let hooks = require("./hooks/like");
let classMethods = require("./classMethods/like");
let instanceMethods = require("./instanceMethods/like");

module.exports = (sequelize, DataTypes) => {
    let like = sequelize.define("like", fields(DataTypes), {
        hooks,
        underscored: true
    });
    Object.keys(classMethods).forEach((method) => {
        message[method] = classMethods[method];
    });
    Object.keys(instanceMethods).forEach((method) => {
        message.prototype[method] = instanceMethods[method];
    });
    return like;
};
