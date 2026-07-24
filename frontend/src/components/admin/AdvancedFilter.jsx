import React from 'react';
import { FiFilter } from 'react-icons/fi';

const AdvancedFilter = ({ filters = [], selectedFilters = {}, onFilterChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
        <FiFilter size={13} />
        <span>Filters:</span>
      </div>
      {filters.map((f) => (
        <div key={f.key} className="relative">
          <select
            value={selectedFilters[f.key] || ''}
            onChange={(e) => onFilterChange(f.key, e.target.value)}
            className="appearance-none bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold text-slate-300 focus:outline-none focus:border-purple-500/40 transition-all cursor-pointer"
          >
            <option value="" className="bg-[#0f0f1a] text-slate-400">
              {f.placeholder}
            </option>
            {f.options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0f0f1a] text-slate-300">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvancedFilter;
