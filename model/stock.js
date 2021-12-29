const mongoose = require('mongoose');

const Schema = mongoose.model(
	"Stock",
	new mongoose.Schema({
		_id: { 
			type: mongoose.Schema.Types.ObjectId,
			ref: ''
		}
	})
);

module.exports = Schema;