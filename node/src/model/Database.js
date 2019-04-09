const mysql = require('mysql');

exports.findUserByToken = function (token, callback) {

	console.log('FindUserByToken');
	const pool = getConnection();

	pool.query('SELECT * FROM `user` WHERE token=?', token, function (err, req, fields) {
		if (err) throw new Error(err);
		callback(req.length > 0);
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