const router = require('express').Router();

const { questionController } = require('../controllers');

router.get('/', questionController.getAllQuestions);
router.post('/create', questionController.createQuestion);

module.exports = router;
