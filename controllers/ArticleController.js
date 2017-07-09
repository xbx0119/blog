var marked = require('marked');

var Blog = require('../models/blogModel');
var lib = require('../lib');

// 返回数据
exports.index = async function(req, res, next) {
	var resData = {};
	var num = parseInt(req.params.num);
	var data;

	try {
		data = await Blog.findByNum(num);
	}catch(err){
		console.log("data error" + err);
	}
	if(!data) {
		next();
	}
	data.date = lib.format(data.time);
	data.article = marked(data.article);
	resData = data;
  	res.render('article', resData);
}