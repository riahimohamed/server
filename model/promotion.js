const mongoose = require('mongoose');

const promoSchema = mongoose.model(
	"Promotion",
	new mongoose.Schema({
		start_date: Date,
		end_date: Date,
		value: Number,
		product_id: { 
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		}
	})
);

module.exports = promoSchema;