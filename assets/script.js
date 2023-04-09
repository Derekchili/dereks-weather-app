// when search for a city i am presented with current and future conditions for that city
// when i view current conditions i am presented with city name, the date, icon with weather, temp, wind, humidity
// when i view future result then presented with a five day forecast for that city
// when I click the history for city search I am again presented current and future conditions for that city
// need to find the geo codes for a city that is typed in find it on the api weather site
// will be using local storage for this
// set up some variables that I can use in functions and document get element by id linking to html
function searchCity(cityName) {
  var apiUrlCurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=04fabde45204801fed27366861779456";
  var apiUrlForecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial&appid=04fabde45204801fed27366861779456";

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
      $("#current-temp").text(temp + "°F" + "Temp");
      $("#current-wind").text(wind + "mph" + "MPH");
      $("#current-humidity").text(humidity + "%" + "humidity");

      // function to create the forecast 5 day
      fetch(apiUrlForecast)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("forecast Data:\n", data);

          // for loop to add the forecast to the cards I hope
          for (var i = 0; i < 5; i++) {
            var date = new Date(data.list[i * 8].dt_txt.replace(" ", "T"));
            var dayOfWeek = date.toLocaleDateString("en-US", {
              weekday: "long",
            });
            var iconCode = data.list[i * 8].weather[0].icon;
            var temp = data.list[i * 8].main.temp;
            var wind = data.list[i * 8].wind.speed;
            var humidity = data.list[i * 8].main.humidity;

            $("#card" + i + " .card-date").text(dayOfWeek);
            $("#card" + i + " .card-icon").attr(
              "src",
              "https://openweathermap.org/img/w/" + iconCode + ".png"
            );
            $("#card" + i + " .card-temp").text(temp + "°F");
            $("#card" + i + " .card-wind").text(wind + " mph");
            $("#card" + i + " .card-humidity").text(humidity + "%");
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
  $(".city-list").html($(".city").val());
  // $('.city').append('.city-list');
  searchCity(cityName);
});
