const mongoose = require('mongoose');

const Schema = mongoose.model(
	"Order",
	new mongoose.Schema({
		delivery_type: String,
		status: String,
		user_id: { 
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		orderDetails_id: [{ 
					type: mongoose.Schema.Types.ObjectId,
					ref: 'OrderDetails'
				}],
		createdAt : {
			type: Date,
			default: Date.now,
		}
	})
);

module.exports = Schema;