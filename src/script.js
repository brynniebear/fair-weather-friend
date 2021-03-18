//Week 5 Additions
//Part 1: When a user searches for a city (example: New York), 
//it should display the name of the city on the result page and the current temperature of the city.

function changeTemp(newWeather) {
  let temp = newWeather.data.main.temp
  temp = Math.round(temp);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = temp;
}

function getNewCityTemp(result) {
  let city = result;
  let apiKey = ``;
  let units = `metric`
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeTemp);
}

function selectNewCity(event) {
  event.preventDefault();
  let newCityInput = document.querySelector(".change-city-text");
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${newCityInput.value}`;
  getNewCityTemp(newCityInput.value);
}

let searchCityForm = document.querySelector("#city-search-form");
searchCityForm.addEventListener("submit", selectNewCity);

//Part 2: Add a Current Location button. 
//When clicking on it, it uses the Geolocation API to get your GPS coordinates 
//and display and the city and current temperature using the OpenWeather API.
function getCityName(result) {
  let currentCityName = result.data.name;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${currentCityName}`;
  getNewCityTemp(currentCityName);
}

function getLocation(result) {
  let latitude = result.coords.latitude;
  let longitude = result.coords.longitude;
  let apiKey = ``;
  let apiUrlLatLon = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  axios.get(apiUrlLatLon).then(getCityName);
}

function accessNavigator() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", accessNavigator);


//Week 4 Additions
//Part 1: In your project, display the current date and time using JavaScript: Tuesday 16:00

function displayCurrentDay() {
  let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let currentDay = currentTimeAndDate.getDay();
  let displayDay = document.querySelector("#current-day");
  displayDay.innerHTML = `${weekDays[currentDay]}`;
}

function displayCurrentTime() {
  let currentHours = currentTimeAndDate.getHours();
  let currentMinutes = currentTimeAndDate.getMinutes();
  let displayTime = document.querySelector("#current-time");
  displayTime.innerHTML = `${currentHours}:${currentMinutes}`;
}

let currentTimeAndDate = new Date();
displayCurrentDay();
displayCurrentTime();

//Part 2: Add a search engine, when searching for a city (i.e. Paris), 
//display the city name on the page after the user submits the form.

//see Week 5:Part 1

//Part 3: Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. 
//When clicking on it, it should convert the temperature to Fahrenheit. 
//When clicking on Celsius, it should convert it back to Celsius.

function displayCelcius (event) {
  let currentTemp = document.querySelector("#current-temperature");
  
  let celciusTemp = (currentTemp.innerHTML - 32) * 5 / 9;
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
  let fahrenheitTemp = (currentTemp.innerHTML * 9 / 5) + 32;
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