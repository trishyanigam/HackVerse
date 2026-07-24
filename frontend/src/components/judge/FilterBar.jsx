import React from 'react';
import { FiFilter } from 'react-icons/fi';

const FilterBar = ({ filters, active, onSelect }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <FiFilter size={13} className="text-slate-500 shrink-0" />
    {filters.map((f) => (
      <button
        key={f.value}
        onClick={() => onSelect(f.value)}
        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
          active === f.value
            ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
            : 'bg-white/[0.03] text-slate-400 border-white/5 hover:bg-white/[0.07] hover:text-slate-200'
        }`}
      >
        {f.label}
      </button>
    ))}
  </div>
);

export default FilterBar;
