var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var library = require('../models/library')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }, function(accessToken, refreshToken, profile){
      //a user has logged in with OAuth...
    library.findOne({'googleId' : profile.id}, function(err, library){
        if (err) return cb(err);
        if (library) {
            return cb(null, library);
        } else {
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
  }
));

//give Passport the nugget of data to put into the session for this user
passport.serializeUser(function(library, done) {
    done(null, library.id);
});

//provide Passport with the user from the db we want assigned to the req.user object
passport.deserializeUser(function(library, done){
    Library.findById(id, function(err, student){
        done(err, student);
    });
});