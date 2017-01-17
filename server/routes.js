var router = require('express').Router(),
    home = require('../controllers/home'),
    authentication = require('../controllers/auth'),
    collection = require('../controllers/collections');
    

function expressApp(app) {
    router.get('/', home.index);
    router.get('/login', authentication.login);
    router.get('/signup', authentication.signup);
    router.post('/auth/loginUser', authentication.login_user);
    router.post('/auth/signupUser', authentication.signup_user);
    router.post('/collection/create', collection.create);
    router.post('/collection/add_card', collection.add_card);
    app.use(router);
}

module.exports = expressApp;