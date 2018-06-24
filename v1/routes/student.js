'use strict';

const express = require('express');
const router = express.Router();

let routes = function(app) {
	const controller = require('../controllers/StudentController')(app);

	router.route('/students').get(controller.getAll);
	router.route('/students/:id').get(controller.getById);
	router.route('/students').post(controller.create);
	router.route('/students/:id').put(controller.update);
	router.route('/students/:id').delete(controller.delete);

	return router;
}

module.exports = routes;