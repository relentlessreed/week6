// Fetch API Call
function searchForCity(city) {
  var API_key = "e87c9f8cf028352c8b3247cb0c5e0905";
  var newApiQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;

  fetch(newApiQuery)
    // convert response to .json
    .then((res) => res.json())
    .then((res) => {
      var lat = res.coord.lat;
      var long = res.coord.lon;
      console.log("LAT", lat);
      console.log("LONG", long);

      // make a new apiquery variable
      // use the lat and long from above
      // fetch again with new apiquery
      // inside that response, call another separate that handles 5 day forecast
      var fiveDayForecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`;
      fetch(fiveDayForecastApiUrl)
        .then((fiveDayRes) => fiveDayRes.json())
        .then((fiveDayRes) => {
          getWeather(res);
          saveToLocalStorage(res.name, res);
          console.log(fiveDayRes);
        });
    });
}
// Current Day variable
var currentTime = $("#currentDay").text(dayjs().format("MMM Do, YYYY hh:mm A"));
// weather is now outside of the fetch function
// now accecible via weather

function getWeatherFiveDay(days) {
  // do what getWeather does.. get data from argument, and set it into cards
}
function getWeather(weather) {
  // Take All The Data, and Put It Into The HTML
  var cityName = weather.name;
  var temp = weather.main.temp; // comes in kelvin
  var humidity = weather.main.humidity;
  var windSpeed = weather.wind.speed;
  temp = (temp - 273.15) * 1.8 + 32; // converts it fah
  // here
  // rounding temp float to whole number
  temp = Math.floor(temp);
  $("#city").text(cityName);
  $("#temp").text(`Temperature: ${temp}`);
  $("#windSpeed").text(`Wind Speed: ${windSpeed}`);
  $("#humidity").text(`Humidity: ${humidity}`);
  console.log(weather);
}
// event handling for search
$("#searchBtn").click(function (e) {
  console.log("Search Button Clicked");
  // console.log("Event ====>", e);

  // get value the user typed
  var cityToSearch = $("#search").val();
  console.log("THE CITY I TYPED", cityToSearch);

  searchForCity(cityToSearch);
});

// Saving input to local storage
function saveToLocalStorage(city, data) {
  localStorage.setItem("city-" + city, JSON.stringify(data));
  let table = localStorage.getItem("savedSearchTable");
  if (table) {
    table = JSON.parse(table);
  } else {
    table = {};
  }
  table[city] = true;
  localStorage.setItem("savedSearchTable", JSON.stringify(table));
  console.log(table);
}

// list searched cities
function listSearches() {
  let table = localStorage.getItem("savedSearchTable");
  if (table) {
    table = JSON.parse(table);
  } else {
    table = {};
  }
  return table;
}
// creates buttons for searched cities
let searchHistory = listSearches();
for (let key in searchHistory) {
  $("#previouslySearched").append(
    `<button id=saved-search-${key}>${key}</button><br></br>`
  );
  $(`#saved-search-${key}`).click(function (e) {
    // get saved city data
    var data = getSavedCityData(key);
    // Update card to render data from saved search
    getWeather(data);
    console.log(data);
  });
}

// TO DO: reload list after new search

// retrieve data for paticular city
function getSavedCityData(city) {
  var retrievedCity = localStorage.getItem("city-" + city);
  return JSON.parse(retrievedCity);
}
// Clear Local Storage on Button Click
// event handling for search

// loop over weather, populate

//if status !200 then otherwise console.log("error")

// Injecting Icon Example
// `http://openweathermap.org/img/wn/${icon}@2x.png`

// Inject Data Into HTML
// Dynamically Populate Page with Elements
//
/*
Weather Wizard
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

Acceptance Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/