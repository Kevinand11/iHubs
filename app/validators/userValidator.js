const indicative = require("indicative");

module.exports = {
	create: (body) => {
		let rules = {
			name: "required|min:3",
			email: "required|email",
			password: "required|min:8|confirmed"
		};
		return indicative.validator.validateAll(body, rules);
	},
	update: (body) => {
		let rules = {
			name: "required|min:3",
			email: "required|email"
		};
		return indicative.validator.validateAll(body, rules);
	}
};
