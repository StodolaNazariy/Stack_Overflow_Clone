const { Sequelize } = require('sequelize');
const { ErrorHandler } = require('../utils');
const {
	Questions,
	Users,
	Answers,
	QuestionLikes,
	UserProfile,
} = require('../database/database');

class QuestionsController {
	async createQuestion(req, res, next) {
		try {
			console.log('#####');
			console.log('---------------------------');
			console.log('Stuk to create question -----> ', req.body);
			console.log('---------------------------');
			console.log('#####');
			const { tags, title, content } = req.body;
			const createdQuestion = await Questions.create({
				tags: tags,
				title: title,
				content: content,
				userId: 1,
			});
			res.status(200).json(createdQuestion);
		} catch (e) {
			next(e);
		}
	}

	async getAllQuestions(req, res, next) {
		try {
			console.log('-----------------------------Stuk to questions');
			console.log(req.originalUrl);

			const questions = await Questions.findAll({
				subQuery: false,
				attributes: {
					exclude: ['updatedAt', 'content'],
					include: [
						[
							Sequelize.fn(
								'COUNT',
								Sequelize.col('question_likes.questionId'),
							),
							'likesCount',
						],
						[
							Sequelize.fn(
								'COUNT',
								Sequelize.col('answers.questionId'),
							),
							'answersCount',
						],
					],
				},
				include: [
					{
						model: Users,
						attributes: ['name', 'avatar'],
					},
					{
						model: QuestionLikes,
						attributes: [],
					},
					{
						model: Answers,
						attributes: [],
					},
				],
				group: ['questions.id'],
			});
			res.status(200).json(questions);
		} catch (e) {
			console.log(e);
			next(e);
		}
	}
}

module.exports = new QuestionsController();
