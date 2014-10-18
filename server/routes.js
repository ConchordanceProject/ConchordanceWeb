module.exports = function(app, passport) {
	app.get('*', function(req, res) {
		res.sendfile('./client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};