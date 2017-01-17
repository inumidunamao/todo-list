var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler');


module.exports = function (app) {

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extend':true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('XXX-COOKIE-SECRET'));
    routes(app);
    app.use('/public/', express.static(path.join(__dirname, '../public')));
    if (app.get('env') === 'development') {
        app.use(errorHandler);
    }
    console.log(app.get('views'));
    app.engine('handlebars', exphbs.create({
        defaultLayout : 'main',
        layoutsDir : app.get('views') + '/layouts',
        partialsDir : [app.get('views') + '/partials']
    }).engine);
    app.set('view engine', 'handlebars');
    console.log(app.get('view engine'));
    return app;
}