import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">🌤️ Weather Dashboard</h1>
      <SearchBar setSelectedCity={setSelectedCity} />
      <WeatherDisplay weather={selectedCity} />
    </div>
  );
};

export default App;
