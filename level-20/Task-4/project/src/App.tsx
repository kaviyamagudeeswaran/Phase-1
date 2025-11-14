import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { WeatherProvider } from './contexts/WeatherContext';
import AppLayout from './layouts/AppLayout';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <AppLayout />
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;