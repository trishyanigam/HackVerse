import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCpu, FiFileText, FiShield, FiAlertTriangle, FiCheck } from 'react-icons/fi';

const iconMap = {
  user: { icon: FiUser, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  hackathon: { icon: FiCpu, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  review: { icon: FiFileText, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  team: { icon: FiUser, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  registration: { icon: FiCheck, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  moderation: { icon: FiAlertTriangle, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  security: { icon: FiShield, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
};

const ActivityTimeline = ({ activities = [] }) => {
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
      {activities.map((act, index) => {
        const cfg = iconMap[act.type] || iconMap.user;
        const Icon = cfg.icon;

        return (
          <motion.div
            key={act.id || index}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
            className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            {/* Timeline node */}
            <div className={`absolute -left-[21px] w-6 h-6 rounded-lg flex items-center justify-center border bg-[#07070d] ${cfg.color}`}>
              <Icon size={12} />
            </div>

            <div className="space-y-0.5">
              <p className="text-sm font-bold text-white leading-tight">{act.action}</p>
              <p className="text-xs text-slate-500">
                {act.description || `Performed by ${act.actor}`}
              </p>
            </div>

            <div className="text-[10px] text-slate-600 font-bold shrink-0">
              {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ActivityTimeline;
