const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name: { type: String },
	slug: { type: String },
	product_id: [{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: "product" }],
	createdAt : {
		type: Date,
		default: Date.now,
	}
});

module.exports = mongoose.model("Category", categorySchema);