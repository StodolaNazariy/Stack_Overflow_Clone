const router = require('express').Router();

const { userController } = require('../controllers');

router.post('/profile', userController.updateProfile);

module.exports = router;
