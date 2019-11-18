const indicative = require("indicative");

module.exports = {
	register: (body) => {
		let rules = {
			name: "required|min:3",
			email: "required|email",
			password: "required|min:8|confirmed"
		};
		return indicative.validator.validateAll(body, rules);
	},
	login: (body) => {
		let rules = {
			email: "required|email",
			password: "required|min:8"
		};
		return indicative.validator.validateAll(body, rules);
	}
};
