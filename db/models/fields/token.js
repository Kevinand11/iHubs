module.exports = (DataTypes) => {
	return {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},
		token: {
			allowNull: false,
			type: DataTypes.STRING
		}
	};
};
