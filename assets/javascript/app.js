$(document).ready(function() {

const list = ["wombo combo", "zelda", "westballz", "eevee", "persona", "joestar", "ppmd", "mang0", "kirby", "mario"];

// psuedocode:
// for each index of array, generate a button and append onto page 
//create a search form for giphys
// criteria: 
  //giphy api_key
  // q:string query goes here
  // limit: (takes an integer)
// list.forEach(element => {
//   let button = $(`<button>`).text(element);
//   $(".row").append(button)
// });

const buttonMaker = () => {
  $(".buttonStuff").empty();
  for (i=0; i<list.length; i++) {
    let button = $(`<button class="btn btn-search alert-info mx-2" id="button-${i}">`).text(list[i]);
    $(".buttonStuff").append($(`<div class=".col-sm">`).append(button));
  };
};

buttonMaker();

let limit = 10;

$(document).on("click", ".btn-search", function() {
  let query = $(this).text();
  $(".imagesHere").text("");
  // let buttonId = $(this).attr("id");
  // console.log(query);
  if (limit) {
    $(query).append(`&q=limit:${limit}`);
  };
  let queryURL = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=9xitpxMgOEVsyAOoJRF0Sg8kjmAjOkVh`
  // console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (let i=1; i<= limit; i++) {
      let currentImageStill = response.data[i].images.fixed_height_still.url;
      let currentImageAnimate = response.data[i].images.fixed_height.url;
      let imgRating = response.data[i].rating;
      let rating = `<p>Rating: ${imgRating.toUpperCase()}</p>`;
      // console.log(imgRating);
      let image = $(`<img id="image-${i}">`).attr("src", currentImageStill);
      $(image).attr("data-still", currentImageStill);
      $(image).attr("data-animate", currentImageAnimate);
      $(image).attr("state", false);
      let col = $(`<div class="col-sm m-2">`)
      $(".imagesHere").append($(col));
      $(col).append($(image));
      $(col).append($(rating));
      
      // console.log(currentImageStill);
      // console.log(currentImageAnimate);
    };
  });
});

$(document).on("click", "img", function() {
  let currentState = $(this).attr("state");
  // console.log(currentState);
  // console.log("is currentstate false?" + currentState === false)
  if (currentState === "false") {
    let animate = $(this).data("animate");
    // console.log(animate);
    $(this).attr("src", animate);
    $(this).attr("state", true);
  } else {
    let still = $(this).data("still");
    // console.log(still);
    $(this).attr("src", still)
    $(this).attr("state", false);
  };
});

$(document).on("click", ".submitB", function(event) {
  event.preventDefault();

  let search = $(".form1").val();
  console.log(search);
  if (search) {
    list.push(search);
  };
  let limitCheck = parseInt($(".form2").val());
  if (limitCheck >= 1  && limitCheck <=25) {
    limit = limitCheck;
  };
  console.log(limit);
  buttonMaker();
  $(".form1").val("");
  $(".form2").val("");

});

});