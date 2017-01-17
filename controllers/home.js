var Firebase = require('../models/firebase');

module.exports = {
    index : function (req, res) {
        var current_user = Firebase.auth().currentUser;
        if (current_user) {
            var uid = current_user.uid;
            res.render('home', {UID:uid});
        } else {
            res.redirect('/login');
        }
        
    }
};