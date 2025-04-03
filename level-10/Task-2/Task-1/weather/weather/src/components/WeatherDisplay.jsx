import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const WeatherDisplay = ({ weather }) => {
  if (!weather)
    return (
      <h3 className="text-center text-danger">No weather data available</h3>
    );

  const weatherType = weather.weather[0].main.toLowerCase();

  // Small weather analysis based on weather type
  const getWeatherAnalysis = () => {
    if (weatherType.includes("rain"))
      return "Rainy conditions. Make sure to carry an umbrella!";
    if (weatherType.includes("clear"))
      return "Clear and sunny. Perfect day to be outdoors!";
    if (weatherType.includes("cloud")) return "Cloudy skies. Might rain later.";
    if (weatherType.includes("snow")) return "Snowy day. Dress warmly!";
    return "Weather is changing. Stay prepared!";
  };

  return (
    <div className="container text-center mt-4">
      <h2 className="text-primary">{weather.name}</h2>
      <h4 className="text-secondary">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </h4>

      {/* Weather Card Box */}
      <div className="card mx-auto my-3" style={{ width: "18rem" }}>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          className="card-img-top"
          alt={weather.weather[0].description}
        />
        <div className="card-body">
          <h5 className="card-title">{weather.main.temp}°C</h5>
          <p className="card-text">
            {weather.weather[0].description.toUpperCase()}
          </p>
          <p className="card-text">{getWeatherAnalysis()}</p>
        </div>
      </div>

      {/* Additional Weather Details */}
      <div className="row justify-content-center">
        <div className="col-md-3 p-3 bg-light border">
          <h6>Humidity</h6>
          <p>{weather.main.humidity}%</p>
        </div>
        <div className="col-md-3 p-3 bg-light border">
          <h6>Wind Speed</h6>
          <p>{weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
