var Blog = require('../models/blogModel');
var lib = require('../lib');

exports.index =  async function(req, res, next) {
	// 返回数据
	var resData = {};
	var data;
	try {
		data = await Blog.selectAllBlogs();
	}catch(err) {
		console.log("data error" + err);
	}
	if(!data) {
		next();
	}
	for(var i = 0;i < data.length;i++) {
		data[i].time = lib.format(data[i].time);
	}
	resData.blogs = data;
  	res.render('index', resData);
}