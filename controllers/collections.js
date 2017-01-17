var Firebase = require('../models/firebase');

function create (req, res) {
    var cn = req.body.collection_name;
    var now = Date.now();
    var data = {name: cn, date_created:now, last_updated:now, num_of_cards: 0, cards:{}};
    var collection_key = Firebase.database().ref().child('collections').push().key;
    var updates = {};
    var coll = {}
    coll[collection_key] = data;
    updates['/collections/' + collection_key] = data;
    updates['/users/' + req.body.user_id + '/collections/'+collection_key] = data;
    
    Firebase.database().ref().update(updates);
    res.send("Updated");
}

function addCard(req, res) {
    var cn = req.body.collection_name;
    var now = Date.now();
    var card_name = req.body.card_name;
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
}
module.exports = {
    create : create,
    add_card: addCard
}