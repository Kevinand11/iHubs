module.exports = {
	associate: function (models) {
		this.hasOne(models.token);
		this.hasMany(models.post);
		this.hasMany(models.message, {
			as: "sentMessage",
			foreignKey: "from"
		});
		this.hasMany(models.message, {
			as: "receivedMessage",
			foreignKey: "to"
		});
		this.belongsToMany(this, {
			as: "following",
			through: models.friend,
			foreignKey: "follower_id"
		});
		this.belongsToMany(this, {
			as: "followers",
			through: models.friend,
			foreignKey: "user_id"
		});
		this.belongsToMany(models.post, {
			as: "liked",
			through: models.like,
			foreignKey: "user_id"
		});
		this.belongsToMany(models.post, {
			as: "saved",
			through: models.save,
			foreignKey: "user_id"
		});
	},
	attemptAuth: function ({ email, password }) {
		return this.findOne({ where: { email } })
			.then((user) => {
				if (user.password() && user.comparePassword(password)) {
					return user;
				}
				return false;
			});
	},
	latest: function (page) {
		return this.paginate({
			order: [["created_at", "DESC"]],
			page,
			paginate: 30
		}).then((res) => res);
	}
};