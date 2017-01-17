var Firebase = require('../models/firebase'),
    md5 = require('md5'),
    fireErr = require('../helpers/firebase_err').fire_err;


function login(req, res) {
    res.render('login', {view:"LOGIN"});
}

function signUp(req, res) {
    
    res.render('signup', {views:"SIGNUP"});
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
            res.render('login', {ERROR: Err});    
        } else {    
            res.redirect('/');
        }  
    });
    
}

function signupUser(req, res){
    var body = req.body;
    var password = md5(body.password);
    var email = body.email;
    var username = body.username;
    Err = null;
    var fullname = body.fullname;
    Firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(err){
        Err = fireErr(err.code);
    }).then(function(){
        if (Err) {
            res.send(Err);
        } else {
            res.redirect('/');
        }
    });
    
    
}

module.exports = {
    login: login,
    signup: signUp,
    login_user: loginUser,
    signup_user: signupUser
}