const { DataTypes } = require('sequelize');

const createQuestionLikesModel = orm => {
	const QuestionLikes = orm.define(
		'question_likes',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			// is_liked: {
			// 	type: DataTypes.BOOLEAN,
			// 	defaultValue: false,
			// 	allowNull: true,
			// },
			// is_dislikes: {
			// 	type: DataTypes.BOOLEAN,
			// 	defaultValue: false,
			// 	allowNull: true,
			// },
		},
		{
			timestamps: true,
		},
	);
	return QuestionLikes;
};

module.exports = createQuestionLikesModel;
