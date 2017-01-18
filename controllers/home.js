var Firebase = require('../models/firebase'),
    getData = require('../controllers/collections').get_data;

module.exports = {
    index : function (req, res) {
        
        var current_user = Firebase.auth().currentUser; 
        if (current_user) {
            var uid = current_user.uid;
            //var ref = Firebase.database().ref().child('todo-list-test-dc4da');
    
            var render_data = {UID:uid};
            res.render('home', render_data);
        } else {
            res.redirect('/login');
            }
        }
    };