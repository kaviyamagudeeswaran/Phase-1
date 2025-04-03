import axios from "axios";
import { Weather } from "../models/weatherModel.js";

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: process.env.WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    const { temp, humidity } = response.data.main;
    const weather = response.data.weather[0].description;

    const weatherData = new Weather({
      location: city,
      temperature: temp,
      humidity,
      weather,
    });
    await weatherData.save();

    console.log(
      `Weather data logged for ${city}: ${temp}°C, ${humidity}%, ${weather}`
    );
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
};
