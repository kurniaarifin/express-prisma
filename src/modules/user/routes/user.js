const express = require('express');
const { userController } = require('../controller');
const { validate } = require('../../../middleware');
const { userValidation } = require('../validation');

const router = express.Router();

router.get('/users', userController.findAll);
router.post('/users', validate(userValidation.create), userController.create);

module.exports = router;
