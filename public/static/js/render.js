function renderCollection(data) {
    
    var HTML = '<div>';
    HTML += data.map(function(item){
        return '<h3>'+item.name+'</h3>'; 
    });
    HTML += '</div>'
    $('#collection-list').html(HTML);
}

function renderErr(message) {
	$('.err-div').html('<span>'+message+'</span>');
}