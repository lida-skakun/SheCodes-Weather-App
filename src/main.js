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

function displayWeeklyForecast() {
  let forecastElement = document.querySelector("#weekForecast");
  forecastElement.innerHTML = `
    <div class="row dayForecast">
            <div class="col-8">Monday</div>
            <div class="col-2">28</div>
            <div class="col-2 nightTemperature">13</div>
    </div>`;
}
function searchWeeklyForecast(coordinates) {
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  // axios.get(apiUrl).then(displayWeeklyForecast);
}

function showWeather(response) {
  let temperatureElement = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#location");
  let iconElement = document.querySelector("#weatherIcon");

  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let city = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = `${description}`;
  cityElement.innerHTML = `${city}`;

  searchWeeklyForecast(response.data.coord);
}

function searchWeather(city) {
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#searchCity").value;
  searchWeather(cityElement);
}

let searchForm = document.querySelector(".searchForm");
searchForm.addEventListener("submit", handleSubmit);

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

searchWeather("Chernihiv");
displayWeeklyForecast();
