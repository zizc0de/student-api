'use strict';

const express = require('express');
const router = express.Router();

let routes = function(app) {
	const controller = require('../controllers/UserController')(app);

	router.route('/users').get(controller.getAll);
	router.route('/users').post(controller.create);
	router.route('/users/:id').put(controller.update);
	router.route('/users/:id').delete(controller.delete);

	return router;
}

module.exports = routes;