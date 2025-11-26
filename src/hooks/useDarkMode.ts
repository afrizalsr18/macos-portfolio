import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const setLightMode = () => setTheme('light');
  const setDarkMode = () => setTheme('dark');
  const setSystemMode = () => setTheme('system');

  return {
    theme,
    setTheme,
    toggleDarkMode,
    setLightMode,
    setDarkMode,
    setSystemMode,
    isDark: theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
  };
}
