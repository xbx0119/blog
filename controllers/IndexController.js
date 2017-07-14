var Blog = require('../models/blogModel');
var lib = require('../lib');

exports.index =  async function(req, res, next) {
	// 返回数据
	var resData = {};
	var data;
	var page;
	var count;

	if(!req.params.page) {
		page = 1;
	}else {
		page = parseInt(req.params.page);
	}

	try {
		data = await Blog.selectBlogs(page);
	}catch(err) {
		console.log("data error" + err);
	}
	if(!data) {
		next();
	}
	for(var i = 0;i < data.length;i++) {
		data[i].date = data[i].date.toUTCString();
	}
	resData.blogs = data;

	try {
		count = await Blog.countBlogs();
	}catch(err) {
		console.log("count err: " + err);
	}

	// 分页
	if(page <= 1){
		resData.prevPage = -1;
	}else {
		resData.prevPage = page - 1;
	}

	if(page * 10 < count) {
		resData.nextPage = page + 1;
	}else {
		resData.nextPage = -1;
	}

  	res.render('index', resData);
}