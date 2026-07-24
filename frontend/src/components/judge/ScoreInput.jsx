import React from 'react';

const ScoreInput = ({ label, value, max = 10, onChange, className = '' }) => {
  const handleChange = (e) => {
    const v = Number(e.target.value);
    if (v >= 0 && v <= max) onChange(v);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-xs font-semibold text-slate-400">{label}</label>}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          max={max}
          step={0.5}
          value={value}
          onChange={handleChange}
          className="w-20 text-center text-sm font-bold text-white bg-white/[0.04] border border-white/5 rounded-xl py-2 px-3 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
        />
        <span className="text-xs text-slate-500">/ {max}</span>
      </div>
    </div>
  );
};

export default ScoreInput;
