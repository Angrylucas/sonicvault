import React from 'react';
import { SearchX } from 'lucide-react';

interface Props {
  what: string;
  query: string;
  onClear: () => void;
}

/** Gemeinsamer Leerzustand für alle Suchen: nennt den Begriff und bietet den Ausweg. */
export const EmptyState: React.FC<Props> = ({ what, query, onClear }) => (
  <div className="flex flex-col items-center text-center py-14 gap-3" role="status">
    <span className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
      <SearchX className="w-5 h-5" aria-hidden="true" />
    </span>
    <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>
      No {what} match “{query.trim()}”
    </p>
    <button
      onClick={onClear}
      className="min-h-[44px] px-5 rounded-full text-sm font-bold transition-opacity hover:opacity-80"
      style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
    >
      Clear search
    </button>
  </div>
);
