import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SoundCategory } from '../types';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: SoundCategory | 'All';
  setSelectedCategory: (c: SoundCategory | 'All') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  return (
    <div className="sticky top-[89px] z-20 bg-slate-950/80 backdrop-blur-md py-4 border-b border-slate-800/50 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 justify-between">
        
        {/* Search Input */}
        <div className="relative group w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-primary-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-800 rounded-xl leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm transition-all shadow-sm"
            placeholder="Search sounds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories (Desktop) */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar mask-gradient">
           <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${selectedCategory === 'All' 
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-900/20' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
            >
              All Sounds
            </button>
          {Object.values(SoundCategory).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${selectedCategory === category 
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-900/20' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Categories (Mobile Dropdown) */}
        <div className="md:hidden relative">
           <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as SoundCategory | 'All')}
                className="appearance-none block w-full pl-10 pr-8 py-2.5 border border-slate-800 rounded-xl leading-5 bg-slate-900 text-slate-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm"
              >
                <option value="All">All Categories</option>
                {Object.values(SoundCategory).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-500" />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
