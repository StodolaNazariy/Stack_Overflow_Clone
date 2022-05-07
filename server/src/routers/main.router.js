const router = require('express').Router();

const { userController, questionController } = require('../controllers');
const { checkAuth } = require('../middlewares');

router.post('/sign-in', userController.loginUser);
router.post('/sign-up', userController.createUser);
router.post('/define-auth', userController.defineUserAuth);
router.post('/logout', checkAuth, userController.logOut);
router.get('/', questionController.getAllQuestions);

module.exports = router;
