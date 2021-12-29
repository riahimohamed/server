const mongoose = require('mongoose');

const Schema = mongoose.model(
	"Price",
	new mongoose.Schema({
		start_date: Date,
		end_date: Date,
		price: Number,
	})
);

module.exports = Schema;