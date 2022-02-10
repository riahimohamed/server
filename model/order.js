const mongoose = require('mongoose');

const Schema = mongoose.model(
	"Order",
	new mongoose.Schema({
		status: String,
		user_id: { 
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		cart: {type: Object, required:true},
		paymentId: {type: String, required: true},
		createdAt : {
			type: Date,
			default: Date.now,
		}
	})
);

module.exports = Schema;