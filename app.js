var express = require('express')
var path = require('path')
var routes = require('./routes');

var PORT = process.env.PORT || 5000   // currently listens on the environment port (or 5000 otherwise) -- connect to this port to connect to Angular

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 'dist' refers to 'distribution' folder, the one actually used in production
app.use(express.static(path.join(__dirname, 'dist')));

app.use("/api", routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var server = app.listen(PORT, function () {
  var port = server.address().port;
  console.log("App now running on port ", port);
});

module.exports = app;