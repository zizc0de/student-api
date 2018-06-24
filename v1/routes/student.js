'use strict';

const express = require('express');
const router = express.Router();

let routes = function(app) {
	router.get('/student', (req, res, next) => {
		res.send('Hello World')
	});

	return router;
}

module.exports = routes;