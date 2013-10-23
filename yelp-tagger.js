var reviewList = [];

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
	// Add vote/tag buttons
	$("#bizReviewsInner ul li[id^=review_]").each(function(){

		var selectedId = this.id;

		if(typeof(Storage)!=="undefined") {
			// localStorage and sessionStorage support
			var storedVotes = JSON.parse(localStorage.getItem(selectedId));
			if(!storedVotes) {
				// nothing in localStorage
				// Food button
				$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton foodButton inline-block" id="food'+this.id+'">Food 0'+'</li>');	

				// service button
				$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton serviceButton inline-block" id="service'+this.id+'">Service 0'+'</li>');	

				// Atmosphere button
				$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton atmosphereButton inline-block" id="atmosphere'+this.id+'">Atmosphere 0'+'</li>');	

				// Price button
				$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton priceButton inline-block" id="price'+this.id+'">Price 0'+'</li>');	
			} else {
				// we've voted in some way or another on this review before.

				if(storedVotes.food > 0) {
					// Food button
					$(this).find($("div.rateReview ul:last-child")).append('<li class="disabledButton foodButton inline-block" id="food'+this.id+'">Food 0'+'</li>');	
				} else {
					$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton foodButton inline-block" id="food'+this.id+'">Food 0'+'</li>');	
				}

				if(storedVotes.service > 0) {
					// service button
					$(this).find($("div.rateReview ul:last-child")).append('<li class="disabledButton serviceButton inline-block" id="service'+this.id+'">Service 0'+'</li>');	
				} else {
					$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton serviceButton inline-block" id="service'+this.id+'">Service 0'+'</li>');	
				}

				if(storedVotes.atmosphere > 0) {
					// Atmosphere button
					$(this).find($("div.rateReview ul:last-child")).append('<li class="disabledButton atmosphereButton inline-block" id="atmosphere'+this.id+'">Atmosphere 0'+'</li>');	
				} else {
					$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton atmosphereButton inline-block" id="atmosphere'+this.id+'">Atmosphere 0'+'</li>');	
				}

				if(storedVotes.price > 0) {
					// Price button
					$(this).find($("div.rateReview ul:last-child")).append('<li class="disabledButton priceButton inline-block" id="price'+this.id+'">Price 0'+'</li>');	
				} else {
					$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton priceButton inline-block" id="price'+this.id+'">Price 0'+'</li>');	
				}

			}
		} else {
			// no localstorage support
			$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton foodButton inline-block" id="food'+this.id+'">Food 0'+'</li>');	

			// service button
			$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton serviceButton inline-block" id="service'+this.id+'">Service 0'+'</li>');	

			// Atmosphere button
			$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton atmosphereButton inline-block" id="atmosphere'+this.id+'">Atmosphere 0'+'</li>');	

			// Price button
			$(this).find($("div.rateReview ul:last-child")).append('<li class="customizedButton priceButton inline-block" id="price'+this.id+'">Price 0'+'</li>');	
		}

	});

	// add event listeners. These click handlers also need to be readded after we rebuild the DOM when sorting.
	addVoteListeners(bizId, idArray);


	/* SORTING BY OUR CUSTOM TAGS */
	// modify the sort options, overwriting existing ones. create sort options for sorting by our custom tags
	$("#review_sort_section").html('Sort by: <a href="?sort_by=date_desc">Date</a> | <a href="?sort_by=rating_desc">Rating</a> | <a href="?sort_by=friends_desc">Friends\'</a> | <a href="?sort_by=elites_desc">Elites\'</a> | <a id="sortFood" href="#food">Food</a> | <a id="sortService" href="#service">Service</a> | <a id="sortAtmo" href="#atmosphere">Atmosphere</a> | <a id="sortPrice" href="#price">Price</a>');

	// on click of each sorting option:
	// sort local reviewList by that option
	// jquery sort DOM
	$("#sortFood").click(function() {
		// remove text "Reviews from ____" and "2954 reviews in English"
		removeExtraText();

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

			addVoteListeners(bizId, idArray);

		} );

	});

	$("#sortService").click(function() {
		// remove text "Reviews from ____" and "2954 reviews in English"
		removeExtraText();
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

			addVoteListeners(bizId, idArray);
		} );
	});

	$("#sortAtmo").click(function() {
		// remove text "Reviews from ____" and "2954 reviews in English"
		removeExtraText();
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

			addVoteListeners(bizId, idArray);
		} );
	});

	$("#sortPrice").click(function() {
		// remove text "Reviews from ____" and "2954 reviews in English"
		removeExtraText();
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
			addVoteListeners(bizId, idArray);
		} );
	});

});



