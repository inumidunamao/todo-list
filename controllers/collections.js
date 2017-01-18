var Firebase = require('../models/firebase'),
    helpers = require('../helpers/auth_helper'),
    current_uid = helpers.currentLoggedInUser();

function create (req, res) {
    var cn = req.body.collection_name;
    var now = Date.now();
    var data = {name: cn, date_created:now, last_updated:now, num_of_cards: 0, cards:{}};
    var collection_key = Firebase.database().ref().child('collections').push().key;
    var updates = {};   
    updates['/collections/' + collection_key] = data;
    updates['/users/' + req.body.user_id + '/collections/'+collection_key] = data;
    
    Firebase.database().ref().update(updates);
    res.send("Updated");
}

function readData(path, callback){
    Firebase.database().ref(path).once('value').then(callback);
}

function addCard(req, res) {
    var cn = req.body.collection_key;
    var uid = req.body.user_id;
    var now = Date.now();
    var card_name = req.body.card_name;
    var card_desc = req.body.card_desc;
    var path = 'users/'+uid+'/collections/'+cn;
    readData(path, function(data){
        console.log(data);
    });
    /*
    Firebase.database().ref().child('users/'+req.body.user_id+'/collections').orderByChild('name').equalTo(cn).on('child_added',  function(data){
        console.log(data.key, data.val().name, data.val().num_of_cards);
        var updates = {};
        var cd = {name:card_name, description:"blach blah blahc", num_of_tasks:0, tasks:[]};
        var card_key = Firebase.database().ref().child('collections/'+data.key+'/cards').push().key;        
        updates['/collections/' + data.key+'/cards/'+card_key] = cd;
        updates['/collections/' + data.key+'/num_of_cards/'] = (data.val().num_of_cards + 1);
        updates['/users/' + req.body.user_id + '/collections/'+data.key+'/cards/'+card_key] = cd;
        updates['/users/' + req.body.user_id + '/collections/'+data.key+'/num_of_cards/'] =  (data.val().num_of_cards + 1);
        Firebase.database().ref().update(updates);
        res.send("Added Card");
        
    });
    */
}

function addToDo(req, res){
    var cn = req.body.collection_name;
    var now = Date.now();
    var card_name = req.body.card_name;
    var task_name = req.body.task_name;
    var due_date = req.body.due_date;
    
    Firebase.database().ref().child('users/'+req.body.user_id+'/collections').orderByChild('name').equalTo(cn).on('child_added',  function(data){
        var coll_key = data.key;
        Firebase.database().ref().child('users/'+req.body.user_id+'/collections/'+coll_key+'/cards').orderByChild('name').equalTo(card_name).on('child_added',  function(child_data){
            var card_key = child_data.key;
            var num_of_tasks = (child_data.val().num_of_tasks + 1);
            var updates = {};
            var task_data = {name:task_name, description:"task description", due_date:due_date, done:false};
            var todo_key = Firebase.database().ref().child('collections/'+data.key+'/cards/'+card_key+'/todo').push().key;        
            updates['/collections/' + data.key+'/cards/'+card_key+'/todo/'+todo_key] = task_data;
            updates['/collections/' + data.key+'/cards/'+card_key+'/num_of_tasks'] = num_of_tasks;
            updates['/users/' + req.body.user_id + '/collections/'+data.key+'/cards/'+card_key+'/todo/'+todo_key] = task_data;
            updates['/users/' + req.body.user_id + '/collections/'+data.key+'/cards/'+card_key+'/num_of_tasks'] = num_of_tasks;
            Firebase.database().ref().update(updates);
            res.send("Added To do"); 
        });
    });
}

function get_data(callback){
    Firebase.database().ref().on("value", function(snapshot) {
        callback(snapshot.val());
    }, function (error) {
        console.log(error);
    });
}

function getCollectionAll(req, res) {
    var current_user = Firebase.auth().currentUser;
    if (current_user) {
        current_uid = current_user.uid;
    } else {
        res.redirect('/login');
    }
    get_data(function(data){
        var collection_by_users = data["users"];
        var current_user_collections = collection_by_users[current_uid];
        var collections = current_user_collections["collections"];
        var ext_data = [];
        for (var item in collections) {
            var i_key = item;
            var i_name  = collections[item].name;
            var i_cards = collections[item].num_of_cards;
            ext_data.push({key: i_key,name:i_name, num_of_cards:i_cards})
        }
        res.json(ext_data);
    });
    
    
}

function getCollectionKey(req, res) {
    var coll_key = req.params.key;
    var current_user = Firebase.auth().currentUser;
    if (current_user) {
        current_uid = current_user.uid;
    } else {
        res.redirect('/login');
    }
    get_data(function(data){
        var collection_by_users = data["users"];
        var current_user_collections = collection_by_users[current_uid];
        var collections = current_user_collections["collections"];
        var ext_data = [];
        ext_data.push(collections[coll_key]);
        res.json(ext_data);
    });
}

function getCardsAll(req, res) {
    var coll_key = req.params.key;
    var current_user = Firebase.auth().currentUser;
    if (current_user) {
        current_uid = current_user.uid;
    } else {
        res.redirect('/login');
    }
    get_data(function(data){
        var collection_by_users = data["users"];
        var current_user_collections = collection_by_users[current_uid];
        var collections = current_user_collections["collections"];
        var cards = collections[coll_key].cards;
        var ext_data = [];
        for (var card in cards) {
            var c_name = cards[card].name;
            var c_key = card;
            var cn_tasks = cards[card].num_of_tasks;
            //var cc_tasks = cards[card].num_of_complete;
            ext_data.push({card_name:c_name, card_key:c_key, all_tasks: cn_tasks});
        }
        
        res.json(ext_data);
    });
}

function copyCard(req, res){
    //res.send('coppying');
    
    var source = req.body.source;
    console.log(source);
    var dest = req.body.dest;
    var current_user = Firebase.auth().currentUser;
    if (current_user) {
        current_uid = current_user.uid;
    } else {
        res.redirect('/login');
    }
    get_data(function(data){
        console.log(source);
        var collection_by_users = data["users"];
        var current_user_collections = collection_by_users[current_uid];
        var collections = current_user_collections["collections"];
        var source_coll = collections[source.coll_key];
        var source_card = source_coll.cards[source.card_key];
        var updates = {};
            
        updates['/collections/' + dest+'/cards/'+source.card_key] = source_card;
        updates['/collections/' + dest+'/num_of_cards/'] += 1;
        updates['/users/' + current_uid + '/collections/'+dest+'/cards/'+source.card_key] = source_card;
        updates['/users/' + current_uid + '/collections/'+dest+'/num_of_cards/'] += 1;
        Firebase.database().ref().update(updates);
        res.send("Copied card");

    });
    
}


module.exports = {
    create : create,
    add_card: addCard,
    add_todo: addToDo,
    get_collection_all: getCollectionAll,
    get_collection_key: getCollectionKey,
    get_cards_all: getCardsAll,
    copy_card : copyCard,
    get_data: get_data
}