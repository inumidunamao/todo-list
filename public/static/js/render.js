var UID = '';

function renderCollection(data) {
    console.log('renderijng')
    var HTML = '';
    HTML = data.map(function(item){
        return '<li class="media-item">'+item.name+'</li>'; 
    });
    $('.media-lists').html(HTML);
}

function renderErr(message) {
	$('.err-div').html('<span>'+message+'</span>');
}

function renderProcMsg(msg) {
    $('.msg-box').show();
    $('.msg-box-msg').html('<span>'+msg+'</span>');
}