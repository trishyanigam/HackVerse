import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="relative flex-1">
      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
      />
    </div>
  );
};

export default SearchBar;
