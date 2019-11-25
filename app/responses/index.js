const fs = require("fs");
const path = require("path");

let responses = {};

fs.readdirSync(__dirname)
	.filter((file) =>
		file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js"
	).forEach((file) => {
		responses[file.slice(0, -3)] = require(path.join(__dirname, file));
	});

module.exports = responses;
