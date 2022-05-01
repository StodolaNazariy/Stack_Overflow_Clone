const router = require('express').Router();

const { tagsController } = require('../controllers');

router.post('/', tagsController.createTag);
router.get('/', tagsController.getAllTags);

module.exports = router;
