var router = require('express').Router(),
    home = require('../controllers/home'),
    authentication = require('../controllers/auth'),
    collection = require('../controllers/collections');
    

function expressApp(app) {
    router.get('/', home.index);
    router.get('/login', authentication.login);
    router.get('/signup', authentication.signup);
    router.get('/auth/current_user', authentication.current_user);
    router.get('/collection/get_all', collection.get_collection_all);
    router.get('/collection/:key', collection.get_collection_key);
    router.get('/collection/:key/cards', collection.get_cards_all);
    router.post('/auth/loginUser', authentication.login_user);
    router.post('/auth/signupUser', authentication.signup_user);
    router.post('/collection/create', collection.create);
    router.post('/collection/add_card', collection.add_card);
    router.post('/collection/add_todo', collection.add_todo);
    //router.post('collection/cards/move/:source/:dest', collection.move);
    router.post('/collection/cards/copy', collection.copy_card);
    app.use(router);
}

module.exports = expressApp;