const mongoose = require('mongoose');

const Schema = mongoose.model(
	"OrderDetails",
	new mongoose.Schema({
		quantity: Number,
		price: Number,
		product_id: { 
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product'
				}
	})
);

module.exports = Schema;