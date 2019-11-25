const indicative = require("indicative");

let messages = {
    required: "{{ field }} is required",
    min: "{{ field }} requires at least {{ args }} characters",
    number: "{{ field }} must be a number",
    integer: "{{ field }} must be a valid integer",
    string: "{{ field }} must be a string",
};

module.exports = {
    create: (body) => {
        let rules = {
            to: "required|number|integer",
            message: "required|string|min:1"
        };
        return indicative.validator.validateAll(body, rules, messages);
    },
    update: (body) => {
        let rules = {
            message: "required|string|min:1"
        };
        return indicative.validator.validateAll(body, rules, messages);
    }
};
