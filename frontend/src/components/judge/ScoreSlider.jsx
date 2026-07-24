import React from 'react';
import { motion } from 'framer-motion';

const ScoreSlider = ({ label, value, max = 10, onChange }) => {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-slate-400">{label}</label>
        <span className="text-sm font-bold text-white">{value} <span className="text-slate-600 font-normal text-xs">/ {max}</span></span>
      </div>
      <input
        type="range" min={0} max={max} step={0.5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full accent-purple-500 cursor-pointer"
      />
      <div className="w-full bg-white/[0.04] rounded-full h-1 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-400"
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
};

export default ScoreSlider;
