const router = require('express').Router();

const { createUser, loginUser } = require('../controllers').userController;

router.post('/sign-in', loginUser);
router.post('/sign-up', createUser);

module.exports = router;
