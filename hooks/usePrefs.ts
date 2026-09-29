import { useCallback, useState } from 'react';

const FAV_KEY = 'sonicvault-favorites-v1';
const RECENT_KEY = 'sonicvault-recents-v1';
const MAX_RECENTS = 8;

function read(key: string): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter(x => typeof x === 'string') : [];
  } catch {
    return [];
  }
}
function write(key: string, value: string[]) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* noop */ }
}

/** Favoriten und zuletzt genutzte Sounds, nur lokal gespeichert. */
export function usePrefs() {
  const [favorites, setFavorites] = useState<string[]>(() => read(FAV_KEY));
  const [recents, setRecents] = useState<string[]>(() => read(RECENT_KEY));

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      write(FAV_KEY, next);
      return next;
    });
  }, []);

  const noteRecent = useCallback((id: string) => {
    setRecents(prev => {
      const next = [id, ...prev.filter(x => x !== id)].slice(0, MAX_RECENTS);
      write(RECENT_KEY, next);
      return next;
    });
  }, []);

  return { favorites, recents, toggleFavorite, noteRecent };
}

export type Prefs = ReturnType<typeof usePrefs>;
