const { DataTypes } = require('sequelize');

const createQuestionsModel = orm => {
	const Questions = orm.define(
		'questions',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			tags: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: true,
		},
	);
	return Questions;
};

module.exports = createQuestionsModel;
