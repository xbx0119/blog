var mongoose = require('mongoose');
var Schemas = require('./schemas');
var Blog = mongoose.model('Blogs', Schemas.blogSchema);
var lib = require('../lib');


var res;

Blog.selectAllBlogs = async function() {
	var data = await Blog.aggregate([
		{ $sort: {"time": -1} },
		{ $limit: 10 },
		{ $project: {"_id": 0,"article": 0, "comments": 0}}
	]);

	if(data) {
		return data;
	}else {
		console.log("data false");
		return false;
	}
}

Blog.findByNum = async function(num) {
	var data = await Blog.findOne({
		"num": num
	});
	if(data) {
		return data;
	}else {
		console.log("data false");
		return false;
	}
}




module.exports = Blog;