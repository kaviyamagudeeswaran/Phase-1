import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const errorHandler = (err) => {
      setError(err.message || "Unable to retrieve location.");
    };

    const watcher = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return { location, error };
};

export default useGeolocation;
