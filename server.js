var express = require('express'),

    config = require('./server/config'),
    Firebase = require('firebase');

var app = express();

app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');

app = config(app);

app.listen (app.get('port'), function(){
    console.log('Running @: http://localhost:'+app.get('port'));
});
