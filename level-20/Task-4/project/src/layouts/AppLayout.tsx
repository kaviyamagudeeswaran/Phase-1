import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import WeatherForecast from '../components/WeatherForecast';
import HistoricalWeather from '../components/HistoricalWeather';
import FavoriteLocations from '../components/FavoriteLocations';
import { useWeather } from '../contexts/WeatherContext';
import { Sun, CloudRain, Loader } from 'lucide-react';
import '../styles/AppLayout.css';

const AppLayout: React.FC = () => {
  const { currentWeather, loading, error } = useWeather();
  const [activeTab, setActiveTab] = useState<'forecast' | 'historical'>('forecast');

  // Function to determine the weather background class
  const getWeatherBackgroundClass = () => {
    if (!currentWeather) return 'bg-default';
    
    const { weather_code } = currentWeather.current;
    
    // Clear
    if (weather_code < 300) return 'bg-clear';
    // Rain, thunderstorm
    if (weather_code < 600) return 'bg-rain';
    // Snow
    if (weather_code < 700) return 'bg-snow';
    // Fog, mist
    if (weather_code < 800) return 'bg-fog';
    // Cloudy
    if (weather_code === 800) return 'bg-clear';
    // Partly cloudy
    return 'bg-cloudy';
  };

  return (
    <div className={`app-container ${getWeatherBackgroundClass()}`}>
      <Header />
      <main className="main-content container">
        <div className="search-bar-container">
          <SearchBar />
        </div>
        
        {loading ? (
          <div className="loading-container">
            <Loader className="animate-spin" size={48} />
            <p>Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        ) : (
          <>
            {currentWeather && (
              <CurrentWeather weather={currentWeather} />
            )}
            
            <div className="weather-tabs">
              <button 
                className={`tab-button ${activeTab === 'forecast' ? 'active' : ''}`}
                onClick={() => setActiveTab('forecast')}
              >
                <Sun size={20} />
                <span>7-Day Forecast</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'historical' ? 'active' : ''}`}
                onClick={() => setActiveTab('historical')}
              >
                <CloudRain size={20} />
                <span>Historical Data</span>
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'forecast' ? (
                <WeatherForecast />
              ) : (
                <HistoricalWeather />
              )}
            </div>
            
            <FavoriteLocations />
          </>
        )}
      </main>
    </div>
  );
};

export default AppLayout;