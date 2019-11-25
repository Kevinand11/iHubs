const indicative = require("indicative");

let messages = {
	required: "{{ field }} is required",
	min: "{{ field }} requires at least {{ args }} element",
	string: "{{ field }} must be a valid string",
	array: "{{ field }} must be a valid array"
};

module.exports = {
	create: (body) => {
		let rules = {
			message: "required|string|min:3",
			tags: "required|array|min:1"
		};
		return indicative.validator.validateAll(body, rules, messages);
	},
	update: (body) => {
		let rules = {
			message: "required|string|min:3",
			tags: "required|array|min:1"
		};
		return indicative.validator.validateAll(body, rules, messages);
	}
};
