const indicative = require("indicative");

module.exports = {
	create: (body) => {
		let rules = {
			message: "required|string|min:3",
			tags: "required|array|min:1"
		};
		return indicative.validator.validateAll(body, rules);
	},
	update: (body) => {
		let rules = {
			message: "required|string|min:3",
			tags: "required|array|min:1"
		};
		return indicative.validator.validateAll(body, rules);
	}
};
