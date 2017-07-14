var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// notice: all collections in database should have s
// blogs, categorys; not blog,category

var commentsSchema = new Schema({
	num: Number,
	name: String,
	date: Date,
	content: String
});


var blogSchema = new Schema({
	num: Number,
	title: String,
	date: Date,
	location: String,
	descr: String,
	category: Number,
	article: String,
	comments: [commentsSchema]
});
exports.blogSchema = blogSchema;







var categorySchema = new Schema({
	code: Number,
	name: String,
	intro: String
});
exports.categorySchema = categorySchema;


var adminSchema = new Schema({
	name: String,
	password: String
});
exports.adminSchema = adminSchema;





