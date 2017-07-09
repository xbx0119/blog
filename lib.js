exports.format = function(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();

	var hour = date.getHours();
	var minute = date.getSeconds();

	return year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
}