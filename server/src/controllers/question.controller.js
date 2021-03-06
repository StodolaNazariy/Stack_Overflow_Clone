const { Sequelize, Op } = require('sequelize');
const { ErrorHandler } = require('../utils');
const {
	Questions,
	Users,
	Answers,
	QuestionLikes,
	UserProfile,
} = require('../database/database');
const { Utils } = require('../utils');

class QuestionsController {
	async createQuestion(req, res, next) {
		try {
			const { tags, title, content } = req.body;

			const createdQuestion = await Questions.create({
				tags: tags,
				title: title,
				content: content,
				userId: req.currentUser.id,
			});

			res.status(200).json(createdQuestion);
		} catch (e) {
			next(e);
		}
	}

	async getAllQuestions(req, res, next) {
		try {
			const { search, tag, tab } = req.query;

			const tabParam = Utils.checkTab(tab);

			const searchParam = search ? `%${search}%` : '%%';
			const tagsParam = tag ? `%${tag}%` : '%%';

			const questions = await Questions.findAll({
				where: {
					title: {
						[Op.like]: searchParam,
					},
					tags: {
						[Op.like]: tagsParam,
					},
				},
				subQuery: false,
				order: [tabParam],

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

	async getQuestionById(req, res, next) {
		try {
			const { id } = req.params;

			if (!Number(id)) {
				throw new ErrorHandler(400, 'Invalid id param');
			}

			const question = await Questions.findOne({
				where: { id: id },
			});

			if (!question) {
				throw new ErrorHandler(
					404,
					`Question wid id = ${id} not found`,
				);
			}

			const questionStats = await Questions.findOne({
				where: { id: id },
				subQuery: false,
				attributes: {
					exclude: [
						'updatedAt',
						'content',
						'id',
						'title',
						'tags',
						'userId',
						'createdAt',
					],
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

			const author = await Users.findOne({
				where: { id: question.userId },
				attributes: ['id', 'avatar', 'name'],
			});

			res.status(200).json({
				question: question,
				stats: questionStats,
				author: author,
			});
		} catch (e) {
			next(e);
		}
	}

	async getAnswersByQuestion(req, res, next) {
		try {
			const { id } = req.params;

			if (!Number(id)) {
				throw new ErrorHandler(400, 'Invalid id param');
			}

			const answers = await Answers.findAll({
				where: { questionId: id },
				attributes: { exclude: ['userId', 'updatedAt'] },
				include: [
					{
						model: Users,
						attributes: ['id', 'name', 'avatar'],
					},
				],
			});

			res.status(200).json(answers);
		} catch (e) {
			next(e);
		}
	}

	async createAnswer(req, res, next) {
		try {
			const { id } = req.params;
			const { answer } = req.body;

			const createdAnswer = await Answers.create({
				answer: answer,
				userId: req.currentUser.id,
				questionId: id,
			});

			res.status(200).json(createdAnswer);
		} catch (e) {
			next(e);
		}
	}

	async likeQuestion(req, res, next) {
		try {
			const { id } = req.params;
			const [like, created] = await QuestionLikes.findOrCreate({
				where: { userId: 1, questionId: id },
			});
			res.json({ done: true });
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new QuestionsController();
