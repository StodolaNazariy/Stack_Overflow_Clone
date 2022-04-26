const { DataTypes } = require('sequelize');

const createUserPreferencesModel = orm => {
	const UserPreferences = orm.define(
		'user_preferences',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			bookmarks: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			followings: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			tags: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			timestamps: false,
		},
	);
	return UserPreferences;
};

module.exports = createUserPreferencesModel;
