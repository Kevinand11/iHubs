let { newUserRegistered, userChangedMail } = require("../../../app/events");

module.exports = {
	afterCreate: (user) => {
		newUserRegistered.fire(user);
	},
	beforeUpdate: (user) => {
		if (user._changed["email"]) {
			userChangedMail.fire(user);
		}
	}
};
