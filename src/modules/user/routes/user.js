const express = require('express');
const { userController } = require('../controller')

const router = express.Router();

router.get('/users', userController.findAll);

module.exports = router;