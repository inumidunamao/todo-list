function login(){
  var email = $('#email-login').val();
  var pass = $('#pass-login').val();
  var data  = {email: email, password : pass};
  $.post('/auth/loginUser', data, function(return_data){
    if (return_data.status === "err") {
      renderErr(return_data.message);
    } else {
      window.location = "/";
    }
  }); 
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
    var coll_desc = $('#card-desc').val();
    var card_name = $('#card-name').val();
    var post_data = {user_id: user_id, collection_key: coll_name, card_name:card_name};
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