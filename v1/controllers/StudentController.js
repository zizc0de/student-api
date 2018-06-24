'use strict';

let StudentController = function(app) {
	let models = require('../models');
	let CreateRequest = require('../request/student/CreateRequest');

	let getAll = function(req, res) {
		models.Student.findAll()
		.then(function(result) {
			res.json({
				students: result
			});
		})
	}

	let getById = function(req, res) {
		models.Student.findOne({
			where: {
				id: req.param('id')
			}
		})
		.then(function(result) {
			if (result) {
				res.json({
					student: result
				});
			}else{
				res.status(204).json();
			}
		})
	}

	let create = function(req, res) {
		req.checkBody(CreateRequest);
		let errors = req.validationErrors();

		if (errors) {
			res.status(422).json({ errors: errors });
		}else{
			models.Student.create(req.body)
			.then(function(result) {
				res.status(201).json({
					data: result,
					success: true
				});
			})
		}
	}

	let update = function(req, res) {
		req.checkBody(CreateRequest);
		let errors = req.validationErrors();

		if (errors) {
			res.status(422).json({ errors: errors });
		}else{
			models.Student.findOne({
				where: {
					id: req.param('id')
				}
			})
			.then(function(student) {
				if (student) {
					student.update(req.body).then(function(result) {
						res.json({
							data: result,
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
		models.Student.findById(req.param('id'))
		.then(function(student) {
			if (student) {
				student.destroy().then(function(result) {
					res.json({
						message: 'Student with ID ' + req.param('id') + ' successfully deleted',
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

module.exports = StudentController;