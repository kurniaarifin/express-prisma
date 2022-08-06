const express = require('express');
const { authenticate } = require('./prisma');
const { router } = require('./src/modules');

const app = express();

// parse json requst body
app.use(express.json());
// parse url encoded request body
app.use(express.urlencoded({ extended: true }));
// prisma authenticate connection
authenticate;
// use route
app.use(router);
// base route
app.get('/', async (req, res) => {
	res.json({ status: true });
});

module.exports = app;
