module.exports = (DataTypes) => {
	return {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},
		message: {
			allowNull: false,
			type: DataTypes.TEXT
		},
		tags: {
			allowNull: true,
			type: DataTypes.TEXT,
			set: function (tags) {
				this.setDataValue("tags", tags.join());
			},
			get: function () {
				return this.getDataValue("tags").split(",");
			}
		}
	};
};
