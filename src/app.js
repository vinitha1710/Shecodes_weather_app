alert("Welcome to Vinith's Weather app");

function refreshWeather(Response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Response.data.temperature.current;
  let cityElemnt = document.querySelector("#weather-app-city");

  cityElemnt.innerHTML = Response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "dfb7a34o08287b67f88fe5bd29ta4408";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
