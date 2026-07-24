import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiClipboard, FiClock, FiBarChart2, FiBell } from 'react-icons/fi';

const actions = [
  { label: 'Review Projects', icon: FiClipboard, path: '/judge/projects', gradient: 'from-purple-500 to-indigo-500' },
  { label: 'Pending Reviews', icon: FiClock, path: '/judge/projects?filter=pending', gradient: 'from-amber-500 to-orange-500' },
  { label: 'View Analytics', icon: FiBarChart2, path: '/judge/analytics', gradient: 'from-blue-500 to-cyan-500' },
  { label: 'Notifications', icon: FiBell, path: '/judge/notifications', gradient: 'from-emerald-500 to-teal-500' },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {actions.map((act, i) => (
        <motion.button
          key={act.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(act.path)}
          className="flex flex-col items-center gap-3 p-4 bg-[#111118] border border-white/5 hover:border-white/10 rounded-2xl group transition-all duration-200"
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${act.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
            <act.icon size={17} />
          </div>
          <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors text-center leading-tight">{act.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
