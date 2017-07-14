var Blog = require('../models/blogModel');
var Category = require('../models/categoryModel');
var Admin = require('../models/adminModel');

exports.index = function(req, res, next) {
	if(!req.session.admin) {
		res.redirect('/admin/login');
	}else {
		res.render('admin/index');
	}
}

exports.login = function(req, res, next) {
	res.render('admin/login');
}


exports.doLogin = async function(req, res, next) {
	var name = req.body.name,
		password = req.body.password;

	var data;

	try{
		data = await Admin.checkLogin(name, password)
	}catch(err) {
		console.log("login error" + err);
		res.redirect('/admin/login');
	}

	if(data) {
		req.session.admin = name;
		res.redirect('/admin');
	}else {
		res.redirect('/admin/login');
	}
}

exports.write = async function(req, res, next) {
	var categorys;
	var resData = {};

	try {
		categorys = await Category.selectAllCategorys();
	}catch(err) {
		console.log("selectallcategorys err" + err);
		return false;
	}
	resData.categorys = categorys;
	res.render('admin/writeblog', resData);
}

exports.submitBlog = async function(req, res, next) {
	// req.body.editormd-markdown-doc
	var data = {
		title: req.body.title,
		date: new Date(),
		location: req.body.location,
		descr: req.body.descr,
		category: parseInt(req.body.category),
		article: req.body.article
	}
	var resData = {};
	try{
		resData.num = await Blog.insertNewBlog(data);
	}catch(err) {
		console.log("insert err: " + err);
		return "";
	}
	console.log(resData)
	if(resData) {
		res.send(resData);
	}else {
		res.send("");
	}

	
}

exports.blogManage = function(req, res, next) {
	res.render('admin/blogManage');	
}

exports.productManage = function(req, res, next) {
	res.render('admin/productManage');	
}

