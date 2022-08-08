function formatDate() {
  let dateTime = document.querySelector("#dateTime");
  let currentDate = new Date();

  let day = currentDate.getDate();
  if (day < 10) {
    day = `0${day}`;
  }

  let month = currentDate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let year = currentDate.getFullYear();

  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  dateTime.innerHTML = `${day}.${month}.${year}  ${hours}:${minutes}`;
}

formatDate();

let apiKey = "93791ed1c5ac3002a2880b95c37460d5";
let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;

function showWeather(response) {
  let temperatureElement = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#location");

  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let city = response.data.name;

  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = `${description}`;
  cityElement.innerHTML = `${city}`;
}

function searchWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity").value;
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector(".searchForm");
searchForm.addEventListener("submit", searchWeather);

function findPosition(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCoordinates() {
  navigator.geolocation.getCurrentPosition(findPosition);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCoordinates);
