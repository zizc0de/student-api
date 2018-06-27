'use strict';

let UserController = function(app) {
	let models = require('../models');
	let CreateRequest = require('../request/user/CreateRequest');
	let UpdateRequest = require('../request/user/UpdateRequest');

	let crip = require('bcryptjs');
	let async = require('async');

	let getAll = function(req, res) {
		models.User.findAll({
			attributes: {
				exclude: ['password', 'token']
			}
		})
		.then(function(result) {
			res.json({
				users: result
			});
		})
	}

	let getById = function(req, res) {
		models.User.findOne({
			where: {
				id: req.param('id')
			},
			attributes: {
				exclude: ['password', 'token']
			}
		})
		.then(function(result) {
			res.json({
				user: result
			});
		})
	}

	let create = function(req, res) {
		req.checkBody(CreateRequest);
		let errors = req.validationErrors();

		if (errors) {
			res.status(422).json({ errors: errors });
		}else{
			models.User.find({
				where: {
					username: req.body.username
				}
			})
			.then(function(user) {
				if (user) {
					res.status(422).json({
						errors: [{
							param: "username",
							msg: "username already exists"
						}
						]
					})
				}else{
					req.body.password = crip.hashSync(req.body.password, 10);
					models.User.create(req.body)
					.then(function(result) {
						res.status(201).json({
							data: result,
							message: 'User successfully created',
							success: true
						});
					})					
				}
			})
		}
	}

	let update = function(req, res) {
		req.checkBody(UpdateRequest);
		let errors = req.validationErrors();

		if (errors) {
			res.status(422).json({ errors: errors });
		}else{
			models.User.findOne({
				where: {
					id: req.param('id')
				}
			})
			.then(function(user) {
				if (user) {
					if (req.body.password) {
						req.body.password = crip.hashSync(req.body.password, 10);						
					}
					user.update(req.body).then(function(result) {
						res.json({
							data: result,
							message: 'User successfully updated',
							success: true
						});
					});
				}else{
					res.status(204).json();
				}
			})
		}
	}

	let remove = function(req, res) {
		models.User.findById(req.param('id'))
		.then(function(user) {
			if (user) {
				user.destroy().then(function(result) {
					res.json({
						message: 'User with ID ' + req.param('id') + ' successfully deleted',
						success: true
					});
				});
			}else{
				res.status(204).json();
			}
		})	
	}

	return {
		getAll: getAll,
		getById: getById,
		create: create,
		update: update,
		delete: remove
	};
}

module.exports = UserController;