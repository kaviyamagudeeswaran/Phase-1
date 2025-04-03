const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const ONECALL_URL = "https://api.openweathermap.org/data/3.0/onecall";

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("Failed to fetch weather data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

export const fetchForecastData = async (lat, lon) => {
  try {
    const response = await fetch(
      `${ONECALL_URL}?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("Failed to fetch forecast data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return null;
  }
};
