// Fetch API Call
// change to ""
var lat = 39.099724;
var lon = -94.578331;
var API_key = "e87c9f8cf028352c8b3247cb0c5e0905";
var apiQuery = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_key}`;
// Console.Log Data
fetch(apiQuery)
  // convert response to .json
  .then((res) => res.json())
  .then((data) => getWeather(data.daily));
// weather is now outside of the fetch function
// now accecible via weather
function getWeather(weather) {
  console.log(weather);
}
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
