import { useCallback, useEffect, useRef, useState } from 'react';

const FADE_SECONDS = 12;

/** Sleep-Timer: blendet nach Ablauf alles aus und pausiert. `onFire` bekommt die Fade-Dauer. */
export function useSleepTimer(onFire: (fadeSeconds: number) => void) {
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const fireRef = useRef(onFire);
  fireRef.current = onFire;

  useEffect(() => {
    if (endsAt === null) return;
    const wait = Math.max(0, endsAt - Date.now() - FADE_SECONDS * 1000);
    const t = setTimeout(() => {
      fireRef.current(FADE_SECONDS);
      setEndsAt(null);
    }, wait);
    return () => clearTimeout(t);
  }, [endsAt]);

  const start = useCallback((minutes: number) => setEndsAt(Date.now() + minutes * 60_000), []);
  const cancel = useCallback(() => setEndsAt(null), []);

  return { endsAt, start, cancel };
}

export type SleepTimer = ReturnType<typeof useSleepTimer>;
