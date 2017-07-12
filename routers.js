var express = require('express');
var router = express.Router();

var IndexController = require('./controllers/IndexController');
var ArticleController = require('./controllers/ArticleController');
var ProductController = require('./controllers/ProductController');
var LinksController = require('./controllers/LinksController');
var AboutController = require('./controllers/AboutController');

var AdminController = require('./controllers/AdminController');


router.get('/index', function(req, res, next) {
	res.redirect('/');
});

router.get('/', IndexController.index);

router.get('/article/:num', ArticleController.index);

router.get('/product', ProductController.index);

router.get('/links', LinksController);

router.get('/about', AboutController);

router.get('/admin', AdminController.index);
router.get('/admin/login', AdminController.login);
router.post('/admin/doLogin', AdminController.doLogin);



module.exports = router;
