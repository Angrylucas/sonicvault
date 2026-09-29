import React, { useState } from 'react';
import { Check, ChevronUp, Loader2, Music, Pause, Play, Save, Shuffle, Trash2, X } from 'lucide-react';
import { Mixer } from '../hooks/useMixer';
import { GuidedPlayerState } from '../hooks/useGuidedPlayer';
import { SleepTimer } from '../hooks/useSleepTimer';
import { ToastApi } from '../hooks/useToast';
import { GuidedPlayer } from './GuidedPlayer';
import { SleepTimerButton } from './SleepTimerButton';
import { ICON_MAP, SOUND_BY_ID } from './soundIcons';

const IconBtn = 'hit w-7 h-7 flex items-center justify-center rounded-full transition-colors';

interface Props {
  mixer: Mixer;
  player: GuidedPlayerState;
  timer: SleepTimer;
  toast: ToastApi;
}

/** Ausgeklapptes Mix-Blatt: Chips der aktiven Sounds, Speichern, Alle natürlich, Leeren (mit Undo). */
const MixSheet: React.FC<{ mixer: Mixer; toast: ToastApi; onClose: () => void }> = ({ mixer, toast, onClose }) => {
  const { sounds, toggle, toggleRandomness, setAllRandomness, setVolume, stopAll, saveSpace, applySounds } = mixer;
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const activeIds = Object.keys(sounds);
  const allNatural = activeIds.length > 0 && activeIds.every(id => sounds[id].randomness);

  const confirmSave = () => {
    saveSpace(name);
    setName('');
    setSaving(false);
    toast.show('Soundscape saved');
  };

  const clearMix = () => {
    const snapshot = sounds;
    stopAll();
    onClose();
    toast.show('Mix cleared', 'Undo', () => applySounds(snapshot));
  };

  const removeSound = (id: string) => {
    const prev = sounds[id];
    const label = SOUND_BY_ID[id]?.name ?? 'Sound';
    toggle(id);
    toast.show(`${label} removed`, 'Undo', () => {
      toggle(id);
      setVolume(id, prev.volume);
      if (prev.randomness) toggleRandomness(id);
    });
  };

  return (
    <div
      className="rounded-2xl p-4 fade-up overflow-y-auto max-h-[50vh]"
      style={{ background: 'var(--surface)', boxShadow: '0 14px 30px var(--shadow)' }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setAllRandomness(!allNatural)}
          aria-pressed={allNatural}
          className="flex items-center gap-1.5 min-h-[44px] px-3.5 rounded-full text-xs font-bold transition-all"
          style={allNatural ? { background: 'var(--accent)', color: 'var(--accent-ink)' } : { background: 'var(--surface-2)', color: 'var(--text-muted)' }}
        >
          <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
          All natural
        </button>
        <button
          onClick={() => setSaving(s => !s)}
          aria-expanded={saving}
          className="flex items-center gap-1.5 min-h-[44px] px-3.5 rounded-full text-xs font-bold"
          style={{ background: 'var(--surface-2)', color: 'var(--text)' }}
        >
          <Save className="w-3.5 h-3.5" aria-hidden="true" />
          Save
        </button>
        <button
          onClick={clearMix}
          className="flex items-center gap-1.5 min-h-[44px] px-3 rounded-full text-xs font-bold ml-auto"
          style={{ color: 'var(--danger)' }}
        >
          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
          Clear
        </button>
      </div>

      {saving && (
        <div className="flex items-center gap-2 mt-3 fade-up">
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') confirmSave(); if (e.key === 'Escape') setSaving(false); }}
            placeholder="Name this soundscape…"
            aria-label="Name this soundscape"
            maxLength={40}
            className="flex-grow min-h-[44px] rounded-full px-4 py-2 text-sm font-medium placeholder:text-[color:var(--text-faint)]"
            style={{ background: 'var(--surface-2)', color: 'var(--text)' }}
          />
          <button
            onClick={confirmSave}
            className="shrink-0 flex items-center gap-1.5 min-h-[44px] px-4 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
            Save
          </button>
        </div>
      )}

      <ul className="flex flex-wrap gap-2 mt-3.5" aria-label="Active sounds">
        {activeIds.map(id => {
          const sound = SOUND_BY_ID[id];
          if (!sound) return null;
          const Icon = ICON_MAP[sound.icon] ?? Music;
          const natural = sounds[id].randomness;
          return (
            <li
              key={id}
              className="flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'var(--surface-2)', color: 'var(--text)' }}
            >
              <Icon className="w-3.5 h-3.5 mr-0.5" style={{ color: natural ? 'var(--accent)' : 'var(--text-faint)' }} aria-hidden="true" />
              {sound.name}
              <button
                onClick={() => toggleRandomness(id)}
                aria-label={`${sound.name}: natural variation`}
                aria-pressed={natural}
                title={natural ? 'Natural: on' : 'Natural: off'}
                className={IconBtn}
                style={{ color: natural ? 'var(--accent)' : 'var(--text-faint)' }}
              >
                <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <button
                onClick={() => removeSound(id)}
                aria-label={`Remove ${sound.name}`}
                className={IconBtn}
                style={{ color: 'var(--danger)' }}
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/** Ein gemeinsames Dock: Toast, Mix-Blatt, Mix-Leiste und geführter Player übereinander, über der Nav. */
export const Dock: React.FC<Props> = ({ mixer, player, timer, toast }) => {
  const { playing, loading, activeCount, pause, resume } = mixer;
  const [expanded, setExpanded] = useState(false);
  const hasMix = activeCount > 0;
  const open = expanded && hasMix;

  const status = loading
    ? 'Loading…'
    : playing
      ? `${activeCount} ${activeCount === 1 ? 'sound' : 'sounds'} playing`
      : `${activeCount} ${activeCount === 1 ? 'sound' : 'sounds'} · tap play to resume`;

  if (!hasMix && !player.track && !toast.toast) return null;

  return (
    <div className="fixed inset-x-0 z-40 bottom-[var(--nav-h)] md:bottom-0 pointer-events-none">
      <div className="mx-auto max-w-3xl px-3 pb-2 md:pb-4 flex flex-col gap-2 [&>*]:pointer-events-auto">
        {toast.toast && (
          <div
            role="status"
            className="self-center flex items-center gap-3 pl-4 pr-1.5 rounded-full text-sm font-semibold fade-up"
            style={{ background: 'var(--text)', color: 'var(--bg)', boxShadow: '0 10px 26px var(--shadow)' }}
          >
            {toast.toast.message}
            {toast.toast.actionLabel && (
              <button
                onClick={() => { toast.toast?.onAction?.(); toast.dismiss(); }}
                className="min-h-[44px] px-3 rounded-full text-sm font-extrabold"
                style={{ color: 'var(--accent-soft-2)' }}
              >
                {toast.toast.actionLabel}
              </button>
            )}
          </div>
        )}

        {open && <MixSheet mixer={mixer} toast={toast} onClose={() => setExpanded(false)} />}

        {hasMix && (
          <section
            aria-label="Your soundscape"
            className="rounded-2xl pl-3 pr-2 py-2 flex items-center gap-2"
            style={{ background: 'var(--surface)', boxShadow: '0 14px 30px var(--shadow)' }}
          >
            <button
              onClick={playing ? pause : resume}
              aria-label={playing ? 'Pause mix' : 'Play mix'}
              className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
            >
              {loading
                ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                : playing
                  ? <Pause className="w-5 h-5" aria-hidden="true" />
                  : <Play className="w-5 h-5 ml-0.5" aria-hidden="true" />}
            </button>

            <button
              onClick={() => setExpanded(e => !e)}
              aria-expanded={open}
              className="flex-grow min-w-0 min-h-[44px] flex items-center gap-2 text-left"
            >
              <span className="min-w-0 flex-grow">
                <span className="block text-sm font-bold truncate" style={{ color: 'var(--text)' }}>Your soundscape</span>
                <span className="block text-xs font-semibold truncate" style={{ color: 'var(--text-muted)' }}>{status}</span>
              </span>
              <ChevronUp
                className={`w-5 h-5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                style={{ color: 'var(--text-muted)' }}
                aria-hidden="true"
              />
            </button>

            <SleepTimerButton timer={timer} />
          </section>
        )}

        {player.track && <GuidedPlayer player={player} timerSlot={hasMix ? undefined : <SleepTimerButton timer={timer} />} />}
      </div>
    </div>
  );
};
