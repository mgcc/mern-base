const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use('local', new LocalStrategy(
    (username, password, done) => {
      User.findOne(
        { username },
        (err, user) => {
          // if there are errors, return them before anything else
          if (err) {
            console.log('Error in finding user.');
            return done(err);
          }

          // If no user found, return a message
          if (!user) {
            console.log('No user found');
            return done(null, false);
          }

          // If the user is found but the password is wrong
          if (!(password == user.password)) {
            console.log('Wrong password');
            return done(null, false);
          }

          // Everything checks out, return successful user
          return done(null, user);
        }
      );
    }
  ));
}