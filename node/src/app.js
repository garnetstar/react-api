var express = require('express');
var bodyParser = require('body-parser')

// var http = require('http');
var cdnRouter = require('./routes/cdnRouter');
var app = express();
var port = 3000;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', cdnRouter);

app.set('port', port);

app.listen(port, () => console.log(`App listening on port ${port}!`));