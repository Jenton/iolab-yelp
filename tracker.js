// [kate, dan] get all the review divs

// [kate, dan] add buttons for Food, Service, Atmosphere to each review div

// [jenton, victor]
// listener for each button:
// send the review ID and attribute type (food/service/atmosphere)
// modify some remote json file somewhere with the appropriate attribute for the appropriate review ID
// if this is not possible, we might have to do a database and write a script to post to it, and also return json output when queried.


// [kate, dan]
// add filtering/sorting options at the top of the review page
// "Sort by: Yelp Sort [...]  Food, Service, Atmosphere"

// [kate, dan]
// need to have some way to detect that the user is trying to sort by a custom extension-based sort type
// if that's the case, then display the reviews in the appropriate order

document.addEventListener('DOMContentLoaded', function () {
	alert("click test1");
	$('#button').click(function() {
		console.log("click test2");
		// chrome.tabs.query ({active: true, currentWindow: true}, function(tab) {
		// bookmarkIt(tab);
		// })
		event.preventDefault();
	});
});
