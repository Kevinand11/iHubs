module.exports = {
	associate: function(models) {
		this.belongsTo(models.user, { onDelete: "cascade", hooks: true });
	}
};
