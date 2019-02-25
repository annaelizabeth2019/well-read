var express = require('express');
var router= express.Router();
var librariesCtrl = require('../controllers/libraries');
var passport = require('passport');

/* GET books listing. */
router.get('/', librariesCtrl.index);

router.get('/auth/google', passport.authenticate(
    'google', 
    { scope: ['profile', 'email'] }
  ));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect : '/',
      failureRedirect : '/'
    }
  ));

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/libraries');
});

module.exports = router;
