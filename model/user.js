const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  phone: { type: Number },
  email: { type: String, unique: true },
  password: { type: String },
  role: { 
  	type: String,
  	default: 'USER',
  	enum: ["USER", "ADMIN", "TRADER", "MANEGER"]
  },
  token: { type: String },
});

module.exports = mongoose.model("User", userSchema);