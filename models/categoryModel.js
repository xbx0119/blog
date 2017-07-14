var mongoose = require('mongoose');
var Schemas = require('./schemas');
var Category = mongoose.model('Categorys', Schemas.categorySchema);

var res;

Category.findByCode = async function(code) {
	var category = await Category.findOne({
		"code": code
	});
	if(category) {
		return category;
	}else {
		console.log("findNamebyCode error");
		return false;
	}
}

Category.selectAllCategorys = async function(code) {
	var categorys = await Category.aggregate([
		{ $project: {"code": 1, "name": 1, "_id": 0} },
		{ $sort: {"code": 1 } }
	]);

	if(categorys) {
		return categorys;
	}else {
		console.log("selectAllCategory error");
		return false;
	}

}


module.exports = Category;