function addVoteListeners(bizId, idArray) {
	$("#bizReviewsInner ul li[id^=review_]").each(function(){

		var selectedId = this.id;
		$('#food'+this.id).click(function(){
			// update storedVotes, put it back in localStorage
			// check local storage to see if we've voted before
			var storedVotes = checkStorage(selectedId);

			if(storedVotes.food == 0) {
				// first time voting on a button.
				storedVotes.food += 1;				
				localStorage.setItem(selectedId, JSON.stringify(storedVotes));

				$.ajax({
		    		type:"post",
		    		url:"http://people.ischool.berkeley.edu/~jenton/IO_Lab_P2/phpScript.php",
		    		data:"action=food"+"&bizID="+bizId+"&reviewID="+selectedId+"&reviewIDs="+idArray,
		    		success:function(data){
		     			updateCounts(data);
		   			}
		 		});

				// disable the button
		 		$(this).removeClass("customizedButton");
				$(this).addClass("disabledButton");
			}
		});

		$('#service'+this.id).click(function(){
			// update storedVotes, put it back in localStorage
			// check local storage to see if we've voted before
			var storedVotes = checkStorage(selectedId);

			if(storedVotes.service == 0) {
				// first time voting on a button.
				storedVotes.service += 1;				
				localStorage.setItem(selectedId, JSON.stringify(storedVotes));


				$.ajax({
		    		type:"post",
		    		url:"http://people.ischool.berkeley.edu/~jenton/IO_Lab_P2/phpScript.php",
		    		data:"action=service"+"&bizID="+bizId+"&reviewID="+selectedId+"&reviewIDs="+idArray,
		    		success:function(data){
		     			updateCounts(data);
		   			}
		 		});

				// disable the button
		 		$(this).removeClass("customizedButton");
				$(this).addClass("disabledButton");
			}
		});

		$('#atmosphere'+this.id).click(function(){
			// update storedVotes, put it back in localStorage
			// check local storage to see if we've voted before
			var storedVotes = checkStorage(selectedId);

			if(storedVotes.atmosphere == 0) {
				// first time voting on a button.
				storedVotes.atmosphere += 1;				
				localStorage.setItem(selectedId, JSON.stringify(storedVotes));


				$.ajax({
		    		type:"post",
		    		url:"http://people.ischool.berkeley.edu/~jenton/IO_Lab_P2/phpScript.php",
		    		data:"action=atmosphere"+"&bizID="+bizId+"&reviewID="+selectedId+"&reviewIDs="+idArray,
		    		success:function(data){
		     			updateCounts(data);
		   			}
		 		});

				// disable the button
		 		$(this).removeClass("customizedButton");
				$(this).addClass("disabledButton");
			}
		});
	
		$('#price'+this.id).click(function(){
			// update storedVotes, put it back in localStorage
			// check local storage to see if we've voted before
			var storedVotes = checkStorage(selectedId);

			if(storedVotes.price == 0) {
				// first time voting on a button.
				storedVotes.price += 1;				
				localStorage.setItem(selectedId, JSON.stringify(storedVotes));

				$.ajax({
		    		type:"post",
		    		url:"http://people.ischool.berkeley.edu/~jenton/IO_Lab_P2/phpScript.php",
		    		data:"action=price"+"&bizID="+bizId+"&reviewID="+selectedId+"&reviewIDs="+idArray,
		    		success:function(data){
		     			updateCounts(data);
		   			}
		 		});

				// disable the button
		 		$(this).removeClass("customizedButton");
				$(this).addClass("disabledButton");
			}
		});
	});
}

