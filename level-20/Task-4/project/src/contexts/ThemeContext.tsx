import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check for saved preference or use system preference
  const getInitialTheme = (): boolean => {
    const savedTheme = localStorage.getItem('weatherDashTheme');
    
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // Use system preference as fallback
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  
  const [isDark, setIsDark] = useState<boolean>(false);
  
  // Set initial theme after mount to avoid hydration mismatch
  useEffect(() => {
    setIsDark(getInitialTheme());
  }, []);
  
  // Update theme when it changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    
    // Save preference
    localStorage.setItem('weatherDashTheme', isDark ? 'dark' : 'light');
  }, [isDark]);
  
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};