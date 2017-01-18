var Firebase = require('../models/firebase');

function currentLoggedInUser() {
    var user  = Firebase.auth().currentUser;
    if (user) {
        return user.uid;
    } else {
        return null;
    }
}
module.exports = {
    currentLoggedInUser : currentLoggedInUser
}