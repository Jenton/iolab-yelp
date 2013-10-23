// proof of concept to automatically tag a review when it's being written/added.
// We can't actually implement this because we don't know the reviewID of a review prior to its submission
// if we were yelp and could do this on the backend, that would be a different story
$(document).ready(function(){
	// Get business id. Last segment of the URL (split off beginning part)
	// but without query string (so split off the last part)
	var currentURL = document.URL;
	// alert("currentURL: " + currentURL);
	var urlWithoutQueryString = currentURL.split('?')[0];
	// alert("urlWithoutQueryString: " + urlWithoutQueryString);
	var bizId = urlWithoutQueryString.substr(urlWithoutQueryString.lastIndexOf('/') + 1);
	// alert("bizID: " + bizId);


	$("#save_now").on("click", function() {
		haskey();
	});


	function haskey() {
	    var total_food = 0;
	    var total_service = 0;
	    var total_atmosphere = 0;
	    var total_price = 0;
	    var review_str =$("#review-text").val().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase().split(" ");
	    var food_list = ["", "juicy", "fresh", "seasoned", "salty", "dessert", "milk", "sugar", "water", "salad", "culinary", "coffee", "pizza", "pasta", "food", "delicious", "appetizing", "crunchy", "spicy", "sweet", "greasy", "fishy", "buttery", "bland", "bitter", "aftertaste", "mouthwatering", "flavors", "flavor"];
	    var service_list = ["", "professional", "reservation", "personal", "reservation", "staff", "service", "slow", "pleasure", "polite", "waiter", "waitress", "fast", "helpful", "friendly", "prompt", "efficient"];
	    var atmosphere_list = ["", "crowd","parties", "party","ambiance", "anniversary", "light", "music", "conversation", "fireplace", "loud", "quiet"];
	    var price_list = ["", "cheap", "expensive", "price", "cost", "discounted", "low-priced"];
	    
	    //create an empty dict. 
	    var haskey_dict = {};

	    //iterate over each of the items in the review_str and place "word:1" into dict. 
	    //if word exists already word+=1.
	    for (var i = 0; i < review_str.length; i++) {
	      if (review_str[i] in haskey_dict) {
	        haskey_dict[review_str[i]] += 1;
	      }
	      else {
	        haskey_dict[review_str[i]] = 1;
	      }
	    };
	    console.log(haskey_dict)
	    $.each(haskey_dict, function(key, value) { 
	        contains_food = $.inArray(key, food_list);
	        if (contains_food > 0)
	          total_food += value

	        contains_service = $.inArray(key, service_list);
	        if (contains_service > 0)
	          total_service += value
	        
	        contains_atmosphere = $.inArray(key, atmosphere_list);
	        if (contains_atmosphere > 0)
	          total_atmosphere += value
	        
	        contains_price = $.inArray(key, price_list);
	        if (contains_price > 0)
	          total_price += value
	    });

	    // if any metric rating is above 3, let's add a tag
	    var alertStr = "Tag review with: ";
	    if(total_food >= 3)
	    	alertStr += "Food ";
	    if(total_service >= 3)
	    	alertStr += "Service ";
	    if(total_atmosphere >= 3)
	    	alertStr += "Atmosphere ";
	    if(total_price >= 3)
	    	alertStr += "Price ";
	    alert(alertStr);


		// $.ajax({
  //   		type:"post",
  //   		url:"http://people.ischool.berkeley.edu/~jenton/IO_Lab_P2/phpScript.php",
  //   		data:"action=service"+"&bizID="+bizId+"&reviewID="+selectedId+"&reviewIDs="+idArray,
  //   		success:function(data){
  //    			updateCounts(data);
  //  			}
 	// 	});
	};
});