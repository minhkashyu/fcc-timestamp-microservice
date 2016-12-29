var express = require('express');
var app = express();
var moment = require('moment');

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/:timestamp', function (req, res) {
    var dtString;
    var timestamp = req.params.timestamp;

    if (/^\d{10,}$/.test(timestamp)) {
        dtString = moment(timestamp, 'X');
    }
    else {
        dtString = moment(timestamp, 'MMMM D, YYYY');
    }

    if (dtString.isValid()) {
        res.json({
            'unix': dtString.format('X'),
            'natural': dtString.format('MMMM D, YYYY')
        })
    }
    else {
        res.json({
            'unix': null,
            'natural': null
        })
    }
});

app.listen(port, function () {
    console.log('Listening on port ' + port + '!');
});