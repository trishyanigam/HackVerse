import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => (
  <div className="relative flex-1 min-w-[200px]">
    <FiSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-9 pr-9 py-2.5 bg-white/[0.04] border border-white/5 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/40 transition-all"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <FiX size={14} />
      </button>
    )}
  </div>
);

export default SearchBar;
