import React from 'react';
import { useWeather } from '../contexts/WeatherContext';
import WeatherIcon from './WeatherIcon';
import { Calendar } from 'lucide-react';
import '../styles/WeatherForecast.css';

const WeatherForecast: React.FC = () => {
  const { forecast, tempUnit } = useWeather();

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format temperature
  const formatTemp = (temp: number) => {
    return tempUnit === 'C' ? temp : Math.round((temp * 9/5) + 32);
  };

  if (!forecast || forecast.length === 0) {
    return (
      <div className="no-data-message">
        <Calendar size={32} />
        <p>No forecast data available</p>
      </div>
    );
  }

  return (
    <div className="weather-forecast">
      <h3 className="section-title">7-Day Forecast</h3>
      
      <div className="forecast-list">
        {forecast.map((day: any, index: number) => (
          <div 
            key={index} 
            className={`forecast-day ${index === 0 ? 'today' : ''}`}
          >
            <div className="forecast-date">
              <span className="day-name">{index === 0 ? 'Today' : formatDate(day.date)}</span>
            </div>
            
            <div className="forecast-icon">
              <WeatherIcon code={day.weather_code} size={32} />
            </div>
            
            <div className="forecast-temps">
              <span className="max-temp">{formatTemp(day.max_temp)}°</span>
              <span className="min-temp">{formatTemp(day.min_temp)}°</span>
            </div>
            
            <div className="forecast-conditions">
              <div className="condition-item">
                <span>Humidity</span>
                <span className="value">{day.humidity}%</span>
              </div>
              <div className="condition-item">
                <span>Wind</span>
                <span className="value">{day.wind_speed} km/h</span>
              </div>
              <div className="condition-item">
                <span>Precip</span>
                <span className="value">{day.precipitation}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;