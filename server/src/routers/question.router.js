const router = require('express').Router();

const { questionController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.get('/answers/:id', questionController.getAnswersByQuestion);

router.post(
	'/answers/:id',
	authMiddleware.checkAuth,
	questionController.createAnswer,
);
router.post(
	'/create',
	authMiddleware.checkAuth,
	questionController.createQuestion,
);

router.post('/like', questionController.likeQuestion);

module.exports = router;
