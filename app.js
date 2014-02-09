
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var papi = require('./modules/papi');
var twitter = require('./modules/twitter');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride())
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')){
  app.use(express.errorHandler());
}

// routes
app.get('/', routes.index);
app.get('/papi/:query/:location/:target', papi.doPrediction);

twitter.search("Chinese restaurant", "43.041333", "-89.514068", "100mi", function(result){
	tweets = JSON.parse(result);
	//console.log(tweets);
	console.log(Object.keys(tweets["statuses"]).length);
}); // defult 100mi?

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
