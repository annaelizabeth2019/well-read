var express = require('express');
var router= express.Router();
var librariesCtrl = require('../controllers/libraries');

/* GET books listing. */
router.get('/', librariesCtrl.index);

module.exports = router;
