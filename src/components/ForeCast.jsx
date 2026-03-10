import React from "react";
import "./Forecast.css";

function ForeCast({ data }) {

  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const wind = data.wind.speed;

  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const description = data.weather[0].description;

  const date = new Date(data.dt_txt);

  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (

    <div className="forecast-card">

      {/* top section */}
      <div className="forecast-top">
        <span className="forecast-day">{day}</span>
        <span className="forecast-time">{time}</span>
      </div>

      {/* weather icon */}
      <img src={icon} alt="weather icon" className="forecast-icon"/>

      {/* temperature */}
      <h3 className="forecast-temp">{temp}°C</h3>

      {/* weather description */}
      <p className="forecast-desc">{description}</p>

      {/* weather details */}
      <div className="forecast-details">
        <div>🌡 Feels {feels}°C</div>
        <div>💧 {humidity}%</div>
        <div>🌬 {wind} m/s</div>
      </div>

    </div>

  );
}

export default ForeCast;