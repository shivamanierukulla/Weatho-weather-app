import React from "react";
import "./CurrentWeather.css";

function CurrentWeather({ data,city }) {

  if (!data) return null;

  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);

  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
   
      <div className="weather-left">
        <img src={icon} alt="weather icon" className="weather-icon" />
      </div>

      <div className="weather-right">
        <h1>{`Current Weather in ${city}`}</h1>
        <h1 className="temp">{temp}°C</h1>

        <p className="description">
          {data.weather[0].description}
        </p>

        <p className="location">
          {data.name}, {data.sys.country}
        </p>

        <div className="weather-details">
          <span>Humidity: {data.main.humidity}%</span>
          <span>Wind: {data.wind.speed} km/h</span>
          <span>Feels like: {feels}°C</span>
        </div>
      </div>

    </div>
  );
}

export default CurrentWeather;