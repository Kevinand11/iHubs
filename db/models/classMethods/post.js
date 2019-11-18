module.exports = {
	associate: function(models) {
		this.belongsTo(models.user, { onDelete: "cascade", hooks: true });
	},
	latest: function(page){
		return this.paginate({
			order: [["created_at", "DESC"]],
			page,
			paginate: 25
		}).then((res) => res)
			.catch((err) => err);
	}
};
