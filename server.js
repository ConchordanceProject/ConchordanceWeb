'use strict';

// Module dependencies.
var express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('express-error-handler'),
    morgan = require('morgan'),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    mongoStore = require('connect-mongo')(session),
    config = require('./server.conf.js');

var app = express();

// Connect to database
require('./server/db/mongo').db;

// Bootstrap models
var modelsPath = path.join(__dirname, 'server/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Setup passport
require('./server/config/pass');

app.use(express.static(path.join(__dirname, 'client')));
app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(bodyParser()); 
app.use(methodOverride());
app.use(session({  
  secret: config.express,
  store: new mongoStore({
    url: config.db,
    collection: 'sessions'
  })
})); 

// use passport session
app.use(passport.initialize());
app.use(passport.session());

// Bootstrap routes
require('./server/config/routes')(app);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});