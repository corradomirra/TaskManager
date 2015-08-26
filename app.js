var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var config = require("./config");
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var routes = require('./routes/index');
var mongoose = require('./libs/mongoose')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:config.get("session:secret"),
  key:config.get("session:key"),
  cookie:config.get("session:cookie"),
  store:new mongoStore({mongoose_connection:mongoose.connection})
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', config.get("port"));

app.use('/', routes);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});