import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import '../styles/SearchBar.css';

interface LocationSuggestion {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

const SearchBar: React.FC = () => {
  const { fetchWeatherByLocation, fetchWeatherByCoords } = useWeather();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch location suggestions
  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, this would call the backend API
      // For now, we'll simulate suggestions
      const mockSuggestions: LocationSuggestion[] = [
        { id: '1', name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
        { id: '2', name: 'Los Angeles', country: 'USA', lat: 34.0522, lon: -118.2437 },
        { id: '3', name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
        { id: '4', name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
      ].filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
    setShowSuggestions(true);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    fetchWeatherByCoords(suggestion.lat, suggestion.lon);
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeatherByLocation(query);
      setShowSuggestions(false);
    }
  };

  // Get current location
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Clear search input
  const handleClearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for a city..."
            className="search-input"
          />
          {query && (
            <button 
              type="button" 
              onClick={handleClearSearch}
              className="clear-button"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <button 
          type="button" 
          onClick={handleGetCurrentLocation}
          className="location-button"
          aria-label="Use current location"
        >
          <MapPin size={20} />
        </button>
        
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="suggestion-name">{suggestion.name}</span>
              <span className="suggestion-country">{suggestion.country}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;