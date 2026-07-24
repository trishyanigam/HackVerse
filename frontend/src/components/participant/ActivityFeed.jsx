import React from 'react';
import { motion } from 'framer-motion';
import {
  FiCalendar, FiUsers, FiFileText, FiUpload,
  FiPlusCircle, FiStar, FiUser, FiInfo,
} from 'react-icons/fi';

const iconMap = {
  FiCalendar,
  FiUsers,
  FiFileText,
  FiUpload,
  FiPlusCircle,
  FiStar,
  FiUser,
  FiInfo,
};

const colorMap = {
  purple: 'text-purple-400 bg-purple-500/10',
  blue: 'text-blue-400 bg-blue-500/10',
  emerald: 'text-emerald-400 bg-emerald-500/10',
  amber: 'text-amber-400 bg-amber-500/10',
  gray: 'text-slate-400 bg-slate-500/10',
  indigo: 'text-indigo-400 bg-indigo-500/10',
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const ActivityFeed = ({ activities }) => {
  return (
    <div className="space-y-0 relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/5 rounded-full" />

      {activities.map((activity, i) => {
        const Icon = iconMap[activity.icon] || FiInfo;
        const colors = colorMap[activity.color] || colorMap.gray;

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex gap-4 pl-0 pb-5 relative"
          >
            {/* Icon dot */}
            <div
              className={`relative z-10 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs ${colors}`}
            >
              <Icon size={14} />
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <p className="text-sm text-slate-300">{activity.description}</p>
              <div className="flex items-center gap-2 mt-0.5">
                {activity.hackathon && (
                  <span className="text-xs text-purple-400">{activity.hackathon}</span>
                )}
                <span className="text-xs text-slate-600">{formatTime(activity.timestamp)}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ActivityFeed;
