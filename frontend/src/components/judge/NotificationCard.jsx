import React from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiCheckCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

const iconMap = {
  info: { Icon: FiInfo, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  success: { Icon: FiCheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  warning: { Icon: FiAlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  default: { Icon: FiBell, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
};

const NotificationCard = ({ notification, index }) => {
  const { Icon, color, bg } = iconMap[notification.type] || iconMap.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 ${
        notification.read ? 'bg-white/[0.01] border-white/5' : 'bg-white/[0.04] border-white/10'
      }`}
    >
      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${bg}`}>
        <Icon size={15} className={color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm font-semibold ${notification.read ? 'text-slate-400' : 'text-white'}`}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notification.message}</p>
        <span className="text-[10px] text-slate-600 font-medium mt-1.5 inline-block">
          {new Date(notification.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};

export default NotificationCard;
