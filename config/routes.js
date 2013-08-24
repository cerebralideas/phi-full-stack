module.exports = function(app) {

	var controllerPath = '../app/controllers/',
		friends = require(controllerPath + 'friendsCtrlr');

	app.get('/', friends.index);
	app.get('/friends/:id', friends.friend);
};
