import React from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiBriefcase,
  FiAward,
  FiCpu,
  FiFolder,
  FiSend,
  FiActivity,
  FiAlertTriangle,
} from 'react-icons/fi';

const iconMap = {
  users: { icon: FiUsers, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  organizers: { icon: FiBriefcase, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  judges: { icon: FiAward, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  hackathons: { icon: FiCpu, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  teams: { icon: FiFolder, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  submissions: { icon: FiSend, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  active: { icon: FiActivity, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  pending: { icon: FiAlertTriangle, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
};

const DashboardStatCard = ({ stat, index }) => {
  const cfg = iconMap[stat.type] || iconMap.users;
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-black/20"
    >
      <div className="space-y-2 min-w-0">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</span>
        <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value.toLocaleString()}</h3>
        <p className={`text-xs font-semibold ${stat.trend === 'down' ? 'text-rose-400' : 'text-slate-400'}`}>
          {stat.change}
        </p>
      </div>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${cfg.color}`}>
        <Icon size={20} />
      </div>
    </motion.div>
  );
};

export default DashboardStatCard;
