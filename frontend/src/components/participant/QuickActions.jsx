import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiPlusCircle,
  FiUsers,
  FiUpload,
  FiCompass,
  FiBell,
  FiUser,
} from 'react-icons/fi';

const actions = [
  {
    label: 'Browse Hackathons',
    icon: FiCompass,
    path: '/hackathons',
    color: 'purple',
  },
  {
    label: 'Create Team',
    icon: FiPlusCircle,
    path: '/participant/team/create',
    color: 'blue',
  },
  {
    label: 'Join Team',
    icon: FiUsers,
    path: '/participant/team/join',
    color: 'emerald',
  },
  {
    label: 'Submit Project',
    icon: FiUpload,
    path: '/participant/submission',
    color: 'amber',
  },
  {
    label: 'Notifications',
    icon: FiBell,
    path: '/participant/notifications',
    color: 'indigo',
  },
  {
    label: 'Edit Profile',
    icon: FiUser,
    path: '/participant/profile',
    color: 'rose',
  },
];

const colorMap = {
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20',
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20',
  indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20',
  rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20',
};

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {actions.map((action, i) => {
        const Icon = action.icon;
        const colors = colorMap[action.color] || colorMap.purple;

        return (
          <motion.button
            key={action.path}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(action.path)}
            className={`flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border text-center transition-all duration-200 ${colors}`}
          >
            <Icon size={20} />
            <span className="text-xs font-medium leading-tight">{action.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default QuickActions;
