import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiUpload, FiUsers, FiCalendar, FiFlag } from 'react-icons/fi';

const iconMap = {
  registration: FiUsers,
  submission: FiUpload,
  approval: FiCheckCircle,
  hackathon: FiCalendar,
  default: FiFlag
};

const colorMap = {
  registration: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  submission: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  approval: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  hackathon: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  default: 'bg-slate-500/10 text-slate-400 border-white/10'
};

const ActivityTimeline = ({ activities }) => {
  return (
    <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
      {activities.map((act, i) => {
        const Icon = iconMap[act.type] || iconMap.default;
        const colorClass = colorMap[act.type] || colorMap.default;

        return (
          <motion.div
            key={act.id || i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative"
          >
            {/* Indicator Dot Icon */}
            <div className={`absolute -left-[22px] top-0.5 w-5 h-5 rounded-full border flex items-center justify-center bg-[#0a0a0f] text-[10px] ${colorClass}`}>
              <Icon size={10} />
            </div>

            {/* Content */}
            <div>
              <p className="text-xs text-white font-medium">{act.message}</p>
              <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1.5">
                <span>{act.time || 'Just now'}</span>
                {act.hackathon && <span className="text-slate-600">· {act.hackathon}</span>}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ActivityTimeline;
