var express = require('express');
var router= express.Router();
var librariesCtrl = require('../controllers/libraries');
var passport = require('passport');
var myLibraryCtrl = require('../controllers/my-library');
var searchBooksCtrl = require('../controllers/search-books');

/* GET top-sellers listing. */
router.get('/search-books', searchBooksCtrl.index);

/* GET add a book to My Library listing. */
router.get('/new', myLibraryCtrl.new);
router.post('/my-library', myLibraryCtrl.create)
/* GET my library listing. */
router.get('/my-library', myLibraryCtrl.index);
router.delete('/my-library/:id', myLibraryCtrl.delete)
/* EDIT your Book */
router.put('/my-library/:id/edit', myLibraryCtrl.edit)

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

/* POST to search */
router.post('/search-books', searchBooksCtrl.search);

module.exports = router;
