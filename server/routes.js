var router = require('express').Router(),
    home = require('../controllers/home'),
    authentication = require('../controllers/auth');
    

function expressApp(app) {
    router.get('/', home.index);
    router.get('/login', authentication.login);
    router.get('/signup', authentication.signup);
    router.post('/auth/loginUser', authentication.login_user);
    router.post('/auth/signupUser', authentication.signup_user);
    app.use(router);
}

module.exports = expressApp;