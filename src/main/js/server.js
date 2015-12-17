var server = this;

server.host = undefined;
server.port = undefined;

function checkConfiguration() {
	if (!server.host) {
		throw "Missing host configuration."
	}

	if (!server.port) {
		throw "Missing port configuration."
	}
}

function log(message) {
	console.log(getTimeStringPrefix() + message);
}

function getTimeStringPrefix() {
	return '[' + getTimeString() + '] ';
}

function getTimeString() {
	var time = new Date();
	var timeString = 
	("0000" + time.getUTCFullYear()).slice(-4) + "-" +
	("00" + (time.getUTCMonth() + 1)).slice(-2) + "-" +
	("00" + time.getUTCDate()).slice(-2) + "T" +
    ("0" + time.getUTCHours()).slice(-2)   + ":" + 
    ("0" + time.getUTCMinutes()).slice(-2) + ":" + 
    ("0" + time.getUTCSeconds()).slice(-2) + 'Z';
	return timeString;
}

server.start = function() {
	checkConfiguration();
	log('Starting B-Go on ' + this.host + ':' + this.port);

	var express = require('express');
	var app = express();
	
	var logger = function(req, res, next) {
	    log(req.method + ' ' + req.url);
	    // log(req.headers);
	    next();
	}

	app.all('*', logger);
	app.use('/', express.static(__dirname + '/../webapp'));
	app.use('/js', express.static(__dirname));
	app.use('/test', express.static(__dirname + '/../../test/js'));

	var server = app.listen(this.port, function () {
	  var host = server.address().address;
	  var port = server.address().port;

	  /* log(__dirname);
	  log('Example app listening at http://%s:%s', host, port); */
	});


};