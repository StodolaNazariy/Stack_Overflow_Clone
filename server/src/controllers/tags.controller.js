const ErrorHandler = require('../utils').ErrorHandler;

const { Tags } = require('../database/database');

class TagsController {
	async createTag(req, res, next) {
		try {
			const { tag, description } = req.body;

			const createdTag = await Tags.create({
				name: tag,
				description: description,
			});
			res.status(200).json(createdTag);
		} catch (e) {
			next(e);
		}
	}

	async getAllTags(req, res, next) {
		try {
			const tags = await Tags.findAndCountAll();

			res.status(200).json(tags);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new TagsController();
