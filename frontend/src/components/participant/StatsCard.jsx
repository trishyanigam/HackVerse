import React from 'react';
import { motion } from 'framer-motion';

const colorMap = {
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    icon: 'text-purple-400',
    value: 'text-purple-300',
    glow: 'shadow-purple-500/10',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'text-blue-400',
    value: 'text-blue-300',
    glow: 'shadow-blue-500/10',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'text-emerald-400',
    value: 'text-emerald-300',
    glow: 'shadow-emerald-500/10',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: 'text-amber-400',
    value: 'text-amber-300',
    glow: 'shadow-amber-500/10',
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: 'text-red-400',
    value: 'text-red-300',
    glow: 'shadow-red-500/10',
  },
};

const StatsCard = ({ label, value, icon: Icon, color = 'purple', change, changePositive, index = 0 }) => {
  const colors = colorMap[color] || colorMap.purple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`relative rounded-2xl border ${colors.border} bg-[#111118] p-5 shadow-lg ${colors.glow} overflow-hidden`}
    >
      {/* Background glow blob */}
      <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full ${colors.bg} blur-2xl opacity-60`} />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{label}</p>
          <p className={`text-3xl font-bold ${colors.value} mt-1`}>{value}</p>
          {change && (
            <p
              className={`text-xs mt-2 font-medium ${
                changePositive === true
                  ? 'text-emerald-400'
                  : changePositive === false
                  ? 'text-red-400'
                  : 'text-slate-500'
              }`}
            >
              {changePositive === true ? '↑ ' : changePositive === false ? '↓ ' : ''}
              {change}
            </p>
          )}
        </div>

        <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
          {Icon && <Icon size={22} className={colors.icon} />}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
