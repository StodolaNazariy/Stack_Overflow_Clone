const { DataTypes } = require('sequelize');

const createTagsModel = orm => {
	const Tags = orm.define(
		'tags',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
	return Tags;
};

module.exports = createTagsModel;
