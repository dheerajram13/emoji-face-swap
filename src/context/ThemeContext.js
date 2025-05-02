import React, { createContext, useContext, useState } from 'react';
import { themes, defaultTheme, themeTypes } from '../assets/styles/themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const switchTheme = (themeType) => {
    const selectedTheme = themes[themeType];
    if (selectedTheme) {
      setTheme(selectedTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
