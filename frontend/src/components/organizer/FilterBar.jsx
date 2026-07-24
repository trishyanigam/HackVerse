import React from 'react';

const FilterBar = ({ selected, onChange, options }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value;
        const lbl = typeof opt === 'string' ? opt : opt.label;
        const isActive = selected === val;

        return (
          <button
            key={val}
            onClick={() => onChange(val)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize border transition-all duration-200 ${
              isActive
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
            }`}
          >
            {lbl}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
