const indicative = require("indicative");
const Op = require("sequelize").Op;

let models = require("../../db/models");

let checkIfUnique = async function (value, id = 0) {
	return models.user.findAll({ where: { email: value, id: { [Op.ne]: id } } })
		.then((users) => users.length === 0);
}

indicative.validator.extend("unique", {
	async: true,
	validate: (data, field, args) => {
		return checkIfUnique(data.original[field], args[0]);
	}
});

let messages = {
	required: "{{ field }} is required",
	min: "{{ field }} requires at least {{ args }} characters",
	email: "{{ field }} must be a valid email",
	unique: "{{ field }} already exists",
	confirmed: "{{ field }} requires a {{ field }}_confirmation field that matches"
};

module.exports = {
	register: (body) => {
		let rules = {
			name: "required|min:3",
			email: "required|email|min:4|unique",
			password: "required|min:8|confirmed"
		};
		return indicative.validator.validateAll(body, rules, messages);
	},
	login: (body) => {
		let rules = {
			email: "required|email",
			password: "required|min:8"
		};
		return indicative.validator.validateAll(body, rules, messages);
	},
	update: (body, id) => {
		let rules = {
			name: "required|min:3",
			email: `required|email|unique:${id}`
		};
		return indicative.validator.validateAll(body, rules, messages);
	},
	updatePassword: (body) => {
		let rules = {
			password: "required|min:8",
			newPassword: "required|min:8|confirmed"
		};
		return indicative.validator.validateAll(body, rules, messages);
	}
};
