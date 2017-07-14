var mongoose = require('mongoose');
var Schemas = require('./schemas');
var Admin = mongoose.model('Admins', Schemas.adminSchema);

Admin.checkLogin = async function(name, password) {
	var res = await Admin.findOne({
		"name": name,
		"password": password
	});

	if(res) {
		return true;
	}else{
		return false;
	}
}

module.exports = Admin;