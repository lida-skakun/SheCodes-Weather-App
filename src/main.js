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

function getCoordinates() {
  navigator.geolocation.getCurrentPosition(findPosition);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCoordinates);
