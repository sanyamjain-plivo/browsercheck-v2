var express = require('express');
var path = require('path');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8090;

app.set('views', path.join(__dirname, '/tempelates'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
console.log(__dirname);
app.use(express.static(__dirname + '/static'));

// set the home page route
app.get('/', function(req, res) {
  // ejs render automatically looks in the views folder
  res.render('example2');
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});