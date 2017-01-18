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
       res.render('signup', {views:"SIGNUP"});
    }
    
}

function loginUser(req, res) {
    console.log(req);
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
    //var username = body.username;
    Err = null;
    //var fullname = body.fullname;
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