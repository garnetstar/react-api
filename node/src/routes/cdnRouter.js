var express = require('express');
var router = express.Router();
var auth = require('../model/Auth');

var cdnController = require('../controllers/cdnController');

router.get('/add', auth.checkBaerer, cdnController.add);
router.get('/connect', auth.checkBaerer, cdnController.connect);

module.exports = router;
