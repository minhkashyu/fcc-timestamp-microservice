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
app.get('/api/:reqDate?', function(req, res) {
  const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
  };

  // An empty date parameter should return the current time
  // in a JSON object with a unix key

  let reqDate = req.params.reqDate || '';
  // A request to /api/1451001600000 should return
  // { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
  if (parseInt(reqDate) == reqDate) {
    reqDate = parseInt(reqDate);
  }

  // Your project can handle dates that can be successfully
  // parsed by new Date(date_string)
  let dt = new Date(reqDate);
  // An empty date parameter should return the current time
  // in a JSON object with a utc key
  if (!reqDate) {
    dt = new Date();
  }

  // If the input date string is invalid, the API returns
  // an object having the structure { error : "Invalid Date" }
  if (!isValidDate(dt)) {
    return res.json({
      error: 'Invalid Date',
    });
  }

  // A request to /api/:date? with a valid date should return
  // a JSON object with a unix key that is a Unix timestamp
  // of the input date in milliseconds (as type Number)

  // A request to /api/:date? with a valid date should
  // return a JSON object with a utc key that is a string of
  // the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
  res.json({
    unix: dt.getTime(),
    utc: dt.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
