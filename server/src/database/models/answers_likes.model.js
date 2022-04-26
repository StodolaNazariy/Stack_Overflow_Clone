const { DataTypes } = require('sequelize');

const createAnswersLikesModel = orm => {
	const AnswersLikes = orm.define(
		'answers_likes',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			is_liked: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: true,
			},
			is_dislikes: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: true,
			},
		},
		{
			timestamps: true,
		},
	);
	return AnswersLikes;
};

module.exports = createAnswersLikesModel;
