// [kate] get all the review divs

// [kate, dan] add buttons for Food, Service, Atmosphere to each review div

// [jenton, victor]
// listener for each button:
// send the review ID and attribute type (food/service/atmosphere)
// modify some remote json file somewhere with the appropriate attribute for the appropriate review ID
// if this is not possible, we might have to do a database and write a script to post to it, and also return json output when queried.


// [dan]
// add filtering/sorting options at the top of the review page
// "Sort by: Yelp Sort [...]  Food, Service, Atmosphere"

// [kate, dan]
// need to have some way to detect that the user is trying to sort by a custom extension-based sort type
// if that's the case, then display the reviews in the appropriate order

// document.addEventListener('DOMContentLoaded', function () {

// });2

var reviewList = [
	{
		reviewID: '1',
		food: 3,
		service: 2,
		atmosphere: 4,
		price: 5
	},
	{
		reviewID: '2',
		food: 1,
		service: 3,
		atmosphere: 2,
		price: 4
	},
	{
		reviewID: '3',
		food: 5,
		service: 6,
		atmosphere: 7,
		price: 8
	}
];

// returns review object for the reviewID
// this needs to be modified if we change the format for reviewList
function getReviewByID (reviewID) {
	for(var i = 0 ; i < reviewList.length ; ++i) {
		if(reviewList[i].reviewID === reviewID) {
			return reviewList[i];
		}
	}
}

// modify the sort options, overwriting existing ones
$("#review_sort_section").html('Sort by: <a href="?sort_by=date_desc">Date</a> | <a href="?sort_by=rating_desc">Rating</a> | <a href="?sort_by=friends_desc">Friends\'</a> | <a href="?sort_by=elites_desc">Elites\'</a> | <a id="sortFood" href="#food">Food</a> | <a id="sortService" href="#service">Service</a> | <a id="sortAtmo" href="#atmosphere">Atmosphere</a> | <a id="sortPrice" href="#price">Price</a>');

$("#sortFood").click(function() {
	alert("sortingByFood");
});

$("#sortService").click(function() {
	alert("sorting by Service");
});

$("#sortAtmo").click(function() {
	alert("sorting by atmo");
});

$("#sortPrice").click(function() {
	alert("sorting by price");
});


// Get business id
var bizId;
var bizIdStr = $("#bizOwner a:first-child").attr("href");
bizId = bizIdStr.substring(bizIdStr.search("biz_id=")+7);
alert(bizId);

// TODO: Fetch the data

// Add buttons
$("#bizReviewsInner ul li").each(function(){

	// Food button
	$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton foodButton inline-block" id="food'+this.id+'">Food'+'</li>');	
	$('#food'+this.id).click(function(){
		alert(this.id);
		// TODO: post the update with review ID and food tag
	});

	// Atmosphere button
	$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton atmosphereButton inline-block" id="atmosphere'+this.id+'">Atmosphere'+'</li>');	
	$('#atmosphere'+this.id).click(function(){
		alert(this.id);
	});

	// Service button
	$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton serviceButton inline-block" id="service'+this.id+'">Service'+'</li>');	
	$('#service'+this.id).click(function(){
		alert(this.id);
	});

	// Price button
	$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton priceButton inline-block" id="price'+this.id+'">Price'+'</li>');	
	$('#price'+this.id).click(function(){
		alert(this.id);
	});

});

