import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'sonicvault-theme';
const THEME_COLOR: Record<Theme, string> = { light: '#f8f8f8', dark: '#14161f' };
export type Theme = 'light' | 'dark';

/** Startwert: vom Inline-Skript in index.html gesetzt (gespeichert, sonst System), damit es keinen Blitz gibt. */
function initialTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* noop */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Verwaltet Light/Dark über ein data-theme-Attribut am <html>-Element; gespeichert wird erst nach einer bewussten Wahl. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById('theme-color-meta')?.setAttribute('content', THEME_COLOR[theme]);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(t => {
      const next: Theme = t === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* noop */ }
      return next;
    });
  }, []);

  return { theme, toggle };
}
