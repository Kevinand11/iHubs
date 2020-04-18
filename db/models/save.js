"use strict";

let fields = require("./fields/save");
let hooks = require("./hooks/save");
let classMethods = require("./classMethods/save");
let instanceMethods = require("./instanceMethods/save");

module.exports = (sequelize, DataTypes) => {
    let save = sequelize.define("save", fields(DataTypes), {
        hooks,
        underscored: true
    });
    Object.keys(classMethods).forEach((method) => {
        message[method] = classMethods[method];
    });
    Object.keys(instanceMethods).forEach((method) => {
        message.prototype[method] = instanceMethods[method];
    });
    return save;
};
