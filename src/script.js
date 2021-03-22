//Search Engine using OpenWeather API
//display current weather details for search city

function displayWeather(newWeather) {
  console.log(newWeather);
  //curent temp
  let temp = newWeather.data.main.temp
  temp = Math.round(temp);
  let cityTemp = document.querySelector("#current-temperature");
  cityTemp.innerHTML = temp;

  //city name
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${newWeather.data.name}`;

  //weather description
  let weatherDescription = newWeather.data.weather[0].description;
  let description = document.querySelector("#current-description");
  description.innerHTML = weatherDescription;  
  
  //wind speed
  let cityWindSpeed = Math.round((newWeather.data.wind.speed) * 3.6);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = cityWindSpeed;

  //humidity
  let cityHumidity = newWeather.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = cityHumidity;

  //friend image
  //let mainWeatherDescription = newWeather.data.weather[0].main;
  //OR
  //let mainWeatherDescription = newWeather.data.weather[0].icon;

}


function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#change-city-text");
  let searchCity = cityInput.value;
  let units = `metric`;  
  let apiKey = `0b3b5277b18a1568b6ccacadee647a9b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let searchCityForm = document.querySelector("#city-search-form");
searchCityForm.addEventListener("submit", searchCity);


//Default City - Vancouver

function displayDefaultCity(city) {
  let units = `metric`;
  let apiKey = `0b3b5277b18a1568b6ccacadee647a9b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

displayDefaultCity(`Vancouver`);


//Current Location Button
//display current location and weather using navigator
//links to Search Engine functions

function getLocation(result) {
  let latitude = result.coords.latitude;
  let longitude = result.coords.longitude;
  let units = `metric`;
  let apiKey = `0b3b5277b18a1568b6ccacadee647a9b`;
  let apiUrlLatLon = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
  axios.get(apiUrlLatLon).then(displayWeather);
}

function accessNavigator() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", accessNavigator);


//Display the current date and time

function displayCurrentDay() {
  let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let currentDay = currentTimeAndDate.getDay();
  let displayDay = document.querySelector("#current-day");
  displayDay.innerHTML = `${weekDays[currentDay]}`;
}

function displayCurrentTime() {
  let currentHours = currentTimeAndDate.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = currentTimeAndDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let displayTime = document.querySelector("#current-time");
  displayTime.innerHTML = `${currentHours}:${currentMinutes}`;
}

let currentTimeAndDate = new Date();
displayCurrentDay();
displayCurrentTime();


//Convert temperature: Celsius and Fahrenheit

function displayCelcius (event) {
  let currentTemp = document.querySelector("#current-temperature");
  
  let celciusTemp = (Number(currentTemp.innerHTML) - 32) * 5 / 9;
  celciusTemp = Math.round(celciusTemp);
  currentTemp.innerHTML = `${celciusTemp}`;

  let scaleCelcius = document.querySelector("#celcius");
  scaleCelcius.classList.remove("unselected-scale");
  scaleCelcius.classList.add("selected-scale");

  let scaleFahrenheit = document.querySelector("#fahrenheit");
  scaleFahrenheit.classList.add("unselected-scale");
  scaleFahrenheit.classList.remove("selected-scale");
}

function displayFahrenheit (event) {
  let currentTemp = document.querySelector("#current-temperature");
  let fahrenheitTemp = (Number(currentTemp.innerHTML) * 9 / 5) + 32;
  fahrenheitTemp = Math.round(fahrenheitTemp);
  currentTemp.innerHTML = `${fahrenheitTemp}`;

  let scaleFahrenheit = document.querySelector("#fahrenheit");
  scaleFahrenheit.classList.add("selected-scale");
  scaleFahrenheit.classList.remove("unselected-scale");

  let scaleCelcius = document.querySelector("#celcius");
  scaleCelcius.classList.remove("selected-scale");
  scaleCelcius.classList.add("unselected-scale");
}

let scaleCelcius = document.querySelector("#celcius");
let scaleFahrenheit = document.querySelector("#fahrenheit");

scaleCelcius.addEventListener("click", displayCelcius);
scaleFahrenheit.addEventListener("click", displayFahrenheit);