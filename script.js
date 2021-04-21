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
