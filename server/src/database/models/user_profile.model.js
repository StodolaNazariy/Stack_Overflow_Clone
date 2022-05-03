const { DataTypes } = require('sequelize');

const createUserProfileModel = orm => {
	const UserProfile = orm.define(
		'user_profile',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			employement: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			residence: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			about: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			avatar: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			timestamps: false,
			freezeTableName: 'user_profile',
		},
	);
	return UserProfile;
};

module.exports = createUserProfileModel;
