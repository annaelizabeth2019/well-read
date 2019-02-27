var express = require('express');
var router= express.Router();
var topSellersCtrl = require('../controllers/top-sellers');

router.get('/top-sellers', topSellersCtrl.index);
