var express = require('express');
var router= express.Router();
var librariesCtrl = require('../controllers/libraries');
var passport = require('passport');
var myLibraryCtrl = require('../controllers/my-library');
var topSellersCtrl = require('../controllers/top-sellers');

/* GET top-sellers listing. */
router.get('/top-sellers', topSellersCtrl.index);

/* GET my library listing. */
router.get('/my-library', myLibraryCtrl.index);

/* GET books listing. */
router.get('/', librariesCtrl.index);

/* Google O-Auth */
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

/* GET top-sellers listing. */

/* POST to search */
router.post('/top-sellers', topSellersCtrl.search);

module.exports = router;
