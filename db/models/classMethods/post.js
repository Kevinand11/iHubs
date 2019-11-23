const Sequelize = require("sequelize");

module.exports = {
	associate: function(models) {
		this.belongsTo(models.user, { onDelete: "cascade", hooks: true });
	},
	latest: function(page){
		return this.paginate({
			order: [["created_at", "DESC"]],
			page,
			paginate: 50,
			include: ["user"]
		}).then((res) => res)
			.catch((err) => err);
	},
	latestFromFollowing: function(id, page){
		return this.paginate({
			order: [["created_at", "DESC"]],
			page,
			paginate: 50,
			where: Sequelize.literal(`(post.user_id IN (SELECT user_id FROM friends WHERE follower_id = ${id}))`),
			include: ["user"]
		}).then((res) => res)
			.catch((err) => err);
	},
	latestOf: function(id, page){
		return this.paginate({
			order: [["created_at", "DESC"]],
			page,
			paginate: 50,
			where: { user_id: id },
			include: ["user"]
		}).then((res) => res)
			.catch((err) => err);
	}
};
