import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'sonicvault-theme';
export type Theme = 'light' | 'dark';

function loadTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* noop */ }
  return 'light';
}

/** Verwaltet Light/Dark-Theme über ein data-theme-Attribut am <html>-Element. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(loadTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* noop */ }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}
