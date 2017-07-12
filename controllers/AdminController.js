exports.index = function(req, res, next) {
	if(!req.session.admin) {
		res.redirect('/admin/login');
	}else {
		res.render('admin/admin');
	}
}

exports.login = function(req, res, next) {
	res.render('admin/login');
}


exports.doLogin = function(req, res, next) {
	var name = req.body.name,
		password = req.body.password;

	if(name == "admin" && password == "password") {
		req.session.admin = name;
		res.redirect('/admin');
	}else {
		res.redirect('/admin/login');
	}


}