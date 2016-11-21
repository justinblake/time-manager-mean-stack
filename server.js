var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var path = require("path");
var port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.static(path.join("public")));
app.use('/user', require('./routes/calendar-routes'));

mongoose.connect('mongodb://localhost/time-tracker', function () {
    console.log("You are connected to the database");
});

app.listen(port, function () {
    console.log("port " + port);
});

