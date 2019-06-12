const mysql = require('mysql');

exports.findUserByToken = function (token, callback) {

	const pool = getConnection();

	pool.query('SELECT * FROM `user` WHERE token=?', token, (err, req, fields) => {
		if (err) throw new Error(err);
		callback(req.length > 0);
	});
};

exports.addImage = (id, image_id, imageUrl, imageType, mimetype, size, source, width, height, callback) => {

	const args = {
		id: id,
		image_id: image_id,
		url: imageUrl,
		image_type: imageType,
		mimetype: mimetype,
		size: size,
		source: source,
		width: width,
		height: height
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

		// const query = 'SELECT SQL_CALC_FOUND_ROWS * FROM `image` ORDER BY `created` DESC LIMIT ? OFFSET ?';
		// const query = 'SELECT SQL_CALC_FOUND_ROWS h.url AS image_url,t.url AS thumb_url FROM image JOIN image t ON h.id = t.id WHERE h.image_type=\'hires\' ORDER BY `created` DESC LIMIT ? OFFSET ?';
		const query = 'SELECT \n' +
			'SQL_CALC_FOUND_ROWS \n' +
			'h.url AS image_url,\n' +
			't.url AS thumb_url, \n' +
			'h.size AS size \n' +
			'FROM image h\n' +
			'JOIN image t ON h.id = t.id and t.image_type = \'thumb\' \n' +
			'WHERE h.image_type=\'hires\' \n' +
			'ORDER BY h.created DESC LIMIT ? OFFSET ?';

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