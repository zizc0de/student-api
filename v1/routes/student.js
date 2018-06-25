'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

let routes = function(app) {
	const controller = require('../controllers/StudentController')(app);

	router.route('/students').get(controller.getAll);
	router.route('/students/:id').get(controller.getById);
	router.route('/students').post(passport.authenticate('jwt', {session: false}), controller.create);
	router.route('/students/:id').put(passport.authenticate('jwt', {session: false}), controller.update);
	router.route('/students/:id').delete(passport.authenticate('jwt', {session: false}), controller.delete);

	return router;
}

module.exports = routes;