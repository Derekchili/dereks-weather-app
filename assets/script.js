// when search for a city i am presented with current and future conditions for that city
// when i view current conditions i am presented with city name, the date, icon with weather, temp, wind, humidity
// when i view future result then presented with a five day forecast for that city 
// when I click the history for city search I am again presented current and future conditions for that city
// need to find the geo codes for a city that is typed in find it on the api weather site
// will be using local storage for this
// set up some variables that I can use in functions and document get element by id linking to html
function searchCity(cityName){

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=04fabde45204801fed27366861779456";

console.log(apiUrl)

// create a fetch url function that returns json response
fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
 
    .then(function (data) {
        console.log('Fetch Response \n---------');
        console.log(data);
    
    
    var temp = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;

    $('#temp').text(temp  + '°F' + 'Temp');
    $('#wind').text(wind + 'mph' + 'MPH');
    $('#humidity').text(humidity + '%' + 'humidity');
});

}
// .catch(function (error) {
//         console.error('Fetch Error \n-------');
//         console.log(error);
//     });
// function for getting weather by city input

// addevent listener for the search button
var btn = document.querySelector('.btn');
$('.btn').on('click', function(event) {
    event.preventDefault()
    var cityName = $('.city').val();
    $('.city-list').html($('.city').val());
    // $('.city').append('.city-list');
    searchCity(cityName);
    
});



