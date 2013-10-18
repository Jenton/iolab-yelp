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

// var reviewList = [
// 	{
// 		reviewID: 'review_lfMF7zYRlmec4iLat5xDlw',
// 		food: 3,
// 		service: 2,
// 		atmosphere: 4,
// 		price: 5
// 	},
// 	{
// 		reviewID: 'review_gZ37x_hROFJQlGXW_CEYug',
// 		food: 1,
// 		service: 3,
// 		atmosphere: 2,
// 		price: 4
// 	},
// 	{
// 		reviewID: 'review_1O2LeW-ZAItl9L0mGlahPA',
// 		food: 5,
// 		service: 6,
// 		atmosphere: 7,
// 		price: 8
// 	},
// 	{
// 		reviewID: 'review_ufGh6PmuaQS5Gjt1vYuTMQ',
// 		food: 8,
// 		service: 0,
// 		atmosphere: 0,
// 		price: 1
// 	}
// ];

var reviewList = [];

// // get all review ID's from the DOM. build array of objects with attribute reviewHTML being the HTML of the review
// $("#bizReviewsInner ul li[id^=review_]").each(function() {
// 	// add the html of the review to the array reviewList
// 	reviewList.push( { reviewObj: $(this), food: 0, service: 0, atmosphere: 0, price: 0 } );
// });

// hard-coded tags until we get the data loading working from the database
// reviewList[0].food = 4;
// reviewList[0].service = 0;
// reviewList[0].atmosphere = 0;
// reviewList[0].price = 1;

// reviewList[2].food = 0;
// reviewList[2].service = 5;
// reviewList[2].atmosphere = 1;
// reviewList[2].price = 0;

// reviewList[3].food = 0;
// reviewList[3].service = 0;
// reviewList[3].atmosphere = 9;
// reviewList[3].price = 4;

$(document).ready(function(){

	/* INITIAL LOADING */

	// Get business id
	var bizId;
	var bizIdStr = $("#bizOwner a:first-child").attr("href");
	bizId = bizIdStr.substring(bizIdStr.search("biz_id=")+7);

	// Get review id
	var idArray = [];
	$("#bizReviewsInner ul li[id^=review_]").each(function(){
		idArray.push(this.id);

		// get all review ID's from the DOM. build array of objects with attribute reviewHTML being the HTML of the review
		reviewList.push( { reviewObj: $(this), reviewID: this.id, food: 0, service: 0, atmosphere: 0, price: 0 } );
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


	/* VOTING/TAGGING BUTTONS FOR EACH REVIEW */
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


	/* SORTING BY OUR CUSTOM TAGS */
	// modify the sort options, overwriting existing ones. create sort options for sorting by our custom tags
	$("#review_sort_section").html('Sort by: <a href="?sort_by=date_desc">Date</a> | <a href="?sort_by=rating_desc">Rating</a> | <a href="?sort_by=friends_desc">Friends\'</a> | <a href="?sort_by=elites_desc">Elites\'</a> | <a id="sortFood" href="#food">Food</a> | <a id="sortService" href="#service">Service</a> | <a id="sortAtmo" href="#atmosphere">Atmosphere</a> | <a id="sortPrice" href="#price">Price</a>');

	// on click of each sorting option:
	// sort local reviewList by that option
	// jquery sort DOM


	// comparison sort functions for each of the tags
	// used for javascript .sort() function
	function compareFood(a,b) {
	  if (a.food < b.food)
	     return 1;
	  if (a.food > b.food)
	    return -1;
	  return 0;
	}
	function compareService(a,b) {
	  if (a.service < b.service)
	     return 1;
	  if (a.service > b.service)
	    return -1;
	  return 0;
	}
	function compareAtmosphere(a,b) {
	  if (a.atmosphere < b.atmosphere)
	     return 1;
	  if (a.atmosphere > b.atmosphere)
	    return -1;
	  return 0;
	}
	function comparePrice(a,b) {
	  if (a.price < b.price)
	     return 1;
	  if (a.price > b.price)
	    return -1;
	  return 0;
	}

	$("#sortFood").click(function() {
		$("#bizReviewsInner div[id='reviews-fb-friends'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-highlighted'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-following'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-friends'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-other'] > ul").slideUp("normal", function() { $(this).empty();

			// sort the reviews, add them to the page, and reveal
			reviewList.sort(compareFood);
			for(var i = 0 ; i < reviewList.length ; ++i) {
				$("#bizReviewsInner div[id='reviews-other'] > ul").append(reviewList[i].reviewObj);
			}
			$("#bizReviewsInner div[id='reviews-other'] > ul").slideDown();
		} );
	});

	$("#sortService").click(function() {
		$("#bizReviewsInner div[id='reviews-fb-friends'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-highlighted'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-following'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-friends'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-other'] > ul").slideUp("normal", function() { $(this).empty();

			// sort the reviews, add them to the page, and reveal
			reviewList.sort(compareService);
			for(var i = 0 ; i < reviewList.length ; ++i) {
				$("#bizReviewsInner div[id='reviews-other'] > ul").append(reviewList[i].reviewObj);
			}
			$("#bizReviewsInner div[id='reviews-other'] > ul").slideDown();
		} );
	});

	$("#sortAtmo").click(function() {
		$("#bizReviewsInner div[id='reviews-fb-friends'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-highlighted'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-following'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-friends'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-other'] > ul").slideUp("normal", function() { $(this).empty();

			// sort the reviews, add them to the page, and reveal
			reviewList.sort(compareAtmosphere);
			for(var i = 0 ; i < reviewList.length ; ++i) {
				$("#bizReviewsInner div[id='reviews-other'] > ul").append(reviewList[i].reviewObj);
			}
			$("#bizReviewsInner div[id='reviews-other'] > ul").slideDown();
		} );
	});

	$("#sortPrice").click(function() {
		$("#bizReviewsInner div[id='reviews-fb-friends'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-highlighted'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-following'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-friends'] > ul").slideUp("normal", function() { $(this).empty(); } );
		$("#bizReviewsInner div[id='reviews-other'] > ul").slideUp("normal", function() { $(this).empty();

			// sort the reviews, add them to the page, and reveal
			reviewList.sort(comparePrice);
			for(var i = 0 ; i < reviewList.length ; ++i) {
				$("#bizReviewsInner div[id='reviews-other'] > ul").append(reviewList[i].reviewObj);
			}
			$("#bizReviewsInner div[id='reviews-other'] > ul").slideDown();
		} );
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

		// update the reviewList array of review objects with the proper tagged attributes
		updateReviewList(reviewID, foodCount, serviceCount, atmosphereCount)

		$('#food'+reviewID).text("Food "+foodCount);
		$('#service'+reviewID).text("Service "+serviceCount);
		$('#atmosphere'+reviewID).text("Atmosphere "+atmosphereCount);
		// price ?
  	}
}

// given a reviewID and numbers for each count (from the database), update the local array of objects
function updateReviewList(reviewID, foodCount, serviceCount, atmosphereCount) {
	for (var i = 0 ; i < reviewList.length ; ++i) {
		if(reviewList[i].reviewID == reviewID) {
			reviewList[i].food = foodCount;
			reviewList[i].service = serviceCount;
			reviewList[i].atmosphere = atmosphereCount;
		}
	}
}