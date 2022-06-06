const router = require('express').Router();

const { tagsController } = require('../controllers');
const { roleMiddleware } = require('../middlewares');

router.get('/', tagsController.getAllTags);

router.post('/', roleMiddleware.checkRole('Admin'), tagsController.createTag);
router.delete(
	'/id',
	roleMiddleware.checkRole('Admin'),
	tagsController.deleteTag,
);

module.exports = router;
