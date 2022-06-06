const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/:id', userController.getUserProfileById);
router.post('/profile', userController.updateProfile);
router.post('/forgot_password', userController.forgotPasswordRequest);
router.post('/accept_new_password', userController.acceptNewPassword);

module.exports = router;
