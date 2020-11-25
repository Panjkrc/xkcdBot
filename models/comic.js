const mongoose = require('mongoose');
const ComicSchema = new mongoose.Schema({
	month: {
		type: String,
		required: true
	},
	num: {
		type: Number,
		required: true
	},
	link: {
		type: String,
		required: false
	},
	year: {
		type: String,
		required: true
	},
	news: {
		type: String,
		required: false
	},
	safe_title: {
		type: String,
		required: true
	},
	transcript: {
		type: String,
		required: false
	},
	alt: {
		type: String,
		required: false
	},
	img: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	day: {
		type: String,
		required: true
	},
	explanation: {
		type: String,
		required: false
	}



});
const Comic = mongoose.model('comic', ComicSchema);

module.exports = Comic;