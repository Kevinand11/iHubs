const indicative = require("indicative");

module.exports = {
	create: (body) => {
		let rules = {
			message: "required|string",
			tags: "required|array"
		};
		return indicative.validator.validateAll(body, rules);
	},
	update: (body) => {
		let rules = {
			message: "required|string",
			tags: "required|array"
		};
		return indicative.validator.validateAll(body, rules);
	}
};
