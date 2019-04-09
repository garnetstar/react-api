const mysql = require('mysql');
const database = require('./Database');

exports.checkBaerer = function (req, res, next) {

	console.log('Auth');
	const headers = req.headers;
	const bearer = headers.authorization;
	check(bearer, res, next);
}

function check(bearer, res, next) {
	if (bearer === undefined) {
		console.log('Bearer missing');
		denied(res);

		return false;
	}

	const parts = bearer.split(' ');

	database.findUserByToken(parts[1], function (resultFromDb) {

		if (resultFromDb === false) {
			console.log('Token is not valid');
			denied(res);

			return false;
		}

		next();
	});
}

function denied(res) {
	res.status(400).send('Permission denied');
}