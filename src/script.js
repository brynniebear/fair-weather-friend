//Day/Time

function formatDay(time) {
  let date = new Date(time);
  let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = weekDays[date.getDay()];
  return `${day}`;
}

function formatTime(time) {
  let date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
    if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//Hourly Forecast

function displayHourlyForecast(results) {
  console.log(results);
  let hourlyForecast = document.querySelector("#hourly-forecast");
  hourlyForecast.innerHTML = null;

  let forecast = null;
  let maxTemp = null;
  let minTemp = null;
  let iconCode = null;
  let weatherIcon = null;
  let weatherDescription = null;

  for (let index = 1; index < 13; index++) {
    forecast = results.data.hourly[index];

    temp = Math.round(forecast.temp);
    iconCode = forecast.weather[0].icon;
    weatherIcon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherDescription = forecast.weather[0].main;

    hourlyForecast.innerHTML +=
    `<div class="col-2 hourly temperature">
      <img src="${weatherIcon}" alt="${weatherDescription}" class="hourly weather-image">
      <div class="hourly temperature">
      <span id="hourly-temp-${index}">${temp}</span>°
      </div>
      <div class=" hourly main-description">
      ${weatherDescription}
      </div>
      <div class="hourly time">
        ${formatTime(forecast.dt * 1000)}
      </div>
    </div>`
    
  }

}

//Daily Forecast

function displayDailyForecast (results) {
  let  dailyForecast = document.querySelector("#daily-forecast");
  dailyForecast.innerHTML = null;

  let forecast = null;
  let maxTemp = null;
  let minTemp = null;
  let iconCode = null;
  let weatherIcon = null;
  let weatherDescription = null;

  for (let index = 1; index < 6; index++) {
    forecast = results.data.daily[index];

    maxTemp = Math.round(forecast.temp.max);
    minTemp = Math.round(forecast.temp.min);
    iconCode = forecast.weather[0].icon;
    weatherIcon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherDescription = forecast.weather[0].main;

    dailyForecast.innerHTML += 
    `<div class="col-sm daily temperature">
      <img src="${weatherIcon}" alt="${weatherDescription}" class="daily weather-image" />
      <div class="daily temperature">
      <span class="daily max-temp" id="daily-max-temp-${index}">${maxTemp}</span>°/<span class="daily min-temp" id="daily-min-temp-${index}">${minTemp}</span>°
      </div>
      <div class=" daily main-description">
      ${weatherDescription}
      </div>
      <div class="daily week-day">
      ${formatDay(forecast.dt * 1000)}
      </div>
    </div>`;
  }
}

//Custom Weather Image

function displayImage(weatherIcon) {
  let currentWeatherImage = document.querySelector("#current-weather-image");
  currentWeatherImage.removeAttribute("src");
  currentWeatherImage.removeAttribute("alt");
  let imageDescription = document.querySelector("#image-description");
  let imageCode = weatherIcon;
  if (imageCode === `01d` || imageCode === `01n`) {
    currentWeatherImage.setAttribute("src", "images/you-are-a-ray-of-sunshine.png");
    currentWeatherImage.setAttribute("alt","A sun made of stick-people");
    imageDescription.innerHTML = `I'm a ray of sunshine!`;
  }
  if (imageCode === `02d` || imageCode === `02n`) {
    currentWeatherImage.setAttribute("src", "images/a-moment-in-the-sun.png");
    currentWeatherImage.setAttribute("alt","A stick-person posing for a photo");
    imageDescription.innerHTML = `I'll have my moment in the sun!`;
  }
  if (imageCode === `03d` || imageCode === `03n`|| imageCode === `04d` || imageCode === `04n`) {
    currentWeatherImage.setAttribute("src", "images/head-in-the-clouds.png");
    currentWeatherImage.setAttribute("alt","A stick-person with its head in clouds");
    imageDescription.innerHTML = `I've got my head in the clouds.`;
  }
  if (imageCode === `09d` || imageCode === `09n`|| imageCode === `10d` || imageCode === `10n`) {
    currentWeatherImage.setAttribute("src", "images/singing-in-the-rain.png");
    currentWeatherImage.setAttribute("alt","A stick-person holding an umbrella with music notes falling");
    imageDescription.innerHTML = `I'm singing in the rain, just singing...`;
  }
  if (imageCode === `13d` || imageCode === `13n`) {
    currentWeatherImage.setAttribute("src", "images/a-blanket-of-snow.png");
    currentWeatherImage.setAttribute("alt","A stick-person with a blanket covered in snowflakes");
    imageDescription.innerHTML = `I'm covered in a blanket of snow.`;
  }
  if (imageCode === `11d` || imageCode === `11n`|| imageCode === `50d` || imageCode === `50n`) {
    currentWeatherImage.setAttribute("src", "images/fair-weather-friend.png");
    currentWeatherImage.setAttribute("alt","A smiling stick-person");
    imageDescription.innerHTML = `Hello! I'm your fair weather friend!`;
  }
}

//Current Weather Details

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

  //date and time
  let displayDay = document.querySelector("#current-day");
  displayDay.innerHTML = formatDay(newWeather.data.dt * 1000);
  let displayTime = document.querySelector("#current-time");
  displayTime.innerHTML = formatTime(newWeather.data.dt * 1000);
  
  //max and min temperatures
  let max = Math.round(newWeather.data.main.temp_max);
  let min = Math.round(newWeather.data.main.temp_min);
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  maxTemp.innerHTML = `${max}`;
  minTemp.innerHTML = `${min}`;

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
  //openweather icon url: http://openweathermap.org/img/wn/10d@2x.png
  let weatherIcon = newWeather.data.weather[0].icon;
  if (newWeather.data.name !== `Vancouver`) {
    displayImage(weatherIcon);
  } else {
    let currentWeatherImage = document.querySelector("#current-weather-image");
    currentWeatherImage.removeAttribute("src");
    currentWeatherImage.removeAttribute("alt");
    let imageDescription = document.querySelector("#image-description");
    currentWeatherImage.setAttribute("src", "images/fair-weather-friend.png");
    currentWeatherImage.setAttribute("alt","A smiling stick-person");
    imageDescription.innerHTML = `Hello! I'm your fair weather friend!`;
  }

  //return units button to celsius
    let units = document.querySelector("#units");
    units.innerHTML = '°F';
    let tempUnits = document.querySelector("#selected-units");
    tempUnits.innerHTML = '°C';

  //call display forecast function (Daily)
  let lat = newWeather.data.coord.lat;
  let lon = newWeather.data.coord.lon;
  let apiKey = `0b3b5277b18a1568b6ccacadee647a9b`;
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(forecastUrl).then(displayDailyForecast);
  axios.get(forecastUrl).then(displayHourlyForecast);
}

