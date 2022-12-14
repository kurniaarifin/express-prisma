const express = require('express');
const { userController } = require('../controller');
const { validate } = require('../../../middleware');
const { userValidation } = require('../validation');

const router = express.Router();

// get user(s)
router.get('/users', userController.findAll);
// create user(s)
router.post('/users', validate(userValidation.create), userController.create);
// updating user by id
router.put('/users/:userId', validate(userValidation.update), userController.update);
// get user by id
router.get('/users/:userId', userController.findOne);
// delete user
router.delete('/users/:userId', userController.destroy);

module.exports = router;
