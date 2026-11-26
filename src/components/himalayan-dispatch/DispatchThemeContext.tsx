'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type DispatchReadingTheme = 'ivory' | 'ink';

interface DispatchThemeContextValue {
  theme: DispatchReadingTheme;
  toggleTheme: () => void;
  setTheme: (mode: DispatchReadingTheme) => void;
}

const DispatchThemeContext = createContext<DispatchThemeContextValue>({
  theme: 'ivory',
  toggleTheme: () => {},
  setTheme: () => {},
});

const STORAGE_KEY = 'hd_editorial_reading_mode';

export function DispatchThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<DispatchReadingTheme>('ivory');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ink' || saved === 'ivory') {
        setThemeState(saved);
      }
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  const setTheme = (mode: DispatchReadingTheme) => {
    setThemeState(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'ivory' ? 'ink' : 'ivory');
  };

  return (
    <DispatchThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div
        data-himalayan-dispatch="true"
        data-hd-theme={theme}
        className="hd-editorial-root selection:bg-[#8C3125] selection:text-[#F2EFE7]"
      >
        {children}
      </div>
    </DispatchThemeContext.Provider>
  );
}

export function useDispatchTheme() {
  return useContext(DispatchThemeContext);
}
