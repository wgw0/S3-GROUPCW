var express = require(‘express’);

var app = express();

app.get(‘/’, function (req, res) {

res.send(‘Simple Web Application is UP’);

});

app.listen(8081, function () {

console.log(‘Simple Web Application running on port 8081!’);

});
