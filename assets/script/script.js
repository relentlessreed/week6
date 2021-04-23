// Fetch API Call
function searchForCity(city) {
  var API_key = "e87c9f8cf028352c8b3247cb0c5e0905";
  var newApiQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_key}`;
  fetch(newApiQuery)
    // convert response to .json
    .then((res) => res.json())
    .then((data) => {
      var lat = data.coord.lat;
      var long = data.coord.lon;
      console.log("LAT", lat);
      console.log("LONG", long);

      // make a new apiquery variable
      // use the lat and long from above
      // fetch again with new apiquery
      // inside that response, call another separate that handles 5 day forecast
      // var fiveDayForecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`;
      var apiTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${API_key}`;
      fetch(apiTwo)
        .then((res) => res.json())
        .then((data) => {
          getWeather(data);
          console.log(data);
          saveToLocalStorage(data.name, data);

          getWeatherFiveDay(data);
          // Display Day of week in each card of Five Day Forecast [ ] <- Needs to be checked off
        });
    });
}
// √Getting Current Date
var currentTime = $("#currentDay").text(dayjs().format("MMM Do, YYYY hh:mm A"));
// weather is now outside of the fetch function
// now accecible via weather

// populate cards with five day forecast via loop
function getWeatherFiveDay(data) {
  for (i = 0; i < 5; i++) {
    $(`#card${i + 1}`).empty();
    $(`#card${i + 1}`).append(`<div id="appendedCard${i}"></div>`);
    var fiveDayDiv = $(`#appendedCard${i}`);
    fiveDayDiv.append(
      `<h3>${dayjs.unix(data.daily[i].dt).format("MM/DD/YYYY")}</h3>`
    );
    fiveDayDiv.append(
      `<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png" alt="${data.daily[i].weather[0].description}">`
    );
    fiveDayDiv.append(`<p>Temperature: ${data.daily[i].temp.max}</p>`);
    fiveDayDiv.append(`<p>Wind Speed: ${data.daily[i].wind_speed}</p>`);
    fiveDayDiv.append(`<p>Humidity: ${data.daily[i].humidity}</p>`);
  }

  /*$("#card1").empty();
  $("#card1").append(`<div id="appendedCard1"></div>`);
  var fiveDayDiv = $(`#appendedCard1`);
  fiveDayDiv.append(`<p>Temperature: ${data.current.temp}</p>`);
  fiveDayDiv.append(`<p>Wind Speed: ${data.current.wind_speed}</p>`);
  fiveDayDiv.append(`<p>Humidity: ${data.current.humidity}</p>`);*/

  // do what getWeather does.. get data from argument, and set it into cards
  // Grab weather Icon
  //<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png" alt="${data.daily[i].weather[0].description}">
}
function getWeather(data) {
  // Take All The Data, and Put It Into The HTML
  var cityName = data.name;
  var temp = data.current.temp; // comes in kelvin
  var humidity = data.current.humidity;
  var windSpeed = data.current.wind_speed;
  // rounding temp float to whole number
  // Getting √CITY NAME,
  temp = Math.floor(temp);
  $("#city").text(cityToSearch);
  $("#weatherIcon").attr(
    "src",
    `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
  );
  $("#temp").text(`Temperature: ${temp}`);
  $("#windSpeed").text(`Wind Speed: ${windSpeed}`);
  $("#humidity").text(`Humidity: ${humidity}`);
  console.log(data);
}
// Get and Color UV index
function readUvi(uvi) {
  if (uvi <= 2) {
    return "#adffdc";
  }
  if (2 < uvi <= 5) {
    return "#ffe799";
  }
  if (5 < uvi <= 7) {
    return "f7bca1";
  }
  if (7 < uvi <= 10) {
    return "#ea9a9d";
  }
  if (uvi > 10) {
    return "#dfa4f4";
  }
}
var cityToSearch = "";
// event handling for search
$("#searchBtn").click(function (e) {
  //console.log("Search Button Clicked");
  // console.log("Event ====>", e);

  // get value the user typed
  cityToSearch = $("#search").val();
  //console.log("THE CITY I TYPED", cityToSearch);

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
    cityToSearch = key;
    // Update card to render data from saved search
    searchForCity(key);
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

// loop over weather, populate

//if status !200 then otherwise console.log("error")

// Inject Icon

// Inject Data Into HTML
// Dynamically Populate Page with Elements
//
/*
Weather Wizard
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

Acceptance Criteria
GIVEN a weather dashboard with form inputs[√]
WHEN I search for a city[√]
THEN I am presented with current and future conditions for that city[] and that city is added to the search history[√]
WHEN I view current weather conditions for that city
THEN I am presented with the [√]city name, []the date, []an icon representation of weather conditions, [√]the temperature, [√]the humidity, [√]the wind speed, []and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe[]
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date[], an icon representation of weather conditions[], the temperature[], the wind speed[], and the humidity[]
WHEN I click on a city in the search history[]
THEN I am again presented with current and future conditions for that city[]
*/
