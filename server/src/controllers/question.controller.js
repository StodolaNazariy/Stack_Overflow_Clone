const { ErrorHandler } = require('../utils');
const { Questions } = require('../database/database');

class QuestionsController {
	async createQuestion(req, res, next) {
		try {
			const createdQuestion = await Questions.create({
				...req.body,
				userId: 1,
			});
			res.status(200).json(createdQuestion);
		} catch (e) {
			next(e);
		}
	}

	async getAllQuestions(req, res, next) {
		try {
			const questions = await Questions.findAndCountAll();
			res.status(200).json(questions);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new QuestionsController();
