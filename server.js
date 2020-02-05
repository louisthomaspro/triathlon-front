const express = require('express');
const path = require('path');
const forceSsl = require('force-ssl-heroku');
const app = express();

app.use(forceSsl);

// Serve static files....
app.use(express.static(__dirname + '/dist/triathlon-front'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/triathlon-front/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 8080);