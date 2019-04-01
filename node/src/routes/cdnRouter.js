var express = require('express');
var router = express.Router();

var cdnController = require('../controllers/cdnController');

router.get('/add', cdnController.add);

module.exports = router;
