const { DataTypes } = require('sequelize');

const createUserBookMarksModel = orm => {
	const UserBookMarks = orm.define(
		'user_bookmarks',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
	return UserBookMarks;
};

module.exports = createUserBookMarksModel;
