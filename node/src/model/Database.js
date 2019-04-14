const mysql = require('mysql');

exports.findUserByToken = function (token, callback) {

	const pool = getConnection();

	pool.query('SELECT * FROM `user` WHERE token=?', token, (err, req, fields) => {
		if (err) throw new Error(err);
		callback(req.length > 0);
	});
};

exports.addImage = (id, imageUrl, thumbUrl, source, callback) => {

	const args = {
		id: id,
		url: imageUrl,
		thumb_url: thumbUrl,
		source: source
	};

	const query = 'INSERT INTO `image` SET ?';
	const pool = getConnection();
	pool.query(query, args, function (err, res, fields) {

		if (err) throw new Error(err);

		callback();
	});
};

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