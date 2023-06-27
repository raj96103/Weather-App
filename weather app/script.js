const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const location_not_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather-body");

async function getWeather(latitude, longitude) {
  const api_key = "a0711a7922e7c8c4edd4412a9cc38c0a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      const weather = {
        temp: data.main.temp,
        desc: data.weather[0].description,
        humid: data.main.humidity,
        wind: data.wind.speed,
      };
      location_not_found.style.display = "none";
      weather_body.style.display = "flex";
      temperature.innerHTML = `${Math.round(weather.temp - 273.15)}°C`;
      description.innerHTML = `${weather.desc}`;

      humidity.innerHTML = `${weather.humid}%`;
      wind_speed.innerHTML = `${weather.wind}Km/H`;

      switch (weather.desc) {
        case "clear sky":
          weather_img.src = "/assets/clear.png";
          break;
        case "few clouds":
          weather_img.src = "/assets/cloud.png";
          break;
        case "scattered clouds":
          weather_img.src = "/assets/cloud.png";
          break;
        case "broken clouds":
          weather_img.src = "/assets/cloud.png";
          break;
        case "overcast clouds":
          weather_img.src = "/assets/cloud.png";
          break;
        case "light rain":
          weather_img.src = "/assets/rain.png";
          break;
        case "moderate rain":
          weather_img.src = "/assets/rain.png";
          break;
        case "heavy intensity rain":
          weather_img.src = "/assets/rain.png";
          break;
        case "thunderstorm":
          weather_img.src = "/assets/rain.png";
          break;
        case "snow":
          weather_img.src = "/assets/snow.png";
          break;
        case "light snow":
          weather_img.src = "/assets/snow.png";
          break;
        case "haze":
          weather_img.src = "/assets/snow.png";
          break;
        case "mist":
          weather_img.src = "/assets/mist.png";
          break;
      }
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

var map = L.map("map").setView([19.075983, 72.877655], 4);

// Add a tile layer to display the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// Add a marker when the user clicks on the map
var marker;
map.on("click", function (e) {
  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker(e.latlng).addTo(map);

  // Retrieve weather data based on the selected location
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;
  getWeather(lat, lng);
});
async function checkWeather(city) {
  const api_key = "a0711a7922e7c8c4edd4412a9cc38c0a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );
  console.log(weather_data);

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    return;
  }

  console.log("run");
  location_not_found.style.display = "none";
  weather_body.style.display = "flex";
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;

  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "/assets/cloud.png";
      break;
    case "Clear":
      weather_img.src = "/assets/clear.png";
      break;
    case "Rain":
      weather_img.src = "/assets/rain.png";
      break;
    case "Mist":
      weather_img.src = "/assets/mist.png";
      break;
    case "Snow":
      weather_img.src = "/assets/snow.png";
      break;
  }

  console.log(weather_data);
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
  inputBox.value = "";
});
