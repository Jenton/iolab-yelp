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

$("#review_sort_section").append('Test');


// Get business id
var bizId;
var bizIdStr = $("#bizOwner a:first-child").attr("href");
bizId = bizIdStr.substring(bizIdStr.search("biz_id=")+7);
alert(bizId);

// TODO: Fetch the data

// Add buttons
$("#reviews-other ul li").each(function(){

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



