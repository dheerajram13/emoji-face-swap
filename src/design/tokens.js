export const tokens = {
  colors: {
    primary: '#FFD60A',
    secondary: '#FF6B6B',
    background: '#FFF6E9',
    text: '#333333',
    accent: '#4A4AFF',
    white: '#FFFFFF',
    gray: '#DDD',
    grayLight: '#F8F9FA',
    danger: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    info: '#007AFF'
  },
  fonts: {
    displayXL: { 
      fontSize: 40, 
      fontWeight: '700', 
      lineHeight: 48, 
      fontFamily: 'System' 
    },
    heading: { 
      fontSize: 24, 
      fontWeight: '600', 
      lineHeight: 32, 
      fontFamily: 'System' 
    },
    subheading: { 
      fontSize: 18, 
      fontWeight: '500', 
      lineHeight: 26, 
      fontFamily: 'System' 
    },
    body: { 
      fontSize: 16, 
      fontWeight: '400', 
      lineHeight: 24, 
      fontFamily: 'System' 
    },
    caption: { 
      fontSize: 14, 
      fontWeight: '400', 
      lineHeight: 20, 
      fontFamily: 'System' 
    },
    button: { 
      fontSize: 18, 
      fontWeight: '600', 
      lineHeight: 24, 
      fontFamily: 'System' 
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  radius: {
    btn: 24,
    input: 16,
    card: 20,
    full: 9999
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 4,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.1,
      shadowRadius: 25,
      elevation: 5,
    },
    '2xl': {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 25 },
      shadowOpacity: 0.25,
      shadowRadius: 50,
      elevation: 6,
    },
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    }
  },
  zIndex: {
    hide: -1,
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  },
  transitions: {
    default: {
      property: 'all',
      duration: 200,
      easing: 'ease-in-out'
    },
    bounce: {
      property: 'all',
      duration: 200,
      easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
    }
  }
};

export default tokens;
