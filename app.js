var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');

var routes = require('./routes/index');
var auth = require('./routes/auth');
var users = require('./routes/users');
var vote = require('./routes/vote');
var accounts = require('./routes/accounts');
var authorities = require('./routes/authorities');
var news = require('./routes/news');
var comments = require('./routes/comments');
var messages = require('./routes/messages');
var mojang = require('./routes/mojang');
var skstat = require('./routes/skstat');
var games = require('./routes/games');
var game_accounts = require('./routes/game_accounts');
var servers = require('./routes/servers');
var categories = require('./routes/categories');
var articles = require('./routes/articles');

var app = express();

app.use('/node_modules', express.static('node_modules'));
app.use('/admin_website', express.static('admin_website'));
app.use('/public', express.static('public'));
app.use('/favicons', express.static('favicons'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/auth', auth);
app.use('/users', users);
app.use('/vote', vote);
app.use('/accounts', accounts);
app.use('/authorities', authorities);
app.use('/news', news);
app.use('/comments', comments);
app.use('/messages', messages);
app.use('/games', games);
app.use('/game_accounts', game_accounts);
app.use('/mojang', mojang);
app.use('/skstats', skstat);
app.use('/servers', servers);
app.use('/categories', categories);
app.use('/articles', articles);

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'BTTO Website API',
    version: '1.0.0',
    description: 'API du site BTTO généré par Swagger',
  },
  host: 'localhost:8000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// serve news-launcher
app.get('/news-launcher',function(req,res){  
  res.sendFile(path.join(__dirname+'/views/news.html'));
});

app.get('/admin',function(req,res){  
  res.render('admin/layout');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
    });*/
    res.send(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
