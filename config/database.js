const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false }).then(
  		() => { console.log("⚡ Successfully connected to database...") },
  		err => { console.log("database connection failed."); }
  );