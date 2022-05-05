const { DataTypes } = require('sequelize');

const createUserModel = orm => {
	const Users = orm.define(
		'users',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			avatar: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			timestamps: true,
		},
	);
	return Users;
};

module.exports = createUserModel;
