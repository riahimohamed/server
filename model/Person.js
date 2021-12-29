const mongoose = require('mongoose');

const Schema = mongoose.model(
	"Person",
	new mongoose.Schema({
		name: String,
		actor: Number,
		realisator: Number
	})
);

module.exports = Schema;