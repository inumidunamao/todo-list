var Firebase = require('firebase');

var firebase_config = {
    apiKey: "AIzaSyDaYHXDTMNSev2JtUS8sxS1Mu3xEeReP3Q",
    authDomain: "todo-list-test-dc4da.firebaseapp.com",
    databaseURL:"https://todo-list-test-dc4da.firebaseio.com",
    storageBucket: "todo-list-test-dc4da.appspot.com"
}

Firebase.initializeApp(firebase_config);

module.exports = Firebase;