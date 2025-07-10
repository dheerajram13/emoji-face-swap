import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { tokens } from '../design/tokens';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme || 'light');
  const [isDark, setIsDark] = useState(theme === 'dark');

  // Update theme when system theme changes
  useEffect(() => {
    setTheme(colorScheme || 'light');
  }, [colorScheme]);

  // Update isDark when theme changes
  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Get theme colors based on current theme
  const getThemeColors = () => {
    return {
      ...tokens.colors,
      background: isDark ? tokens.colors.darkBackground : tokens.colors.white,
      card: isDark ? tokens.colors.darkCard : tokens.colors.white,
      text: isDark ? tokens.colors.lightText : tokens.colors.text,
      border: isDark ? tokens.colors.darkBorder : tokens.colors.border,
      notification: isDark ? tokens.colors.darkNotification : tokens.colors.notification,
    };
  };

  const colors = getThemeColors();

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, colors }}>
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
