const express = require('express');

const userRoute = require('./user');

const router = express.Router();

router.use(userRoute);

module.exports = router;