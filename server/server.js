var express = require('express');
var mongoose = require('mongoose');
var index = require('./routes/index');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var mongoURI = "mongodb://localhost:27017/assignments";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
    console.log('mongodb connection open!');
});

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.json());

app.use('/', index);

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log("This is Eric, Zach, Scott & Joe Listening on", port);
});
