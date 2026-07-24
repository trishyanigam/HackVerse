import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiUpload, FiShield } from 'react-icons/fi';

const iconMap = {
  hackathons: FiCalendar,
  participants: FiUsers,
  submissions: FiUpload,
  judges: FiShield,
};

const DashboardStatsCard = ({ stat, index }) => {
  const Icon = iconMap[stat.type] || FiCalendar;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-[#111118] border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-purple-500/20 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
          <h3 className="text-2xl font-bold text-white mt-1.5">{stat.value.toLocaleString()}</h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">{stat.change}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
          <Icon size={18} />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardStatsCard;
