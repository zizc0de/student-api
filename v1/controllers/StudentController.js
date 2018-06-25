'use strict';

let StudentController = function(app) {
	let models = require('../models');
	let CreateRequest = require('../request/student/CreateRequest');

	let age = function(birth) {
		let today = new Date();
		let birthDate = new Date(birth);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m > 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	let getAll = function(req, res) {
		models.Student.findAll()
		.then(function(result) {
			let data = [];
			for(let i = 0; i < result.length; i++){
				let obj = {
					id: result[i].id,
					firstname: result[i].firstname,
					lastname: result[i].lastname,
					age: age(result[i].date_of_birth),
					place_of_birth: result[i].place_of_birth,
					date_of_birth: result[i].date_of_birth,
					school: result[i].school,
					degree: result[i].degree,
					field_of_study: result[i].field_of_study,
					bio: result[i].bio
				}
				data.push(obj);
			}
			res.json({
				students: data
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
				let data = {
					id: result.id,
					firstname: result.firstname,
					lastname: result.lastname,
					age: age(result.date_of_birth),
					place_of_birth: result.place_of_birth,
					date_of_birth: result.date_of_birth,
					school: result.school,
					degree: result.degree,
					field_of_study: result.field_of_study,
					bio: result.bio
				}
				res.json({
					student: data
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