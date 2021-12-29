const mongoose = require('mongoose');

const Schema = mongoose.model(
	"Person",
	new mongoose.Schema({
		type: String,
		card_number: Number,
		expiration: Date,
		validation_code: Number,
		user_id: [{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: "User" }],
	})
);

module.exports = Schema;