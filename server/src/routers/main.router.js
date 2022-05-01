const router = require('express').Router();

const { userController, questionController } = require('../controllers');

router.post('/sign-in', userController.loginUser);
router.post('/sign-up', userController.createUser);
router.get('/', questionController.getAllQuestions);

module.exports = router;
