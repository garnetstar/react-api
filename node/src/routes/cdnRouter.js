var express = require('express');
var router = express.Router();
var auth = require('../model/Auth');
var bodyParser = require('body-parser');

var multer = require('multer');
var upload = multer({ dest: 'tmp/' })

var cdnController = require('../controllers/cdnController');

router.get('/add', auth.checkBaerer, cdnController.add);
router.get('/connect', auth.checkBaerer, cdnController.connect);
router.get('/images', auth.checkBaerer, cdnController.images);
router.post('/upload', auth.checkBaerer, upload.single('image'), cdnController.upload);

module.exports = router;
