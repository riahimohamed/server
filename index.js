require("dotenv").config();
require("./config/database");

const passport = require('passport');
const session = require('express-session');

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

require("./route/authenticate/facebook");
require("./route/authenticate/twitter");

app.use(cors());
app.use(bodyParser.json());

app.use(require('express-session')(
	{ secret: 'keyboard cat',
	  resave: false, 
	  saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

const users = require('./route/user.route');
app.use('/users', users);

const products = require('./route/products.route');
app.use('/products', products);

const category = require('./route/category.route');
app.use('/category', category);

app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));
app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
   res.redirect('/users');
});

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/users');
  });

const port = process.env.PORT || process.env.API_PORT;

app.listen(process.env.API_PORT, () => {
	console.log(`Server is running on port ${port}...`);
});