// check if localstorage has the selectedId
function checkStorage(selectedId) {
	if(typeof(Storage)!=="undefined") {
		// localStorage and sessionStorage support
		var storedVotes = JSON.parse(localStorage.getItem(selectedId));
		if(!storedVotes) {
			// initialize localstorage with blanks if this is the first time voting
			localStorage.setItem(selectedId, JSON.stringify({food:0,atmosphere:0,service:0,price:0}));
			storedVotes = JSON.parse(localStorage.getItem(selectedId));
		}
		return storedVotes;
	}
	else {
		// no localStorage support
	}
}

function removeExtraText() {
	// remove "reviews from [your facebook friends, etc]"
	// remove "2954 reviews in English" type of text
	$("#bizReviewsInner div[id^=reviews] > h3").each(function(){
		$(this).remove();
	});
}

function updateCounts(data) {
	//create an array where each element is a string consisting of reviewID, food count, service count separated with an &
	var info = data.split(";");
	info.pop();
	// console.log(info);
	for (var i = 0; i < info.length;i++) {
		//create an array where each element is the reviewID, food count, and service count
		var review = info[i].split("&");
		// console.log(review);
		//saving the reviewID, food count, and service count into variables
		var reviewID = review[0].slice(3);
		var foodCount = review[1].slice(5);
		var serviceCount = review[2].slice(8);
		var atmosphereCount = review[3].slice(11);
		var priceCount = review[4].slice(6);
		// console.log(reviewID);
		// console.log(foodCount);
		// console.log(serviceCount);
		// console.log(atmosphereCount);
		// console.log(priceCount);

		// update the reviewList array of review objects with the proper tagged attributes
		updateReviewList(reviewID, foodCount, serviceCount, atmosphereCount, priceCount)

		$('#food'+reviewID).text("Food "+foodCount);
		$('#service'+reviewID).text("Service "+serviceCount);
		$('#atmosphere'+reviewID).text("Atmosphere "+atmosphereCount);
		$('#price'+reviewID).text("Price "+priceCount);
  	}
}

// given a reviewID and numbers for each count (from the database), update the local array of objects
function updateReviewList(reviewID, foodCount, serviceCount, atmosphereCount, priceCount) {
	for (var i = 0 ; i < reviewList.length ; ++i) {
		if(reviewList[i].reviewID == reviewID) {
			reviewList[i].food = foodCount;
			reviewList[i].service = serviceCount;
			reviewList[i].atmosphere = atmosphereCount;
			reviewList[i].price = priceCount;
		}
	}
}

// comparison sort functions for each of the tags
// used for javascript .sort() function
function compareFood(a,b) {
  if (parseInt(a.food) < parseInt(b.food))
     return 1;
  if (parseInt(a.food) > parseInt(b.food))
    return -1;
  return 0;
}
function compareService(a,b) {
  if (parseInt(a.service) < parseInt(b.service))
     return 1;
  if (parseInt(a.service) > parseInt(b.service))
    return -1;
  return 0;
}
function compareAtmosphere(a,b) {
  if (parseInt(a.atmosphere) < parseInt(b.atmosphere))
     return 1;
  if (parseInt(a.atmosphere) > parseInt(b.atmosphere))
    return -1;
  return 0;
}
function comparePrice(a,b) {
  if (parseInt(a.price) < parseInt(b.price))
     return 1;
  if (parseInt(a.price) > parseInt(b.price))
    return -1;
  return 0;
}