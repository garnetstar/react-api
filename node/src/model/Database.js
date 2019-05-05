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

exports.getImages = (limit = 10, page = 1, callback) => {
	const pool = getConnection();
	pool.getConnection(function (err, conn) {

		if (err) throw err;

		const limitParam = parseInt(limit);
		const pageParam = parseInt(page);

		const offset = (pageParam - 1) * limitParam;

		const query = 'SELECT SQL_CALC_FOUND_ROWS * FROM `image` ORDER BY `created` DESC LIMIT ? OFFSET ?';
		conn.query(query, [limitParam, offset], (err, res, fields) => {

			const data = res;

			conn.query('SELECT FOUND_ROWS() as count', function (err, res) {

				const totalPages = Math.ceil(res[0].count / limitParam);

				callback(err, data, totalPages);
			});
		});
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