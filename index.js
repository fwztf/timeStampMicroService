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
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// define function to check if dateFromUrl is valid
const validDateFromUrl = (dateFromUrl) => {
  const urlDate = new Date(dateFromUrl).toUTCString();
  return (urlDate === "Invalid Date");
}

// your first API endpoint... 
app.get("/api/:givenDate", function (req, res) {
  // initialize given parameter by setting it to request param
  let { givenDate } = req.params;

  // check if date string from url is a number
  if (!isNaN(givenDate)) {
    // convert it to int
    givenDate = parseInt(givenDate);
  }

  // get current date
  const serverDate = new Date(givenDate);

  // proceed with the rest of the function
  // check if givenDate is NOT a valid date format (string/int)
  if (validDateFromUrl(givenDate)) {
    return res.json({
      error: "Invalid Date"
    })
  }

  // else return the target object
  res.json({
    unix: serverDate.getTime(),
    utc: serverDate.toUTCString()
  });
});

// second api endpoint if time is not given
app.get("/api", (req, res) => {
  // set new date
  const newDate = new Date();
  return res.json({
    unix: newDate.getTime(),
    utc: newDate.toUTCString()
  })
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