//City Search Engine using OpenWeather API

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#change-city-text");
  let searchCity = cityInput.value;
  let units = `metric`;  
  let apiKey = `0b3b5277b18a1568b6ccacadee647a9b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

//Default City: Vancouver

function displayDefaultCity(city) {
  let units = `metric`;
  let apiKey = `0b3b5277b18a1568b6ccacadee647a9b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

//Current Location Button: display current location and weather using navigator

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

//Convert Units Button: Celsius and Fahrenheit

function changeUnits() {
  let unitsButton = document.querySelector("#units");
  let currentTemp = document.querySelector("#current-temperature");
  let tempUnits = document.querySelector("#selected-units");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");

  if (unitsButton.innerHTML === `°F`) {
    //current temperature
    let fahrenheitTemp = (Number(currentTemp.innerHTML) * 9 / 5) + 32;
    fahrenheitTemp = Math.round(fahrenheitTemp);
    currentTemp.innerHTML = `${fahrenheitTemp}`;
    maxTemp.innerHTML = `${Math.round(maxTemp.innerHTML * 9 / 5 + 32)}`;
    minTemp.innerHTML = `${Math.round(minTemp.innerHTML * 9 / 5 + 32)}`;

    //hourly forecast
    document.querySelector("#hourly-temp-1").innerHTML = `${Math.round(document.querySelector("#hourly-temp-1").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#hourly-temp-2").innerHTML = `${Math.round(document.querySelector("#hourly-temp-2").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#hourly-temp-3").innerHTML = `${Math.round(document.querySelector("#hourly-temp-3").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#hourly-temp-4").innerHTML = `${Math.round(document.querySelector("#hourly-temp-4").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#hourly-temp-5").innerHTML = `${Math.round(document.querySelector("#hourly-temp-5").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#hourly-temp-6").innerHTML = `${Math.round(document.querySelector("#hourly-temp-6").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#hourly-temp-7").innerHTML = `${Math.round(document.querySelector("#hourly-temp-7").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#hourly-temp-8").innerHTML = `${Math.round(document.querySelector("#hourly-temp-8").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#hourly-temp-9").innerHTML = `${Math.round(document.querySelector("#hourly-temp-9").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#hourly-temp-10").innerHTML = `${Math.round(document.querySelector("#hourly-temp-10").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#hourly-temp-11").innerHTML = `${Math.round(document.querySelector("#hourly-temp-11").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#hourly-temp-12").innerHTML = `${Math.round(document.querySelector("#hourly-temp-12").innerHTML * 9 / 5 + 32 )}`;

    //daily forecast
    //max
    document.querySelector("#daily-max-temp-1").innerHTML = `${Math.round(document.querySelector("#daily-max-temp-1").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#daily-max-temp-2").innerHTML = `${Math.round(document.querySelector("#daily-max-temp-2").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#daily-max-temp-3").innerHTML = `${Math.round(document.querySelector("#daily-max-temp-3").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#daily-max-temp-4").innerHTML = `${Math.round(document.querySelector("#daily-max-temp-4").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#daily-max-temp-5").innerHTML = `${Math.round(document.querySelector("#daily-max-temp-5").innerHTML * 9 / 5 + 32 )}`;
    //min
    document.querySelector("#daily-min-temp-1").innerHTML = `${Math.round(document.querySelector("#daily-min-temp-1").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#daily-min-temp-2").innerHTML = `${Math.round(document.querySelector("#daily-min-temp-2").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#daily-min-temp-3").innerHTML = `${Math.round(document.querySelector("#daily-min-temp-3").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#daily-min-temp-4").innerHTML = `${Math.round(document.querySelector("#daily-min-temp-4").innerHTML * 9 / 5 + 32 )}`;
    document.querySelector("#daily-min-temp-5").innerHTML = `${Math.round(document.querySelector("#daily-min-temp-5").innerHTML * 9 / 5 + 32 )}`;

    //units button
    unitsButton.innerHTML = `°C`;
    tempUnits.innerHTML = `°F`;

  } else {
    //current temperature
    let celciusTemp = (Number(currentTemp.innerHTML) - 32) * 5 / 9;
    celciusTemp = Math.round(celciusTemp);
    currentTemp.innerHTML = `${celciusTemp}`;
    maxTemp.innerHTML = `${Math.round((maxTemp.innerHTML - 32)* 5 / 9)}`;
    minTemp.innerHTML = `${Math.round((minTemp.innerHTML - 32)* 5 / 9)}`;

    //hourly forecast
    document.querySelector("#hourly-temp-1").innerHTML = `${Math.round((document.querySelector("#hourly-temp-1").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#hourly-temp-2").innerHTML = `${Math.round((document.querySelector("#hourly-temp-2").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#hourly-temp-3").innerHTML = `${Math.round((document.querySelector("#hourly-temp-3").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#hourly-temp-4").innerHTML = `${Math.round((document.querySelector("#hourly-temp-4").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#hourly-temp-5").innerHTML = `${Math.round((document.querySelector("#hourly-temp-5").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#hourly-temp-6").innerHTML = `${Math.round((document.querySelector("#hourly-temp-6").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#hourly-temp-7").innerHTML = `${Math.round((document.querySelector("#hourly-temp-7").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#hourly-temp-8").innerHTML = `${Math.round((document.querySelector("#hourly-temp-8").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#hourly-temp-9").innerHTML = `${Math.round((document.querySelector("#hourly-temp-9").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#hourly-temp-10").innerHTML = `${Math.round((document.querySelector("#hourly-temp-10").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#hourly-temp-11").innerHTML = `${Math.round((document.querySelector("#hourly-temp-11").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#hourly-temp-12").innerHTML = `${Math.round((document.querySelector("#hourly-temp-12").innerHTML - 32)* 5 / 9 )}`;

    //daily forecast
    //max
    document.querySelector("#daily-max-temp-1").innerHTML = `${Math.round((document.querySelector("#daily-max-temp-1").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#daily-max-temp-2").innerHTML = `${Math.round((document.querySelector("#daily-max-temp-2").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#daily-max-temp-3").innerHTML = `${Math.round((document.querySelector("#daily-max-temp-3").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#daily-max-temp-4").innerHTML = `${Math.round((document.querySelector("#daily-max-temp-4").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#daily-max-temp-5").innerHTML = `${Math.round((document.querySelector("#daily-max-temp-5").innerHTML - 32)* 5 / 9 )}`;
    //min
    document.querySelector("#daily-min-temp-1").innerHTML = `${Math.round((document.querySelector("#daily-min-temp-1").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#daily-min-temp-2").innerHTML = `${Math.round((document.querySelector("#daily-min-temp-2").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#daily-min-temp-3").innerHTML = `${Math.round((document.querySelector("#daily-min-temp-3").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#daily-min-temp-4").innerHTML = `${Math.round((document.querySelector("#daily-min-temp-4").innerHTML - 32)* 5 / 9 )}`;
    document.querySelector("#daily-min-temp-5").innerHTML = `${Math.round((document.querySelector("#daily-min-temp-5").innerHTML - 32)* 5 / 9 )}`;

    //units button
    unitsButton.innerHTML = `°F`;
    tempUnits.innerHTML = `°C`;
  }

}

displayDefaultCity(`Vancouver`);

let searchCityForm = document.querySelector("#city-search-form");
searchCityForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", accessNavigator);

let unitButton = document.querySelector("#unit-button");
unitButton.addEventListener("click", changeUnits);
