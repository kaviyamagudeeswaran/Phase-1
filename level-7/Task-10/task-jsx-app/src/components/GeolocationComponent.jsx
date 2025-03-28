import React from "react";
import useGeolocation from "../hooks/useGeolocation";

const GeolocationComponent = () => {
  const { location, error } = useGeolocation();

  return (
    <div className="container">
      <h1>🌍 Your Location</h1>
      {error && <p className="error">{error}</p>}
      {location ? (
        <div>
          <h2>Latitude: {location.latitude}</h2>
          <h2>Longitude: {location.longitude}</h2>
        </div>
      ) : (
        <p className="loading">Fetching location...</p>
      )}
    </div>
  );
};

export default GeolocationComponent;
