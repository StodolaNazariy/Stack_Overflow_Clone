const router = require('express').Router();

const {
	authController,
	questionController,
	userController,
} = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/sign-in', userController.loginUser);
router.post('/sign-up', userController.createUser);
router.post('/define-auth', authController.defineUserAuth);
router.post('/logout', authMiddleware.checkAuth, userController.logOut);
router.get('/', questionController.getAllQuestions);

module.exports = router;
