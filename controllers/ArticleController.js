var marked = require('marked');

var Blog = require('../models/blogModel');
var Category = require('../models/categoryModel');
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
	data.date = data.date.toUTCString();
	data.article = marked(data.article);
	resData = data;
  	res.render('article', resData);
}

exports.category = async function(req, res, next) {
	var resData = {},
		name = req.params.category,
		code;
	var blogs, category;

	if(name == "all") {
		try {
			blogs = await Blog.findAllBlogs();
		}catch(err) {
			console.log("data error" + err);
		}
		resData.category = {
			name: "所有博客",
			intro: ""
		}
	}else {
		switch(name) {
			case "note":
				code = 1;// 读书笔记
				break;
			case "developer":
				code = 2; // 前端开发者			
				break;
			case "javascript":
				code = 3; // javascript
				break;
			case "computer":
				code = 4; // 计算机基础
				break;
			case "somewhat":
				code = 5; // 英文翻译
				break;
			case "translation":
				code = 6; // 英文翻译
				break;
			case "diary":
				code = 7; // 随笔
				break;
			default:
				console.log("error");
				next();
				return;
		}	

		try{
			blogs = await Blog.selectCategory(code);
			category = await Category.findByCode(code);
		}catch(err) {
			console.log("data error" + err);
		}
		resData.category = category;
	}

	if(!blogs) {
		next();
	}
	resData.blogs = blogs;
	
	
	res.render('category', resData);
}