var Firebase = require('../models/firebase'),
    md5 = require('md5'),
    fireErr = require('../helpers/firebase_err').fire_err;


function login(req, res) {
    var current_user = Firebase.auth().currentUser;
    if (current_user) {
        var uid = current_user.uid;
        res.redirect('/');
    } else {
        res.render('login', {view:"LOGIN"});
    }
}

function signUp(req, res) {
    var current_user = Firebase.auth().currentUser;
    if (current_user) {
        var uid = current_user.uid;
        res.redirect('/');
    } else {
       res.render('signup');
    }
    
}

function loginUser(req, res) {
    var body = req.body;
    var password = md5(body.password);
    var email = body.email;
    var Err = null;
    Firebase.auth().signInWithEmailAndPassword(email, password).catch(function(err){
        Err = fireErr(err.code);
    }).then(function(){
        console.log(Err);
        if (Err) {
            res.json({status:"err", message:Err});    
        } else {
            console.log('accepted');
            res.redirect('/');
        }  
    });
    
}

function signupUser(req, res){
    var body = req.body;
    var password = md5(body.password);
    var email = body.email;
    Err = null;
    Firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(err){
        Err = fireErr(err.code);
    }).then(function(user){
        if (Err) {
            res.send(Err);
        } else {
            create_profile(body.username,user.uid, function(){
            res.redirect('/');                
            });

        }
    });
    
}

function create_profile(username,id, callback){
   var ref =  Firebase.database().ref().child('todo-list-test-dc4da');
    var profile = {username: username, collections:{}};
   var users_ref = ref.child('users');

    users_ref.child(id).set(profile);
    callback();
}

function currentUser(req, res){
    var current_user = Firebase.auth().currentUser;
    if (current_user) {
        var uid = current_user.uid;
        res.send(uid);
        } else {
            res.send(null);
        }
}

module.exports = {
    login: login,
    signup: signUp,
    login_user: loginUser,
    signup_user: signupUser,
    current_user : currentUser
}