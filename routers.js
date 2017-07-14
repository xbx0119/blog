var express = require('express');
var router = express.Router();

var IndexController = require('./controllers/IndexController');
var ArticleController = require('./controllers/ArticleController');
var ProductController = require('./controllers/ProductController');
var LinksController = require('./controllers/LinksController');
var AboutController = require('./controllers/AboutController');

var AdminController = require('./controllers/AdminController');

// 首页
router.get('/', function(req, res, next) {
	res.redirect('/index');
});
router.get('/index', IndexController.index);
router.get('/index/:page', IndexController.index);

// 博客内容页
router.get('/article/:num', ArticleController.index);
// 博客分类
router.get('/category/:category', ArticleController.category);

// 作品展示
router.get('/product', ProductController.index);

// 友情链接
router.get('/links', LinksController);

// 关于我
router.get('/about', AboutController);


/*
 * 后台管理
 *
 */

// 处理登录
router.get('/admin/login', AdminController.login);
router.post('/admin/doLogin', AdminController.doLogin);

// 首页
router.get('/admin', AdminController.index);
// 写博客
router.get('/admin/write', AdminController.write);
router.post('/admin/submitBlog', AdminController.submitBlog);
// 博客管理
router.get('/admin/blogmanage', AdminController.blogManage);
// 作品管理
router.get('/admin/productmanage', AdminController.productManage);



module.exports = router;
