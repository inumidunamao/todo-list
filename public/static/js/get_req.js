function getCollection(id) {
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
