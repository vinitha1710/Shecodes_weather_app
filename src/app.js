alert("Welcome to Vinitha's Weather app");

function refreshWeather(Response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(Response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${Response.data.condition.icon_url}" class="weather-app-icon" />`;

  cityElement.innerHTML = Response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = Response.data.condition.description;
  humidityElement.innerHTML = `${Response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Response.data.wind.speed}mph`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(Response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "dfb7a34o08287b67f88fe5bd29ta4408";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(Response) {
  let forecastHtml = "";

  Response.data.daily.forEach(function (day) {
    console.log(Response);
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div>
            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
            </div>
            <div class="weather-forecast-temp">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature">| ${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>
          `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");
