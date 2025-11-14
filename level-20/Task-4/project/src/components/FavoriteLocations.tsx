import React, { useState } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { Heart, Trash2, MapPin } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import '../styles/FavoriteLocations.css';

interface FavoriteLocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  temperature: number;
  weather_code: number;
}

const FavoriteLocations: React.FC = () => {
  const { 
    favorites, 
    addFavorite, 
    removeFavorite, 
    fetchWeatherByCoords, 
    currentWeather, 
    tempUnit 
  } = useWeather();
  
  const [isAdding, setIsAdding] = useState(false);

  // Format temperature
  const formatTemp = (temp: number) => {
    return tempUnit === 'C' ? temp : Math.round((temp * 9/5) + 32);
  };

  // Add current location to favorites
  const handleAddCurrentLocation = () => {
    if (!currentWeather) return;
    
    const { location, current } = currentWeather;
    const newFavorite: FavoriteLocation = {
      id: `${location.lat}-${location.lon}`,
      name: location.name,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      temperature: current.temperature,
      weather_code: current.weather_code
    };
    
    setIsAdding(true);
    
    // Simulating API call
    setTimeout(() => {
      addFavorite(newFavorite);
      setIsAdding(false);
    }, 500);
  };

  // Remove from favorites
  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
  };

  // Select favorite location
  const handleSelectLocation = (favorite: FavoriteLocation) => {
    fetchWeatherByCoords(favorite.lat, favorite.lon);
  };

  return (
    <div className="favorite-locations">
      <div className="favorite-header">
        <h3 className="section-title">
          <Heart size={20} className="section-icon" />
          Favorite Locations
        </h3>
        
        {currentWeather && (
          <button 
            className="add-favorite-btn"
            onClick={handleAddCurrentLocation}
            disabled={isAdding || favorites.some(f => 
              f.lat === currentWeather.location.lat && 
              f.lon === currentWeather.location.lon
            )}
          >
            {isAdding ? 'Adding...' : 'Add Current'}
          </button>
        )}
      </div>
      
      {favorites.length === 0 ? (
        <div className="no-favorites-message">
          <Heart size={48} />
          <p>You haven't added any favorite locations yet</p>
        </div>
      ) : (
        <div className="favorites-list">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-item">
              <div 
                className="favorite-info"
                onClick={() => handleSelectLocation(favorite)}
              >
                <div className="favorite-location">
                  <MapPin size={16} />
                  <span>{favorite.name}, {favorite.country}</span>
                </div>
                
                <div className="favorite-weather">
                  <WeatherIcon code={favorite.weather_code} size={20} />
                  <span>{formatTemp(favorite.temperature)}°{tempUnit}</span>
                </div>
              </div>
              
              <button 
                className="remove-favorite-btn"
                onClick={() => handleRemoveFavorite(favorite.id)}
                aria-label={`Remove ${favorite.name} from favorites`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteLocations;