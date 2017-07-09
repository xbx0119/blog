exports.index = function(req, res, next) {
	if(req.session.admin) {
		res.render('admin');
	}else {
		res.redirect('/login');
	}
}

exports.login = function(req, res, next) {
	res.render('login');
}


exports.doLogin = function(req, res, next) {
	console.log(req.body.name);
	console.log(req.body.password);
}