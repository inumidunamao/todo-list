var express = require('express'),
    config = require('./server/config');

var app = express();
config(app);