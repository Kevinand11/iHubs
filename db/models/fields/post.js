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
		price: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		description: {
			allowNull: true,
			type: DataTypes.TEXT
		}
	};
};
