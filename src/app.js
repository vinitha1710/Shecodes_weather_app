alert("Welcome to Vinith's Weather app");

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElemnt = document.querySelector("#weather-app-city");
  cityElemnt.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
