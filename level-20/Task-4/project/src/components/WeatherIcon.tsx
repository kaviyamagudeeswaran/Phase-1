import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudFog, 
  CloudLightning, 
  CloudDrizzle,
  CloudSun 
} from 'lucide-react';

interface WeatherIconProps {
  code: number;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, size = 24 }) => {
  // Map weather codes to icons
  const getIcon = () => {
    // Clear
    if (code < 300) {
      return <Sun size={size} className="weather-icon sun" />;
    }
    // Thunderstorm
    if (code < 400) {
      return <CloudLightning size={size} className="weather-icon lightning" />;
    }
    // Drizzle
    if (code < 500) {
      return <CloudDrizzle size={size} className="weather-icon drizzle" />;
    }
    // Rain
    if (code < 600) {
      return <CloudRain size={size} className="weather-icon rain" />;
    }
    // Snow
    if (code < 700) {
      return <CloudSnow size={size} className="weather-icon snow" />;
    }
    // Atmosphere (fog, mist, etc.)
    if (code < 800) {
      return <CloudFog size={size} className="weather-icon fog" />;
    }
    // Clear
    if (code === 800) {
      return <Sun size={size} className="weather-icon sun" />;
    }
    // Partly cloudy
    if (code === 801) {
      return <CloudSun size={size} className="weather-icon partly-cloudy" />;
    }
    // Cloudy
    return <Cloud size={size} className="weather-icon cloudy" />;
  };

  return (
    <div className="weather-icon-container">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;