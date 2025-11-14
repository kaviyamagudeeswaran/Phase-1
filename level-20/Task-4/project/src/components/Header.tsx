import React from 'react';
import { Cloud, SunMoon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useWeather } from '../contexts/WeatherContext';
import '../styles/Header.css';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { tempUnit, toggleTempUnit } = useWeather();

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Cloud className="logo-icon" size={28} />
          <h1>WeatherDash</h1>
        </div>
        
        <div className="header-actions">
          <button 
            className="unit-toggle" 
            onClick={toggleTempUnit}
            aria-label={`Switch to ${tempUnit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
          >
            °{tempUnit}
          </button>
          
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <SunMoon size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;