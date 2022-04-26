const { DataTypes } = require('sequelize');

const createAuthModel = orm => {
	const Auth = orm.define(
		'auth',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			access_token: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			refresh_token: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			action_token: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			role: {
				type: DataTypes.ENUM('User', 'Admin'),
				allowNull: false,
				defaultValue: 'User',
			},
		},
		{
			freezeTableName: 'auth',
			timestamps: false,
		},
	);
	return Auth;
};

module.exports = createAuthModel;
