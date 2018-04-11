var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var appconfig = require('./configparams');

var diffRouter = require('./api/diff');

var app = express();

//Express middleware configuration
app.use(helmet());
app.use(methodOverride());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MongoDB configuration
mongoose.connect(appconfig.mongodb_connectionString);

//API routers
app.use('/api/diff' , diffRouter );

module.exports = app;