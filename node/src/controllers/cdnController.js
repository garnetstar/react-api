const {google} = require('googleapis');
const fs = require('fs');
const auth = require('../model/CdnAuth');
const database = require('../model/Database');

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

exports.upload = function (req, res, next) {
	upload(req.file, req.body.source, req.body.tags, res, next);
}

function upload(file, source, tags, res, next) {
	console.log(file);

	auth.useAuth((auth) => {

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
		drive.files.create({
			resource: fileMetadata,
			media: media,
			fields: 'id, thumbnailLink, size'
		}, function (err, image) {
			if (err) {
				// Handle error
				console.log('NodeError:', err);
				next(err);

			} else {

				// delete file from server
				fs.unlinkSync(path);
				console.log('File:', image.data);
				const url = 'https://drive.google.com/uc?export=view&id=' + image.data.id;


				console.log(splitTags(tags));

				database.addImage(
					image.data.id,
					url,
					image.data.thumbnailLink,
					file.mimetype,
					parseInt(image.data.size),
					source,
					function (fields) {
						console.log('SUCCESS! file uploaded to drive and saved to db', fields);
					}
				);

				res.writeHead(200, {"Content-Type": "application/json"});
				res.end(JSON.stringify({
					'status': 'uploaded',
					'id': image.data.id,
					'url': url,
					'thumbnailLink': image.data.thumbnailLink,
					'source': source,
					'tags': tags,
					'size': image.data.size,
					'mimetype': file.mimetype
				}));
			}
		});
	});
}

function splitTags(tags) {
	return tags.split(',').map(item => {
		return item.trim();
	});
}