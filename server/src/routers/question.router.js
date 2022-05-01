const router = require('express').Router();

const { questionController } = require('../controllers');

router.post('/create', questionController.createQuestion);

module.exports = router;
