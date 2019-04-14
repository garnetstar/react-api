const {google} = require('googleapis');
const fs = require('fs');
const auth = require('../model/CdnAuth');
const http = require('http');

exports.add = function (req, res) {
	console.log(process.env.MYSQL_ROOT_PASSWORD);
	res.end(JSON.stringify(test()));
};

exports.connect = function (req, res) {
	console.log(req.headers);
	console.log(req.body);
	console.log('OK!');
	res.end(JSON.stringify('mysql test'));
}

exports.upload = function (req, res) {

	// console.log(req.headers);
	// console.log(req.body);

	upload(req.file, res);

	// res.end(JSON.stringify('file uploaded'));
}

function upload(file, res) {

	console.log(file);
	auth.useAuth((auth) => {

		var folderId = '1pICrnk9h-0TSuV7yrzxayti99BdMkjBl';
		var fileMetadata = {
			'name': file.originalname,
			parents: [folderId]
		};

		var path = file.path;
		var media = {
			mimeType: file.mimetype,
			body: fs.createReadStream(path)
		};
		const drive = google.drive({version: 'v3', auth});
		drive.files.create({
			resource: fileMetadata,
			media: media,
			fields: 'id, thumbnailLink'
		}, function (err, file) {
			if (err) {
				// Handle error
				console.error(err);
			} else {
				// delete file from server
				fs.unlinkSync(path);
				console.log('File:', file.data);
				const url = 'https://drive.google.com/uc?export=view&id=' + file.data.id;

				res.writeHead(200, {"Content-Type": "application/json"});
				res.end(JSON.stringify({
					'status': 'uploaded',
					'url': url,
					'thumbnailLink': file.data.thumbnailLink
				}));
			}
		});
	});
}