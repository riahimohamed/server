const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String },
	slug: { type: String },
	synopsis: { type: String, default: null },
	sort: { type: String },
	poster: { type: String },
	reference: { type: String },

	category_id: [{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category" }],

	promotion_id: [{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: "Promotion" }],

	price_id: [{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: "Price" }],
			
	createdAt : {
		type: Date,
		default: Date.now,
	}
});

module.exports = mongoose.model("Product", productSchema);