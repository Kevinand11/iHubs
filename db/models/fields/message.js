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
		read: {
			allowNull: false,
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		read_at: {
			allowNull: true,
			type: DataTypes.DATE
		}
	};
};
