function getCollection(id) {
     console.log('renderijng')
    var url = (id === 'all') ? '/collection/get_all' : '/collection/'+id;
    $.ajax({
		url: url,
		context: this,
		dataType: 'json',
		type: 'GET'
	}).done(function (data) {
		renderCollection(data);
	});
}

function getUID(callback){
    var url = '/auth/current_user';
    console.log('getting user"s ID');
    $.ajax({
		url: url,
		context: this,
		dataType: 'json',
		type: 'GET'
	}).done(function (data) {
        console.log(data);
        UID = data;
        console.log(UID);
		callback();
	});
}