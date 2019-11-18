const indicative = require("indicative");

module.exports = {
    create: (body) => {
        let rules = {
            to: "required|number|integer",
            message: "required|string"
        };
        return indicative.validator.validateAll(body, rules);
    },
    update: (body) => {
        let rules = {
            message: "string"
        };
        return indicative.validator.validateAll(body, rules);
    }
};
