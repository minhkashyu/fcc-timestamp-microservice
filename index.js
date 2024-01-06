// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// [project url]/api/2015-12-25
// [project url]/api/1451001600000
// Output: {"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
app.get('/api/:strDatetime', function(req, res) {
  const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
  };

  let strDatetime = req.params.strDatetime || '';
  if (parseInt(strDatetime) == strDatetime) {
    strDatetime = parseInt(strDatetime);
  }

  let dt = new Date(strDatetime);
  if (!isValidDate(dt)) {
    dt = new Date();
  }

  res.json({
    unix: dt.getTime(),
    utc: dt.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
