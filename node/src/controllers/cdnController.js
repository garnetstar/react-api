const {google} = require('googleapis');
const fs = require('fs');
const auth = require('../model/CdnAuth');
const database = require('../model/Database');
const async = require('async');

exports.add = function (req, res) {
	console.log(process.env.MYSQL_ROOT_PASSWORD);
	res.end(JSON.stringify(test()));
};

exports.connect = function (req, res) {
	console.log(req.headers);
	console.log(req.body);
	console.log('OK!!!');
	res.end(JSON.stringify('mysql test'));
}

exports.images = (req, res, next) => {
	database.getImages((err, data) => {
		if (err) {
			next(err);
		} else {
			res.writeHead(200, {"Content-Type": "application/json"});
			res.end(JSON.stringify(data));
		}
	});
}

exports.upload = function (req, res, next) {
	upload(req.file, req.body.source, req.body.tags, res, next);
}

function upload(file, source, tags, res, next) {
	console.log(file);

	auth.useAuth((auth) => {

		async.waterfall([
			function (callback) {
				uploadImageToDrive(callback, file, auth);
			},
			function (image, url, callback) {
				addImageToDB(callback, image, url, source);
			},
			function (image, url, callback) {
				sendResponse(callback, res, image, url, source, tags);
			}
		], function (err, results) {
			if (err) {
				console.log('ASYNC error');
				next(err);
			} else {
				console.log('ASYNC OK');
			}
		});

	});
}

function uploadImageToDrive(callback, file, auth) {
	// console.log(file);
	const folderId = '1pICrnk9h-0TSuV7yrzxayti99BdMkjBl';
	const fileMetadata = {
		'name': file.originalname,
		parents: [folderId]
	};

	const path = file.path;
	const media = {
		mimeType: file.mimetype,
		body: fs.createReadStream(path)
	};
	const drive = google.drive({version: 'v3', auth});

	//https://developers.google.com/drive/api/v3/reference/files
	drive.files.create({
		resource: fileMetadata,
		media: media,
		fields: 'id, thumbnailLink, size, mimeType'
	}, function (err, image) {
		// delete file from server
		fs.unlinkSync(path);

		if (err) {
			callback(err);
		} else {
			// console.log('Image:', image.data);
			const url = 'https://drive.google.com/uc?export=view&id=' + image.data.id;
			callback(null, image, url);
		}
	});

}

function addImageToDB(callback, image, url, source) {

	database.addImage(
		image.data.id,
		url,
		image.data.thumbnailLink,
		image.data.mimeType,
		parseInt(image.data.size),
		source,
		function (fields) {
			callback(null, image, url);
			// console.log('SUCCESS! file uploaded to drive and saved to db', fields);
		}
	);
}

function sendResponse(callback, res, image, url, source, tags) {
	res.writeHead(200, {"Content-Type": "application/json"});
	res.end(JSON.stringify({
		'status': 'uploaded',
		'id': image.data.id,
		'url': url,
		'thumbnailLink': image.data.thumbnailLink,
		'source': source,
		'tags': tags,
		'size': image.data.size,
		'mimetype': image.data.mimeType
	}));

	callback(null, null);
}