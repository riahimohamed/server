const passport = require('passport');
const TwitterStrategy  = require('passport-twitter');

const dotenv  = require("dotenv").config();

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, cb) {
      return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

passport.deserializeUser(function(obj, cb) {
cb(null, obj);
});