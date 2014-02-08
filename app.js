
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
// var yellow_pages = require('./modules/yellow_pages');
var census = require('./modules/census');
var http = require('http');
var path = require('path');
var economic = require('./modules/economic');
var google_places = require('./modules/google_places');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
google_places.getCityData("boston", "ma", "pet_store", "dog", function(result){
	console.log(result);
})

app.get('/zillow', economic.get_zillow);
app.get('/census/:type/:keypat/:sumlevid', census.getData);
app.get('/google_places/:state/:city/:business_type/:query', google_places.getCityData);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
