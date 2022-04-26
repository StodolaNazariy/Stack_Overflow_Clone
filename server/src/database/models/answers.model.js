const { DataTypes } = require('sequelize');

const createAnswersModel = orm => {
	const Answers = orm.define(
		'answers',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			answer: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			is_right: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			timestamps: true,
		},
	);
	return Answers;
};

module.exports = createAnswersModel;
