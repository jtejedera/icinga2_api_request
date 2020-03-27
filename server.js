process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var config  = require('./config');
var express = require('express');
var app = express(); 
var server  = app.listen(config.port);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE");
	res.setHeader('Access-Control-Allow-Headers', 'x-access-token, X-Requested-With,content-type, Authorization, Access-Control-Request-Headers');

	if ('OPTIONS' == req.method) {
	  return res.sendStatus(200);
	}
	else {
		next();
	}
});

let utilities = require('./app/utilities.js')
utilities.makeRequest(io)

app.use(express.static(__dirname + '/public'));

// API ROUTES ------------------------
var apiRoutes = require('./app/routes/api')(express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
app.get('*', function(req, res) {
  res.json({ success: true, data: "Check api routes"});
});

// START THE SERVER
// ====================================
console.log(`Server started: ${config.port}`);
