const { Op } = require("sequelize");

module.exports = {
	associate: function(models) {
		this.belongsTo(models.user, { as: "sender",
			foreignKey: "from", onDelete: "cascade", hooks: true
		});
		this.belongsTo(models.user, { as: "receiver",
			foreignKey: "to", onDelete: "cascade", hooks: true
		});
	},
	latest: function(id, page){
		return this.paginate({ order: [["created_at", "DESC"]],
			page, paginate: 25,
			where: { [Op.or]: { to: id, from: id } }
		}).then((res) => res)
			.catch((err) => err);
	}
};
