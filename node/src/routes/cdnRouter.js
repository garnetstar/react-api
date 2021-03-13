var express = require('express');
var router = express.Router();
var auth = require('../model/Auth');
var bodyParser = require('body-parser');
var multer = require('multer');
const fileFieldName = 'image';
var upload = multer({dest: 'tmp/'}).single(fileFieldName);

var cdnController = require('../controllers/cdnController');

router.get('/add', auth.checkBaerer, cdnController.add);
router.get('/connect', auth.checkBaerer, cdnController.connect);
router.get('/images', auth.checkBaerer, cdnController.images);
router.post(
	'/upload', auth.checkBaerer,
	// upload.single('image'),
	function (req, res, next) {
		upload(req, res, function (err) {
			if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
				console.log(err)
				res.status(400).send('missing fileld `' + fileFieldName + '`')
			} else if (err) {
				console.log(err)
				res.status(400).send('error occured `' + fileFieldName + '`')
			} else {
				next()
			}
		})
	},
	cdnController.upload
);

module.exports = router;
