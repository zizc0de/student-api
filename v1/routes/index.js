let routes = function(app) {
	const student = require('./student')(app);

	app.use('/v1', student);

	return app;
}

module.exports = routes;