$(document).ready(function(){
  // this array is for holding all the different review IDs
  var idArray = [];
  //this variable is for capturing the business ID for the particular page
  var bizID = $(".bizID").attr("value");

// this traverses through each h1 tag in the html, and grabs the value from each one.
// the value is suppose to correspond to the reviewID
$("h1").each(function(){
  if($(this).attr("class") == "review") {
    idArray.push($(this).attr("value"));
  }
});
 
  //when the page loads, make a call to the database and get the food and service tags
  $.ajax({
    type:"post",
    url:"phpScript.php",
    data:"action=pageload"+"&bizID="+bizID+"&reviewIDs="+idArray,
    success:function(data){
      updateCounts(data);
   } 
 });

  // When you click the food button, this code runs
  $(".foodButton").on("click", function(){
  //pass the reviewID value from the html into a variable (<h1 class="review" value="1"...)
  var reviewID = $(this).siblings(".review").attr("value");
  console.log(reviewID);

  //Ajax call. The data: passes in whatever information you want into the foodButton.php file. You can type in whatever you key you want and you can reference it in the php file
  $.ajax({
    type:"post",
    url:"./phpScript.php",
    data:"action=food"+"&bizID="+bizID+"&reviewID="+reviewID+"&reviewIDs="+idArray,
    success:function(data){
     updateCounts(data);
   }
 });
});

  $(".serviceButton").on("click", function(){
  //pass the reviewID value from the html into a variable (<h1 class="review" value="1"...)
  var reviewID = $(this).siblings( ".review").attr("value");

  $.ajax({
    type:"post",
    url:"phpScript.php",
    data:"action=service"+"&bizID="+bizID+"&reviewID="+reviewID+"&reviewIDs="+idArray,
    success:function(data){
      updateCounts(data);

    }
  });
});

  // When you click the atmosphere button, this code runs
  $(".atmosphereButton").on("click", function(){
  //pass the reviewID value from the html into a variable (<h1 class="review" value="1"...)
  var reviewID = $(this).siblings( ".review").attr("value");
  console.log(reviewID);

  //Ajax call. The data: passes in whatever information you want into the foodButton.php file. You can type in whatever you key you want and you can reference it in the php file
  $.ajax({
    type:"post",
    url:"./phpScript.php",
    data:"action=atmosphere"+"&bizID="+bizID+"&reviewID="+reviewID+"&reviewIDs="+idArray,
    success:function(data){
     updateCounts(data);
   }
 });
});

}); //end of document.ready

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
      
      // adding the food and service counts to the appropriate buttons
      //$("#" + reviewID).siblings(".foodButton").attr("value", "Food (" + foodCount + ")");
      //$("#" + reviewID).siblings(".serviceButton").attr("value", "Service (" + serviceCount + ")");
      //$("#" + reviewID).siblings(".atmosphereButton").attr("value", "Atmosphere (" + atmosphereCount + ")");

      $(".review").each(function(){
        if($(this).attr("value") == reviewID) {
        $(this).siblings(".foodButton").attr("value", "Food (" + foodCount + ")");
        $(this).siblings(".serviceButton").attr("value", "Service (" + serviceCount + ")");
        $(this).siblings(".atmosphereButton").attr("value", "Atmosphere (" + atmosphereCount + ")"); 
        }
      }) 
    }
  }