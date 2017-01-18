var Firebase = require('../models/firebase'),
    getData = require('../controllers/collections').get_data;

module.exports = {
    index : function (req, res) {
        var current_user = Firebase.auth().currentUser;
        if (current_user) {
            var uid = current_user.uid;
            getData(function(data){
                var user = data["users"][uid];
                var render_data = user;
                console.log(render_data);
                res.render('home', render_data);  
            });
        } else {
            res.redirect('/login');
        }
    }
};