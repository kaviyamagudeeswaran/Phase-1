import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchBar = ({ setSelectedCity }) => {
  const [city, setCity] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("⚠️ Please enter a valid city name!");
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setSelectedCity(response.data);
    } catch (error) {
      console.error(
        "Error fetching weather:",
        error.response?.data || error.message
      );
      alert("❌ City not found! Please try again.");
    }
  };

  return (
    <div className="text-center my-3">
      <input
        type="text"
        className="form-control w-50 d-inline"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-primary ms-2" onClick={fetchWeather}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
