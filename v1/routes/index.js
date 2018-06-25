const passport = require('passport');

let routes = function(app) {
	const auth = require('./auth')(app);
	const student = require('./student')(app);
	const user = require('./user')(app);

	app.use('/v1', auth);
	app.use('/v1', student);
	app.use('/v1', passport.authenticate('jwt', {session: false}), user);
	
	return app;
}

module.exports = routes;