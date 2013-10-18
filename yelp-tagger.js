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
		reviewID: 'review_lfMF7zYRlmec4iLat5xDlw',
		food: 3,
		service: 2,
		atmosphere: 4,
		price: 5
	},
	{
		reviewID: 'review_gZ37x_hROFJQlGXW_CEYug',
		food: 1,
		service: 3,
		atmosphere: 2,
		price: 4
	},
	{
		reviewID: 'review_1O2LeW-ZAItl9L0mGlahPA',
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





$(document).ready(function(){

	// Get business id
	var bizId;
	var bizIdStr = $("#bizOwner a:first-child").attr("href");
	bizId = bizIdStr.substring(bizIdStr.search("biz_id=")+7);

	// Get review id
	var idArray = [];
	$("#bizReviewsInner ul li[id^=review_]").each(function(){
		idArray.push(this.id);
	});

	// When page loads, POST bizId & reviewList, and fetch data
	$.ajax({
		type:"post",
		url:"http://people.ischool.berkeley.edu/~jenton/IO_Lab_P2/phpScript.php",
		data:"action=pageload"+"&bizID="+bizId+"&reviewIDs="+idArray,
		success:function(data){
			updateCounts(data);
		}
	});

	// Add buttons
	$("#bizReviewsInner ul li[id^=review_]").each(function(){

		var selectedId = this.id;

		// Food button
		$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton foodButton inline-block" id="food'+this.id+'">Food 0'+'</li>');	
		$('#food'+this.id).click(function(){
			$.ajax({
	    		type:"post",
	    		url:"http://people.ischool.berkeley.edu/~jenton/IO_Lab_P2/phpScript.php",
	    		data:"action=food"+"&bizID="+bizId+"&reviewID="+selectedId+"&reviewIDs="+idArray,
	    		success:function(data){
	     			updateCounts(data);
	   			}
	 		});
		});

		// Service button
		$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton serviceButton inline-block" id="service'+this.id+'">Service 0'+'</li>');	
		$('#service'+this.id).click(function(){
			$.ajax({
	    		type:"post",
	    		url:"http://people.ischool.berkeley.edu/~jenton/IO_Lab_P2/phpScript.php",
	    		data:"action=service"+"&bizID="+bizId+"&reviewID="+selectedId+"&reviewIDs="+idArray,
	    		success:function(data){
	     			updateCounts(data);
	   			}
	 		});
		});

		// Atmosphere button
		$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton atmosphereButton inline-block" id="atmosphere'+this.id+'">Atmosphere 0'+'</li>');	
		$('#atmosphere'+this.id).click(function(){
			$.ajax({
	    		type:"post",
	    		url:"http://people.ischool.berkeley.edu/~jenton/IO_Lab_P2/phpScript.php",
	    		data:"action=atmosphere"+"&bizID="+bizId+"&reviewID="+selectedId+"&reviewIDs="+idArray,
	    		success:function(data){
	     			updateCounts(data);
	   			}
	 		});
		});

		// Price button
		$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton priceButton inline-block" id="price'+this.id+'">Price 0'+'</li>');	
		$('#price'+this.id).click(function(){
			alert(this.id);
		});

	});

});


function updateCounts(data) {
	//create an array where each element is a string consisting of reviewID, food count, service count separated with an &
	var info = data.split(";");
	info.pop();
	console.log(info);
	for (var i = 0; i < info.length;i++) {
		//create an array where each element is the reviewID, food count, and service count
		var review = info[i].split("&");
		console.log(review);
		//saving the reviewID, food count, and service count into variables
		var reviewID = review[0].slice(3);
		var foodCount = review[1].slice(5);
		var serviceCount = review[2].slice(8);
		var atmosphereCount = review[3].slice(11);
		console.log(reviewID);
		console.log(foodCount);
		console.log(serviceCount);
		console.log(atmosphereCount);

		$('#food'+reviewID).text("Food "+foodCount);
		$('#service'+reviewID).text("Service "+serviceCount);
		$('#atmosphere'+reviewID).text("Atmosphere "+atmosphereCount);
		// price ?

  	}
}
