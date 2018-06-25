'use strict';

const passport = require('passport');
const config = require('../../config/config.json');

let AuthController = function(app) {
	let EmailRequest = require('../request/auth/EmailRequest');

	let login = function(req, res, next) {

		req.checkBody(EmailRequest);
		let errors = req.validationErrors();

		if (errors) {
			res.status(422).json({ errors: errors });
		}else{
			passport.authenticate('local',{session:false},function(err,user,info){
				if (err) {
					return next(err);
				}
				if (!user) {
					return res.status(200).json(info)
				}
				res.status(200).json({
					message: info.message ? info.message : 'Enjoy your token!',
					token: info.token,
					success: true
				});
			})(req,res,next);
		}

	}

	return {
		login: login
	};

}

module.exports = AuthController;