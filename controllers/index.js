// Home page GET

exports.index = function(req, res){
	res.render('index', { title: 'Express', authorized: req.isAuthenticated() });
};