const mongoose = require('mongoose');

const Schema = mongoose.model(
	"Stock",
	new mongoose.Schema({
		quantity: Number ,
		comment: {type: String, default: null},
		product_id: { 
			type: mongoose.Schema.Types.ObjectId,
			ref: ''
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	})
);

module.exports = Schema;