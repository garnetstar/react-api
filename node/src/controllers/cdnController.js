const {google} = require('googleapis');
const fs = require('fs');
const auth = require('../model/CdnAuth');
const database = require('../model/Database');
const async = require('async');
const sharp = require('sharp');
const uuidv1 = require('uuid/v1');

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

	console.log('REQ:', req.params, req.query);

	database.getImages(req.query.limit, req.query.page, (err, data, totalCount) => {
		if (err) {
			next(err);
		} else {
			res.writeHead(200, {"Content-Type": "application/json"});
			res.end(JSON.stringify({pages: totalCount, data: data}));
		}
	});
}

exports.upload = function (req, res, next) {
	upload(req.file, req.body.source, req.body.tags, res, next);
}

function upload(file, source, tags, res, next) {
	console.log(file);

	const thumb = {
		'originalname': 'thumb.' + file.originalname,
		'mimetype': file.mimetype,
		'filename': file.filename + '.thumb',
		'path': file.path + '.thumb',
		'type': 'thumb'
	};

	console.log('thumb', thumb);

	auth.useAuth((auth) => {

		async.waterfall([

			// create thumb from uploaded file
			function (callback) {

				let thumbFile = file;
				const thumbName = './tmp/' + thumb.filename;

				sharp(file.path)
					.resize(150, 150, {
						fit: sharp.fit.inside,
						withoutEnlargement: true
					})
					.toFormat('jpeg')
					.toFile(thumbName, (err, info) => {
						if (err) {
							callback(err);
						} else {
							console.log('info::', info);
							callback(null, file, thumb);
						}
					}).metadata();

			},

			// parallel send image and thumb to google drive
			function (file, thumb, callback) {

			console.log('TTTT', thumb);
				file.type = 'hires';

				async.parallel({
					thumb: function (callback) {
						uploadImageToDrive(callback, thumb, auth);
					},
					hires: function (callback) {
						uploadImageToDrive(callback, file, auth);
					}
				}, function (err, result) {
					if (err) {
						callback(err);
					} else {
						callback(null, result.thumb, result.hires);
					}
				});

			},

			// parallel add image and thumb to database
			function (imageThumb, imageHires, callback) {

				const id = uuidv1();
				async.parallel({
					hires: function (callback) {
						addImageToDB(callback, id, imageHires, source);
					},
					thumb: function (callback) {
						addImageToDB(callback, id, imageThumb, source);
					}
				}, function (err, result) {
					if (err) {
						callback(err)
					} else {
						callback(null, result);
					}
				});
			},

			// send response
			function (images, callback) {
				sendResponse(callback, res, images, source, tags);
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
	const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
	console.log('folder:', folderId);
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
		fields: 'id, size, mimeType, imageMediaMetadata'
	}, function (err, image) {
		// delete file from server
		// fs.unlinkSync(path);

		if (err) {
			throw err;
		} else {
			// console.log('Image:', image.data);
			const url = 'https://drive.google.com/uc?export=view&id=' + image.data.id;
			image.type = file.type;
			image.url = url;
			callback(null, image);
		}
	});

}

function addImageToDB(callback, id, image, source) {

	database.addImage(
		id,
		image.data.id,
		image.url,
		image.type,
		image.data.mimeType,
		parseInt(image.data.size),
		source,
		parseInt(image.data.imageMediaMetadata.width),
		parseInt(image.data.imageMediaMetadata.height),
		function (fields) {
			callback(null, image);
			// console.log('SUCCESS! file uploaded to drive and saved to db', fields);
		},
	);
}

function sendResponse(callback, res, images, source, tags) {

	image = images.hires;
	thumb = images.thumb;

	res.writeHead(200, {"Content-Type": "application/json"});
	res.end(JSON.stringify({
		'status': 'uploaded',
		'id': image.data.id,
		'url': image.url,
		'thumbnailLink': thumb.url,
		'imageType': image.type,
		'source': source,
		'tags': tags,
		'size': image.data.size,
		'mimetype': image.data.mimeType
	}));

	callback(null, null);
}
