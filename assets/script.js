
// when i view future result then presented with a five day forecast for that city
// when I click the history for city search I am again presented current and future conditions for that city
// need to find the geo codes for a city that is typed in find it on the api weather site
// will be using local storage for this
// set up some variables that I can use in functions and document get element by id linking to html
var cityArr = JSON.parse(localStorage.getItem('city')) || [];

function searchCity(cityName) {
  var apiUrlCurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=04fabde45204801fed27366861779456";
  var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&   units=imperial&appid=04fabde45204801fed27366861779456";

  console.log(apiUrlCurrent);
  console.log(apiUrlForecast);

  // create a fetch url function that returns json response
  fetch(apiUrlCurrent)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log("Fetch Response \n---------");
      console.log(data);

      // to display the current weather
      var temp = data.main.temp;
      var wind = data.wind.speed;
      var humidity = data.main.humidity;
     
      $("#current-city-name").text(data.name);
      $("#current-temp").text("Temp: " + temp + "°F");
      $("#current-wind").text("MPH: " + wind + "mph");
      $("#current-humidity").text("Humidity: " + humidity + "%");

      // function to create the forecast 5 day
      fetch(apiUrlForecast)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("Fetch Response \n----------");
          console.log(data);
          var a = 0;
          // for loop to add the forecast to the cards I hope
          for (var i = 0; i <= data.list.length; i+=7) {
            console.log(data.list[i]);
            var date = new Date(data.list[i].dt_txt.replace(" ", "T"));
            var dayOfWeek = date.toLocaleDateString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'});
            var iconCode = data.list[i].weather[0].icon;
            var temp = data.list[i].main.temp;
            var wind = data.list[i].wind.speed;
            var humidity = data.list[i].main.humidity;

            $("#card" + a + " .card-date").text(dayOfWeek);
            $("#card" + a + " .card-icon").attr(
              "src",
              "https://openweathermap.org/img/w/" + iconCode + ".png"
            );
            $("#card" + a + " .card-temp").text('temp: ' + temp + "°F");
            $("#card" + a + " .card-wind").text('wind: ' + wind + "mph");
            $("#card" + a + " .card-humidity").text('humidity: ' + humidity + "%");
            a++
          }
        })
        .catch(function (error) {
          console.log("Error fetching forecast data:", error);
        });
    })
    .catch(function (error) {
      console.log("Error fetching forecast data:", error);
    });
}
// function for getting weather by city input

// addevent listener for the search button
var btn = document.querySelector(".btn");
$(".btn").on("click", function (event) {
  event.preventDefault();
  var cityName = $(".city").val();
  // $(".city-list").html($(".city").val());
// saving city search name to local sotrage
  searchCity(cityName);
  cityArr.push(cityName);
  localStorage.setItem('city', JSON.stringify(cityArr));

// now  on screen load, the last searched history stored in local should display on load
 
});
function renderBtn(){
  if (cityArr.length > 0) {
    searchCity(cityArr[0])
    for (let i = 0; i < cityArr.length; i++) {
      $(".city-list").append(`<li><button class='listItem'>${cityArr[i]}</button></li>`);
      
    }
  }
  $('.listItem').on('click', function (event){
    var clickCity = $(event.target).text();
    searchCity(clickCity);
    console.log(clickCity);
  });
}

renderBtn();
