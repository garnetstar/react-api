const google = require('googleapis');
const fs = require('fs');

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

	console.log(req.headers);
	console.log(req.body);
	console.log(req.file);

	res.end(JSON.stringify('upload file'));
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

function upload(auth) {
	var fileMetadata = {
		'name': 'photo.jpg'
	};
	var media = {
		mimeType: 'image/jpeg',
		body: fs.createReadStream('photo.jpg')
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
			console.log('File Id: ', file.id);
		}
	});
}