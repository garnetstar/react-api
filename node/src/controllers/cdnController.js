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

	upload(req.file);

	res.end(JSON.stringify('file uploaded'));
}

function test() {
	return 'test ok';
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
	const drive = google.drive({version: 'v3', auth});

	drive.files.list({
		pageSize: 10,
		fields: 'nextPageToken, files(id, name)',
	}, (err, res) => {
		if (err) return console.log('The API returned an error: ' + err);
		const files = res.data.files;
		if (files.length) {
			console.log('Files:');
			files.map((file) => {
				console.log(`${file.name} (${file.id})`);
			});
		} else {
			console.log('No files found.');
		}
	});
}

function upload(file) {

	console.log(file);
	auth.useAuth((auth) => {

		var folderId = '10ramqC3eRfCBtzARMRDAUf6sV-_vKzLN';
		var fileMetadata = {
			'name': file.originalname,
			parents: [folderId]
		};

		var media = {
			mimeType: file.mimetype,
			body: fs.createReadStream(file.path)
		};
		const drive = google.drive({version: 'v3', auth});
		drive.files.create({
			resource: fileMetadata,
			media: media,
			fields: 'id'
		}, function (err, file) {
			if (err) {
				// Handle error
				console.error(err);
			} else {
				console.log('File::', file.data.id);
				console.log('File Id: ', file.id);
			}
		});
	});
}