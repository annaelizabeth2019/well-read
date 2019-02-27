var express = require('express');
var router= express.Router();
var myLibraryCtrl = require('../controllers/my-library');

router.get('/my-library', myLibraryCtrl.index);