const indicative = require("indicative");

module.exports = {
	create: (body) => {
		let rules = {
			name: "string|min:3|required",
			price: "number|integer|required",
			description: "string"
		};
		return indicative.validator.validateAll(body, rules);
	},
	update: (body) => {
		let rules = {
			name: "string|min:3|required",
			price: "number|integer|required",
			description: "string"
		};
		return indicative.validator.validateAll(body, rules);
	}
};
