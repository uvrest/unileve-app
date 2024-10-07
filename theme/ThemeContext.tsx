import React, { createContext, useContext, useState, useMemo } from 'react';
import { Colors } from '@/constants/Colors';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light'); // 'dark' or 'light'

  const theme = useMemo(() => ({
    colors: themeMode === 'light' ? Colors.light : Colors.dark,
    setThemeMode,
  }), [themeMode]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);