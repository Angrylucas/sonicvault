import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Copy, Download, ExternalLink, Volume2 } from 'lucide-react';
import { Sound } from '../types';
import { SOUND_BASE_PATH, DEMO_URL_MAP } from '../constants';

interface SoundCardProps {
  sound: Sound;
  activeId: string | null;
  onPlay: (id: string) => void;
  onStop: () => void;
  onCopy: (text: string) => void;
}

export const SoundCard: React.FC<SoundCardProps> = ({ sound, activeId, onPlay, onStop, onCopy }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Construct the absolute URL for the sound file
  // In a real scenario, this would point to the user's uploaded file.
  // For this demo, we check our DEMO_URL_MAP first.
  const getSoundUrl = () => {
    if (DEMO_URL_MAP[sound.filename]) {
      return DEMO_URL_MAP[sound.filename];
    }
    // Fallback to constructing a local path
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}${SOUND_BASE_PATH}${sound.filename}`;
  };

  const soundUrl = getSoundUrl();

  const isCurrentActive = activeId === sound.id;

  useEffect(() => {
    if (!isCurrentActive && isPlaying) {
      // If another card became active, stop this one
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isCurrentActive, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      onStop();
    } else {
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
      setIsPlaying(true);
      onPlay(sound.id);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onStop();
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(soundUrl);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = soundUrl;
    link.download = sound.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className={`group relative bg-slate-900 border transition-all duration-300 rounded-xl overflow-hidden
        ${isPlaying ? 'border-primary-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'border-slate-800 hover:border-slate-600 hover:shadow-lg'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio 
        ref={audioRef} 
        src={soundUrl} 
        onEnded={handleEnded}
        preload="metadata"
      />

      <div className="p-5 flex flex-col h-full">
        {/* Top Row: Icon + Meta */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 
                ${isPlaying 
                  ? 'bg-primary-500 text-white shadow-lg scale-105' 
                  : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                }
              `}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-1" />
              )}
            </button>
            <div>
              <h3 className={`font-semibold text-lg leading-tight transition-colors ${isPlaying ? 'text-primary-400' : 'text-slate-200'}`}>
                {sound.title}
              </h3>
              <span className="text-xs font-medium text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded mt-1 inline-block border border-slate-800">
                {sound.category}
              </span>
            </div>
          </div>
          
          {/* Duration Badge */}
          {sound.duration && (
            <span className="text-xs text-slate-600 font-mono">
              {sound.duration}
            </span>
          )}
        </div>

        {/* Waveform Visualization (Simulated) */}
        <div className="flex items-center justify-center gap-[2px] h-8 mb-4 opacity-50">
          {Array.from({ length: 24 }).map((_, i) => (
            <div 
              key={i}
              className={`w-1 rounded-full bg-primary-500 transition-all duration-300 ease-in-out`}
              style={{
                height: isPlaying 
                  ? `${Math.max(20, Math.random() * 100)}%` 
                  : `${30 + Math.sin(i * 0.5) * 20}%`,
                opacity: isPlaying ? 0.8 : 0.3
              }}
            />
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 mb-6 line-clamp-2 min-h-[2.5em]">
          {sound.description}
        </p>

        {/* Action Footer */}
        <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between gap-2">
           <div className="flex items-center gap-2">
             <button
               onClick={handleCopyLink}
               className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-800/50 hover:bg-slate-800 hover:text-white rounded-lg transition-colors border border-transparent hover:border-slate-700"
               title="Copy Direct Link"
             >
               <Copy className="w-3.5 h-3.5" />
               Copy Link
             </button>
             <button
                onClick={handleDownload}
                className="p-1.5 text-slate-500 hover:text-white transition-colors"
                title="Download File"
             >
                <Download className="w-4 h-4" />
             </button>
           </div>

           <a 
             href={soundUrl} 
             target="_blank" 
             rel="noopener noreferrer"
             className="p-1.5 text-slate-500 hover:text-primary-400 transition-colors"
             title="Open in new tab"
           >
             <ExternalLink className="w-4 h-4" />
           </a>
        </div>
      </div>
      
      {/* Playing Overlay Gradient */}
      {isPlaying && (
        <div className="absolute inset-0 bg-primary-500/5 pointer-events-none" />
      )}
    </div>
  );
};
