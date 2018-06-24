let routes = function(app) {
	const student = require('./student')(app);
	const user = require('./user')(app);

	app.use('/v1', student);
	app.use('/v1', user);
	
	return app;
}

module.exports = routes;