var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Library = require('../models/library');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }, function(accessToken, refreshToken, profile, cb){
    //a user has logged in with OAuth
    Library.findOne({'googleId': profile.id}, function(err, library){
        if (err) return cb(err);
        if (library) {
            //has logged in before with Google
            //check if library has an avatar, update if not
            cb(null, library);
        } else {
            //we have a new user!
            var newLibrary = new Library({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });
            newLibrary.save(function(err){
                if (err) return cb(err);
                return cb(null, newLibrary);
            });
        }
    });
}));

passport.serializeUser(function(library, done) {
    done(null, library.id);
});
  
passport.deserializeUser(function(id, done) {
    Library.findById(id, function(err, library) {
        done(err, library);
    });
});
