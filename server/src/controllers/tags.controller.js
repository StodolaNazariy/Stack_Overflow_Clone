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

	async deleteTag(req, res, next) {
		try {
			const { id } = req.params;

			if (!Number(id)) {
				throw new ErrorHandler(400, 'Invalid tag id paramater');
			}

			const tag = await Tags.findOne({ where: { id: id } });

			if (!tag) {
				throw new ErrorHandler(404, `Tag with id -> ${id} not found`);
			}

			await Tags.destroy(id);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new TagsController();
