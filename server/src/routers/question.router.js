const router = require('express').Router();

const { questionController } = require('../controllers');
const { checkAuth } = require('../middlewares');

router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.get('/answers/:id', questionController.getAnswersByQuestion);
router.post('/answers/:id', checkAuth, questionController.createAnswer);
router.post('/create', checkAuth, questionController.createQuestion);
router.post('/like', questionController.likeQuestion);

module.exports = router;
