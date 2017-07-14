var mongoose = require('mongoose');
var Schemas = require('./schemas');
var Blog = mongoose.model('Blogs', Schemas.blogSchema);
var lib = require('../lib');


var res;

Blog.findAllBlogs = async function() {
	var data = await Blog.aggregate([
		{ $sort: {"num": -1} },
		{ $project: {
			"_id": 0,
			"article": 0, 
			"category" : 0, 
			"comments": 0
		}}
	]);

	if(data) {
		return data;
	}else {
		console.log("data false");
		return false;
	}
}

Blog.selectBlogs = async function(page) {
	var skipnum = (page - 1) * 10;

	var data = await Blog.aggregate([
		{ $sort: {"num": -1} },
		{ $skip: skipnum },
		{ $limit: 10 },
		{ $project: {"_id": 0,"article": 0, "category" : 0, "comments": 0}}
	]);

	if(data) {
		return data;
	}else {
		console.log("data false");
		return false;
	}
}

Blog.countBlogs = async function() {
	var count = await Blog.count();
	return count;
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

Blog.selectCategory = async function(category) {
	var data = await Blog.aggregate([
		{ $match: {"category": category} },
		{ $sort: {"num": -1} },
		{ $project: {
			"article": 0, 
			"comments": 0, 
			"descr": 0, 
			"category": 0
		}}
	]);

	if(data) {
		return data;
	}else {
		console.log("data false");
		return false;
	}

}


Blog.insertNewBlog = async function(blog) {
	var num = await Blog.aggregate([
		{ $sort: {"num": -1}},
		{ $limit: 1},
		{ $project: {
			"num": 1,
		}}
	]);
	num = num[0].num;
	// 完善数据
	blog.num = parseInt(num + 1);
	blog.comments = new Array();
	try{
		var res = await Blog.create(blog);
		if(res) {
			return res.num;
		}else {
			return "";
		}
	}catch(err) {
		console.log("insert err" + err);
		return "";
	}
}



module.exports = Blog;