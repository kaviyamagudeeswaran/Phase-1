import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCurrentWeather, mockForecast, mockHistorical } from '../utils/mockData';

interface Location {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  temperature: number;
  weather_code: number;
}

interface WeatherContextType {
  currentWeather: any;
  forecast: any[];
  historical: any[];
  favorites: Location[];
  loading: boolean;
  error: string | null;
  tempUnit: 'C' | 'F';
  fetchWeatherByLocation: (location: string) => void;
  fetchWeatherByCoords: (lat: number, lon: number) => void;
  addFavorite: (location: Location) => void;
  removeFavorite: (id: string) => void;
  toggleTempUnit: () => void;
}

const WeatherContext = createContext<WeatherContextType>({
  currentWeather: null,
  forecast: [],
  historical: [],
  favorites: [],
  loading: false,
  error: null,
  tempUnit: 'C',
  fetchWeatherByLocation: () => {},
  fetchWeatherByCoords: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  toggleTempUnit: () => {},
});

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [historical, setHistorical] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  
  // Load saved favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherDashFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (err) {
        console.error('Error loading favorites from localStorage:', err);
      }
    }
    
    // Load saved temperature unit preference
    const savedUnit = localStorage.getItem('weatherDashTempUnit');
    if (savedUnit === 'C' || savedUnit === 'F') {
      setTempUnit(savedUnit);
    }
  }, []);
  
  // Save favorites to localStorage when changed
  useEffect(() => {
    localStorage.setItem('weatherDashFavorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // Save temperature unit preference when changed
  useEffect(() => {
    localStorage.setItem('weatherDashTempUnit', tempUnit);
  }, [tempUnit]);
  
  // Fetch weather data by location name
  const fetchWeatherByLocation = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the backend API
      // For now, let's use mock data
      setTimeout(() => {
        setCurrentWeather(mockCurrentWeather);
        setForecast(mockForecast);
        setHistorical(mockHistorical);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  };
  
  // Fetch weather data by coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the backend API
      // For now, let's use mock data with a slight delay
      setTimeout(() => {
        setCurrentWeather(mockCurrentWeather);
        setForecast(mockForecast);
        setHistorical(mockHistorical);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  };
  
  // Add a location to favorites
  const addFavorite = (location: Location) => {
    // Check if already in favorites to avoid duplicates
    const exists = favorites.some(fav => fav.id === location.id);
    if (!exists) {
      setFavorites(prev => [...prev, location]);
    }
  };
  
  // Remove a location from favorites
  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };
  
  // Toggle temperature unit
  const toggleTempUnit = () => {
    setTempUnit(prev => prev === 'C' ? 'F' : 'C');
  };
  
  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        historical,
        favorites,
        loading,
        error,
        tempUnit,
        fetchWeatherByLocation,
        fetchWeatherByCoords,
        addFavorite,
        removeFavorite,
        toggleTempUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};