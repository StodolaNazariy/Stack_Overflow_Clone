const { DataTypes } = require('sequelize');

const createUserSettingsModel = orm => {
	const UsersSettings = orm.define(
		'user_settings',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			theme: {
				type: DataTypes.ENUM('light', 'dark'),
				allowNull: false,
				defaultValue: 'dark',
			},
			notifications: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			emails: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			login_security: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			timestamps: true,
		},
	);
	return UsersSettings;
};

module.exports = createUserSettingsModel;
