var express = require('express');
var bodyParser = require('body-parser')

var http = require('http');
// var luigisBoxRouter = require('./routes/luigisBoxRouter');
var app = express();
var port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/lb', luigisBoxRouter);

app.set('port', port);

app.listen(port, () => console.log(`App listening on port ${port}!`));