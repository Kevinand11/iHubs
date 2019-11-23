let bcrypt = require("bcrypt");

module.exports = (DataTypes) => {
	return {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		email: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
			set: function(password) {
				this.setDataValue("password", bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
			}
		},
		role: {
			allowNull: false,
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		image: {
			allowNull: true,
			type: DataTypes.STRING
		}
	};
};
