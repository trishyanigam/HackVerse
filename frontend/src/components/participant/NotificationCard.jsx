import React from 'react';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiUserPlus,
  FiStar,
  FiInfo,
  FiXCircle,
  FiZap,
} from 'react-icons/fi';

const iconMap = {
  FiCheckCircle,
  FiAlertTriangle,
  FiUserPlus,
  FiStar,
  FiInfo,
  FiXCircle,
  FiZap,
};

const colorMap = {
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  red: 'bg-red-500/10 border-red-500/20 text-red-400',
  gray: 'bg-slate-500/10 border-slate-500/20 text-slate-400',
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffHrs < 1) return 'Just now';
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

const NotificationCard = ({ notification, index = 0, onMarkRead }) => {
  const { title, message, hackathon, isRead, isImportant, createdAt, icon, color } = notification;

  const Icon = iconMap[icon] || FiInfo;
  const colors = colorMap[color] || colorMap.gray;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex gap-4 p-4 rounded-xl border transition-all ${
        !isRead
          ? 'bg-purple-500/5 border-purple-500/20'
          : 'bg-white/[0.02] border-white/5 hover:border-white/10'
      }`}
    >
      {/* Icon */}
      <div className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center ${colors}`}>
        <Icon size={16} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className={`text-sm font-medium ${!isRead ? 'text-white' : 'text-slate-300'}`}>
              {title}
              {isImportant && (
                <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  Important
                </span>
              )}
            </p>
            {hackathon && <p className="text-xs text-purple-400 mt-0.5">{hackathon}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-600">{formatTime(createdAt)}</span>
            {!isRead && (
              <button
                onClick={() => onMarkRead && onMarkRead(notification.id)}
                className="w-2 h-2 rounded-full bg-purple-500 hover:bg-purple-400 transition-colors"
                title="Mark as read"
              />
            )}
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
};

export default NotificationCard;
