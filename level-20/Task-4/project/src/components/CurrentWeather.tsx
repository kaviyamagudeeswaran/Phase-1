import React from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { MapPin, Droplets, Wind, Thermometer, Sunrise, Sunset, CornerRightDown } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import '../styles/CurrentWeather.css';

interface CurrentWeatherProps {
  weather: any; // Replace with proper type
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  const { tempUnit } = useWeather();
  const { location, current } = weather;
  
  // Format temperature based on selected unit
  const formatTemp = (temp: number) => {
    return tempUnit === 'C' ? temp : Math.round((temp * 9/5) + 32);
  };
  
  // Format time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get weather description
  const getWeatherDescription = (code: number) => {
    // Simplified mapping - in a real app, this would be more comprehensive
    if (code < 300) return 'Clear Sky';
    if (code < 600) return 'Rainy';
    if (code < 700) return 'Snow';
    if (code < 800) return 'Atmosphere';
    if (code === 800) return 'Clear Sky';
    return 'Cloudy';
  };

  return (
    <div className="current-weather slide-up">
      <div className="current-weather-header">
        <div className="location-info">
          <div className="location-name">
            <MapPin size={20} />
            <h2>{location.name}, {location.country}</h2>
          </div>
          <p className="observation-time">Updated {new Date(current.observed_time).toLocaleString()}</p>
        </div>
        
        <div className="weather-condition">
          <WeatherIcon code={current.weather_code} size={64} />
          <span>{getWeatherDescription(current.weather_code)}</span>
        </div>
      </div>
      
      <div className="temperature-display">
        <div className="current-temp">
          <span className="temp-value">{formatTemp(current.temperature)}</span>
          <span className="temp-unit">°{tempUnit}</span>
        </div>
        
        <div className="feels-like">
          <Thermometer size={18} />
          <span>Feels like {formatTemp(current.feels_like)}°{tempUnit}</span>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <Droplets size={18} />
          <span>Humidity</span>
          <span className="detail-value">{current.humidity}%</span>
        </div>
        
        <div className="detail-item">
          <Wind size={18} />
          <span>Wind</span>
          <span className="detail-value">{current.wind_speed} km/h</span>
        </div>
        
        <div className="detail-item">
          <CornerRightDown size={18} />
          <span>Pressure</span>
          <span className="detail-value">{current.pressure} hPa</span>
        </div>
        
        <div className="detail-item">
          <Sunrise size={18} />
          <span>Sunrise</span>
          <span className="detail-value">{formatTime(current.sunrise)}</span>
        </div>
        
        <div className="detail-item">
          <Sunset size={18} />
          <span>Sunset</span>
          <span className="detail-value">{formatTime(current.sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;