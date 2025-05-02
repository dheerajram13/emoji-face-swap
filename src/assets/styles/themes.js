export const themes = {
  JoyPop: {
    name: 'JoyPop',
    description: 'Playful & Youthful',
    colors: {
      primary: '#FFD60A',
      secondary: '#FF6B6B',
      background: '#FFF6E9',
      textPrimary: '#333333',
      textSecondary: '#666666',
      accent: '#4A4AFF',
      border: '#E6E6E6',
      shadow: '#0000001A',
    },
  },
  SoftTech: {
    name: 'SoftTech',
    description: 'Friendly & Calm',
    colors: {
      primary: '#6C63FF',
      secondary: '#FF8C94',
      background: '#F5F7FB',
      textPrimary: '#2D2D2D',
      textSecondary: '#666666',
      accent: '#00C1D4',
      border: '#E6E6E6',
      shadow: '#0000001A',
    },
  },
  SunriseGlow: {
    name: 'SunriseGlow',
    description: 'Warm & Modern',
    colors: {
      primary: '#FEC260',
      secondary: '#F76C6C',
      background: '#FFF8E7',
      textPrimary: '#2F2F2F',
      textSecondary: '#666666',
      accent: '#00BFA6',
      border: '#E6E6E6',
      shadow: '#0000001A',
    },
  },
  NeoDarkPop: {
    name: 'NeoDarkPop',
    description: 'Dark Mode Ready',
    colors: {
      primary: '#FFD60A',
      secondary: '#FF6B6B',
      background: '#1A1A2E',
      textPrimary: '#F1F1F1',
      textSecondary: '#999999',
      accent: '#00ADB5',
      border: '#333333',
      shadow: '#0000004D',
    },
  },
};

// Default theme
export const defaultTheme = themes.SoftTech;

// Theme types
export const themeTypes = {
  JOYPOP: 'JoyPop',
  SOFTTECH: 'SoftTech',
  SUNRISGLOW: 'SunriseGlow',
  NEODARKPOP: 'NeoDarkPop',
};
