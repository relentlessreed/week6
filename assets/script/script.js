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
      dataCity = data.name;
      var apiTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${API_key}`;
      fetch(apiTwo)
        .then((res) => res.json())
        .then((data) => {
          getWeather(data);
          console.log(dataCity);
          saveToLocalStorage(dataCity, data);

          getWeatherFiveDay(data);
        });
    });
}
var dataCity = "";

// Getting Current Date
var currentTime = $("#currentDay").text(
  dayjs().format("dddd MMM Do, YYYY hh:mm A")
);
// weather is now outside of the fetch function
// now accecible via weather

// populate cards with five day forecast via loop
function getWeatherFiveDay(data) {
  for (i = 0; i < 5; i++) {
    $(`#card${i + 1}`).empty();
    $(`#card${i + 1}`).append(`<div id="appendedCard${i}"></div>`);
    var fiveDayDiv = $(`#appendedCard${i}`);
    fiveDayDiv.append(
      `<h3>${dayjs.unix(data.daily[i].dt).format("dddd MM/DD/YYYY")}</h3>`
    );
    fiveDayDiv.append(
      `<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png" alt="${data.daily[i].weather[0].description}">`
    );
    fiveDayDiv.append(`<p>Temperature: ${data.daily[i].temp.max}</p>`);
    fiveDayDiv.append(`<p>Wind Speed: ${data.daily[i].wind_speed}</p>`);
    fiveDayDiv.append(`<p>Humidity: ${data.daily[i].humidity}</p>`);
  }
}
function getWeather(data) {
  var uvi = data.current.uvi;
  readUvi(uvi, "#uviReadout");

  // Takes all data an injects into HTML
  var cityName = data.name;
  var temp = data.current.temp; // comes in kelvin
  var humidity = data.current.humidity;
  var windSpeed = data.current.wind_speed;

  // Rounding temp float to whole number
  // Getting CITY NAME,
  temp = Math.floor(temp);
  $("#city").text(cityToSearch);
  $("#weatherIcon").attr(
    "src",
    `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
  );
  $("#temp").text(`Temperature: ${temp}`);
  $("#windSpeed").text(`Wind Speed: ${windSpeed}`);
  $("#humidity").text(`Humidity: ${humidity}`);
  $("#uviReadout").text(`UV Index: ${uvi}`);
  console.log(data);
}

// Get and Color UV index
function readUvi(uvi, el) {
  switch (true) {
    case uvi < 2:
      $(el).css("color", "#adffdc");
      break;
    case uvi > 2:
      $(el).css("color", "#ffe799");
      break;
    case uvi > 5:
      $(el).css("color", "#f7bca1");
      break;
    default:
      $(el).css("color", "#ffffff");
      break;
  }
}

var cityToSearch = "";

// event handling for search
$("#searchBtn").click(function (e) {
  // get value the user typed
  cityToSearch = $("#search").val();

  // if city to search does not equal empty string or undefined, then search for city
  if (!cityToSearch == "" || !cityToSearch == typeof "undefined") {
    searchForCity(cityToSearch);
  }
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
  $("#previouslySearched").append(`<button data-name="${key}">${key}</button><br></br>`);}


// retrieve data for paticular city
function getSavedCityData(city) {
  var retrievedCity = localStorage.getItem("city-" + city);
  return JSON.parse(retrievedCity);
}
// Clear Local Storage on Button Click
$("#clearBtn").click(function (e) {
  localStorage.clear();
  //removes any children within parent
  $("#previouslySearched").empty();
});

$(`#previouslySearched`).on("click", "button", function (e) {
  // get saved city data
  var name = getSavedCityData(e.target.dataset.name);

  // Update card to render data from saved search
  searchForCity(name);
  console.log(name);
});
