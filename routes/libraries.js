var express = require('express');
var router= express.Router();
var librariesCtrl = require('../controllers/libraries');
var passport = require('passport');
var topSellersCtrl = require('../controllers/top-sellers');
var myLibraryCtrl = require('../controllers/my-library');

/* GET books listing. */
router.get('/', librariesCtrl.index);
router.get('/my-library', myLibraryCtrl.index);
router.get('/top-sellers', topSellersCtrl.index);

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
    res.redirect('/');
});

module.exports = router;
