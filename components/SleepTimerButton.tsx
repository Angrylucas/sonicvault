import React, { useEffect, useRef, useState } from 'react';
import { MoonStar } from 'lucide-react';
import { SleepTimer } from '../hooks/useSleepTimer';

const OPTIONS = [15, 30, 60];

function useRemaining(endsAt: number | null) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (endsAt === null) return;
    setNow(Date.now());
    const iv = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(iv);
  }, [endsAt]);
  return endsAt === null ? null : Math.max(1, Math.ceil((endsAt - now) / 60_000));
}

/** Sleep-Timer-Knopf mit kleinem Auswahlmenü (15/30/60 Minuten). */
export const SleepTimerButton: React.FC<{ timer: SleepTimer }> = ({ timer }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const minutes = useRemaining(timer.endsAt);
  const active = minutes !== null;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={active ? `Sleep timer: ${minutes} minutes left` : 'Sleep timer'}
        className="min-h-[44px] min-w-[44px] px-2.5 flex items-center justify-center gap-1.5 rounded-full text-xs font-bold transition-colors"
        style={active ? { background: 'var(--accent-soft)', color: 'var(--accent)' } : { color: 'var(--text-muted)' }}
      >
        <MoonStar className="w-5 h-5" aria-hidden="true" />
        {active && <span className="tabular-nums">{minutes}m</span>}
      </button>

      {open && (
        <div
          role="group"
          aria-label="Sleep timer"
          className="absolute right-0 bottom-full mb-2 z-50 rounded-2xl p-2 flex flex-col gap-1 min-w-[150px] fade-up"
          style={{ background: 'var(--surface)', boxShadow: '0 14px 30px var(--shadow)' }}
        >
          <p className="px-3 pt-1.5 pb-1 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Fade out and stop in</p>
          {OPTIONS.map(m => (
            <button
              key={m}
              onClick={() => { timer.start(m); setOpen(false); }}
              className="min-h-[44px] px-3 rounded-xl text-sm font-bold text-left transition-colors"
              style={{ background: 'var(--surface-2)', color: 'var(--text)' }}
            >
              {m} minutes
            </button>
          ))}
          {active && (
            <button
              onClick={() => { timer.cancel(); setOpen(false); }}
              className="min-h-[44px] px-3 rounded-xl text-sm font-bold text-left"
              style={{ color: 'var(--danger)' }}
            >
              Turn off
            </button>
          )}
        </div>
      )}
    </div>
  );
};
