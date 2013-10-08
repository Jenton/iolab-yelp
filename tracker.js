// function make_base_auth(user, password) {
//   var tok = user + ':' + password;
//   var hash = btoa(tok);
//   return "Basic " + hash;
// }


// function bookmarkIt(tab) {
// 	var id = '';
// 	var password = '';
// 	var url = 'https://' + id + ':' + password + '@api.del.icio.us/v1/posts/add';
// 	console.log(tab);
// 	var currentLocation = tab[0].url;
// 	// $('#result').text('working...' + currentLocation);

// 	if (currentLocation === undefined || $('#box').val() === '') {
// 		return false;
// 	}

// 	var now = new Date();
// 	var date = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + 'T' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + 'Z';
	
// 	var data = '?url=' + encodeURIComponent(currentLocation) + '&tags=' + encodeURIComponent($('#box').val());

// 	$.ajax ({
// 	    type: "GET",
// 	    url: url + data,
// 	    async: false,
// 	    dataType: 'xml',
// 	    crossDomain: true,
// 	    complete: function (xhr, code) {
// 	    	console.log(xhr);
// 	    	console.log(code);
// 	    	$('#result').text(code);
// 	    }
// 	 //    ,
// 	 //    success: function (res){
// 	 //        alert('ok');
// 		// 	$('#result').text( 'ok : ' + res);
// 		// 	console.log(res);
// 	 //    },
// 	 //    error: function (res, opt, err) {
// 		// 	console.log(res);
// 		// 	console.log(opt);
// 		// 	console.log(err);
// 		// }
// 	});

// }

alert("click test0");

document.addEventListener('DOMContentLoaded', function () {
	alert("click test1");
	$('#button').click(function() {
		alert("click test2");
		// chrome.tabs.query ({active: true, currentWindow: true}, function(tab) {
		// bookmarkIt(tab);
		// })
		event.preventDefault();
	});
});
