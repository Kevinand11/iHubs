const bcrypt = require("bcrypt");

module.exports = {
	comparePassword: function (password) {
		return bcrypt.compareSync(password, this.password());
	}
};
