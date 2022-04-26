const { DataTypes } = require('sequelize');

const createUserFollowingsModel = orm => {
	const UserFollowings = orm.define(
		'user_followings',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
		},
		{
			timestamps: true,
		},
	);
	return UserFollowings;
};

module.exports = createUserFollowingsModel;
