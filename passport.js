const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require("passport-jwt");

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const bcrypt = require('bcryptjs');

const models = require('./v1/models');
const config = require('./config/config.json');

passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
},
function (username, password, cb) {
	models.User.findOne({
		where: {
			username: username
		}
	})
	.then(function(user) {
		if (user) {
			if(bcrypt.compareSync(password, user.password)) {
				const token = jwt.sign(user.toJSON(), config.supersecret, {
					expiresIn : 60*60*24
				});
				models.User.findOne({
					where: {
						username: username
					},
					attributes: {
						exclude: ['password']
					}
				})
				.then(function(user) {
					user.update({ token: token, last_login: Date.now() });
					return cb(null, user, { token: token, message: 'Logged In Successfully', success: true });
				})
				.catch(function(err) {
					return cb(err);
				});
			}else{
				return cb(null, false, { message: 'Incorect password', success: false });
			}
		}else{
			return cb(null, false, { message: 'Incorect username or password', success: false });
		}
	})
}
));

passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.supersecret
},
function (jwtPayload, cb) {
	models.User.findOne({
		where: {
			id: jwtPayload.id
		},
		attributes: {
			exclude: ['password', 'token']
		}
	})
	.then(function(user) {
		return cb(null, user, { message: 'Logged In Successfully', success: true });
	})
	.catch(function(err) {
		return cb(err);
	});
}
))