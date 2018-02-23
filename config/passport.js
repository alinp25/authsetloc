const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy  = require('passport-twitter').Strategy;
const GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

const User = require('./../app/models/user');

const configAuth = require('./auth');

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, 
  (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({'local.email': email}, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          const newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save((err) => {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({'local.email': email}, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, req.flash('loginMessage', 'User not found.'));
        } 
        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }

        return done(null, user);
      });
    });
  }));

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['emails', 'name']
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'facebook.id': profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.facebook.id      = profile.id;
          newUser.facebook.token   = token;
          newUser.facebook.name    = profile.name.familyName + ' ' + profile.name.givenName;
          newUser.facebook.email   = profile.emails[0].value;
          newUser.save((err) => {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'twitter.id': profile.id }, (err, user) => {
        if (err) {
          return done(err);
        } 
        if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.twitter.id          = profile.id;
          newUser.twitter.token       = token;
          newUser.twitter.displayName = profile.displayName;
          newUser.twitter.username    = profile.username;
          newUser.save((err) => {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          })
        }
      });
    });
  }));

  passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () { 
      User.findOne({ 'google.id': profile.id }, (err, user) => {
        if (err) {
          return err;
        }

        if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.google.id      = profile.id;
          newUser.google.token   = token;
          newUser.google.name    = profile.displayName;
          newUser.google.email   = profile.emails[0].value;
          newUser.save((err) => {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          })
        }
      });
    });
  }));
};