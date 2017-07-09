var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	aid: Number,
	title: String,
	time: Date,
	location: String,
	descr: String,
	category: Number,
	article: String,
	comments: String
});

exports.blogSchema = blogSchema;


var adminSchema = new Schema({
	name: String,
	password: String
})


