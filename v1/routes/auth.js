'use strict';

const express = require('express');
const router = express.Router();

let routes = function(app) {
	const controller = require('../controllers/AuthController')(app);

	router.route('/auth/login').post(controller.login);

	return router;
}

module.exports = routes;