function login(){
            
}
function signup(){
            
}
function createCollection(user_id) {
    var coll_name = $('#coll-name').val();
    var post_data = {collection_name:coll_name, user_id:user_id};
    $.post('/collection/create', post_data, function(return_data){
   	    done(return_data);
   	});
   	function done(return_data) {
   	    console.log({return_data, post_data});
    }
}
        
function addCard(user_id) {
    var coll_name = $('#sel-coll').val();
    var coll_desc = $('#')
    var card_name = $('#card_name').val();
    var post_data = {user_id: user_id, collection_name: coll_name, card_name:card_name};
    $.post('/collection/add_card', post_data, function(return_data){
   	    done(return_data);
   	});
    function done(return_data) {
   	    console.log({return_data, post_data});
    }
}
        
function addToDo(user_id) {
    $.post('/collection/add_todo', post_data, function(return_data){
        done(return_data);
   	});
   	function done(return_data) {
   	    console.log({return_data, post_data});
    }
}