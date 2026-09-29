import { useCallback, useEffect, useRef, useState } from 'react';

export interface Toast {
  id: number;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** Ein einzelner Toast mit Undo-Aktion; verschwindet nach ein paar Sekunden. */
export function useToast(duration = 6000) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setToast(null);
  }, []);

  const show = useCallback((message: string, actionLabel?: string, onAction?: () => void) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ id: Date.now(), message, actionLabel, onAction });
    timer.current = setTimeout(() => setToast(null), duration);
  }, [duration]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return { toast, show, dismiss };
}

export type ToastApi = ReturnType<typeof useToast>;
