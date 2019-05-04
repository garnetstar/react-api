const mysql = require('mysql');

exports.findUserByToken = function (token, callback) {

	const pool = getConnection();

	pool.query('SELECT * FROM `user` WHERE token=?', token, (err, req, fields) => {
		if (err) throw new Error(err);
		callback(req.length > 0);
	});
};

exports.addImage = (id, imageUrl, thumbUrl, mimetype, size, source, callback) => {

	const args = {
		id: id,
		url: imageUrl,
		thumb_url: thumbUrl,
		mimetype: mimetype,
		size: size,
		source: source
	};

	// console.log('DBD:', args);
	const query = 'INSERT INTO `image` SET ?';
	const pool = getConnection();
	pool.query(query, args, function (err, res, fields) {

		if (err) throw new Error(err);

		callback(res);
	});
};

exports.getImages = (callback) => {
	const query = 'SELECT * FROM `image` ORDER BY `created` DESC LIMIT 10';
	const pool = getConnection();
	pool.query(query, null, (err, res, fields) => {
		callback(err, res);
	});
}

function getConnection() {
	const pass = process.env.MYSQL_PASSWORD;
	const database = process.env.MYSQL_DATABASE;
	const pool = mysql.createPool({
		connectionLimit: 10,
		host: 'db',
		user: 'root',
		password: pass,
		database: database
	});

	return pool;
}