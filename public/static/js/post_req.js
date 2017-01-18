function login(){
  var email = $('#email-login').val();
  var pass = $('#pass-login').val();
  var data  = {email: email, password : pass};
  $('.auth-btn').prop('disable', true);
  renderProcMsg('Please wait...');
  $.post('/auth/loginUser', data, function(return_data){
    if (return_data.status === "err") {
      $('.auth-btn').prop('disable', false);
      $('.err-div').show();
      $('.msg-box').hide();
      renderErr(return_data.message);
    } else {
      window.location = "/";
    }
  }); 
}
function signup(){
  var email = $('#signup-email').val();
  var pass = $('#signup-pass').val();
  var username = $('#signup-username').val();
  var data  = {email: email, password : pass, username:username};
  $('.auth-btn').prop('disable', true);
  renderProcMsg('Please wait...');
  $.post('/auth/signupUser', data, function(return_data){
    if (return_data.status === "err") {
      $('.auth-btn').prop('disable', false);
      $('.err-div').show();
      $('.msg-box').hide();
      renderErr(return_data.message);
    } else {
      window.location = "/";
    }
  }); 
}
function createCollection(user_id) {
    var collection_name = $('#create-coll-name').val();
    var post_data = {collection_name:collection_name, user_id:user_id};
    $.post('/collection/create', post_data, function(return_data){
   	    done(return_data);
   	});
   	function done(return_data) {
   	    console.log({return_data, post_data});
    }
}
        
function addCard(user_id) {
    var coll_key = $('#create-card-name').val();
    var card_desc = $('#create-card-desc').val();
    var card_name = $('#create-card-name').val();
    var post_data = {user_id: user_id, collection_key: coll_key, card_name:card_name, card_desc:card_desc};
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

function send(url) {
    window.location = url;
}