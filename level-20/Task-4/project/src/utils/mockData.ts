// Mock current weather data
export const mockCurrentWeather = {
  location: {
    name: 'Dindigul',
    country: 'USA',
    lat: 40.7128,
    lon: -74.0060
  },
  current: {
    temperature: 24,
    feels_like: 26,
    humidity: 65,
    pressure: 1012,
    wind_speed: 12,
    wind_direction: 'NE',
    weather_code: 800,
    observed_time: '2025-05-15T14:30:00Z',
    sunrise: 1621055400, // Unix timestamp
    sunset: 1621108200    // Unix timestamp
  }
};

// Mock forecast data (7 days)
export const mockForecast = [
  {
    date: '2025-05-15',
    min_temp: 19,
    max_temp: 26,
    avg_temp: 22.5,
    humidity: 65,
    wind_speed: 12,
    wind_direction: 'NE',
    precipitation: 0,
    weather_code: 800
  },
  {
    date: '2025-05-16',
    min_temp: 18,
    max_temp: 25,
    avg_temp: 21.5,
    humidity: 70,
    wind_speed: 10,
    wind_direction: 'E',
    precipitation: 10,
    weather_code: 801
  },
  {
    date: '2025-05-17',
    min_temp: 17,
    max_temp: 23,
    avg_temp: 20,
    humidity: 75,
    wind_speed: 15,
    wind_direction: 'SE',
    precipitation: 30,
    weather_code: 500
  },
  {
    date: '2025-05-18',
    min_temp: 16,
    max_temp: 22,
    avg_temp: 19,
    humidity: 80,
    wind_speed: 20,
    wind_direction: 'S',
    precipitation: 60,
    weather_code: 501
  },
  {
    date: '2025-05-19',
    min_temp: 15,
    max_temp: 21,
    avg_temp: 18,
    humidity: 78,
    wind_speed: 18,
    wind_direction: 'SW',
    precipitation: 40,
    weather_code: 502
  },
  {
    date: '2025-05-20',
    min_temp: 16,
    max_temp: 23,
    avg_temp: 19.5,
    humidity: 70,
    wind_speed: 12,
    wind_direction: 'W',
    precipitation: 20,
    weather_code: 300
  },
  {
    date: '2025-05-21',
    min_temp: 17,
    max_temp: 24,
    avg_temp: 20.5,
    humidity: 65,
    wind_speed: 10,
    wind_direction: 'NW',
    precipitation: 5,
    weather_code: 801
  }
];

// Mock historical data (past 7 days)
export const mockHistorical = [
  {
    date: '2025-05-08',
    min_temp: 16,
    max_temp: 23,
    avg_temp: 19.5,
    humidity: 68,
    wind_speed: 14,
    precipitation: 0,
    weather_code: 800
  },
  {
    date: '2025-05-09',
    min_temp: 15,
    max_temp: 21,
    avg_temp: 18,
    humidity: 70,
    wind_speed: 16,
    precipitation: 15,
    weather_code: 801
  },
  {
    date: '2025-05-10',
    min_temp: 14,
    max_temp: 19,
    avg_temp: 16.5,
    humidity: 75,
    wind_speed: 18,
    precipitation: 40,
    weather_code: 500
  },
  {
    date: '2025-05-11',
    min_temp: 13,
    max_temp: 18,
    avg_temp: 15.5,
    humidity: 80,
    wind_speed: 22,
    precipitation: 60,
    weather_code: 501
  },
  {
    date: '2025-05-12',
    min_temp: 12,
    max_temp: 17,
    avg_temp: 14.5,
    humidity: 82,
    wind_speed: 20,
    precipitation: 70,
    weather_code: 502
  },
  {
    date: '2025-05-13',
    min_temp: 14,
    max_temp: 20,
    avg_temp: 17,
    humidity: 75,
    wind_speed: 15,
    precipitation: 30,
    weather_code: 300
  },
  {
    date: '2025-05-14',
    min_temp: 17,
    max_temp: 23,
    avg_temp: 20,
    humidity: 68,
    wind_speed: 12,
    precipitation: 10,
    weather_code: 801
  }
];