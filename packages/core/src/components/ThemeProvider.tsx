import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { lightTheme, darkTheme, type Theme } from '../theme';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  theme?: Theme | 'light' | 'dark';
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = 'light',
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    typeof theme === 'string' ? (theme === 'dark' ? darkTheme : lightTheme) : theme
  );
  const [isDark, setIsDark] = useState(theme === 'dark');

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => {
      const newTheme = prev === lightTheme ? darkTheme : lightTheme;
      setIsDark(newTheme === darkTheme);
      return newTheme;
    });
  }, []);

  const setThemeHandler = useCallback((newTheme: Theme) => {
    setCurrentTheme(newTheme);
    setIsDark(newTheme === darkTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, setTheme: setThemeHandler, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
