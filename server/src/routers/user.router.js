const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/:id', userController.getUserProfileById);
router.post('/profile', userController.updateProfile);

module.exports = router;
