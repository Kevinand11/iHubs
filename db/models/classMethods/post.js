const Sequelize = require("sequelize");

module.exports = {
	associate: function(models) {
		this.belongsTo(models.user, { onDelete: "cascade", hooks: true });
	},
	latest: function(page){
		return this.paginate({
			order: [["created_at", "DESC"]],
			page,
			paginate: 25,
		}).then((res) => res)
			.catch((err) => err);
	},
	latestFromFollowing: function(id, page){
		return this.paginate({
			order: [["created_at", "DESC"]],
			page,
			paginate: 25,
			where: Sequelize.literal(`(post.user_id IN (SELECT user_id FROM friends WHERE follower_id = ${id}))`)
		}).then((res) => res)
			.catch((err) => err);
	}
};
