import React from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiShield, FiAlertOctagon, FiInfo, FiLayers } from 'react-icons/fi';

const cardMap = {
  critical: { icon: FiAlertOctagon, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  request: { icon: FiLayers, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  security: { icon: FiShield, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  info: { icon: FiInfo, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
};

const NotificationCard = ({ notification, index, onMarkRead }) => {
  const cfg = cardMap[notification.type] || cardMap.info;
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className={`bg-[#0f0f1a] border border-white/5 rounded-2xl p-4 flex gap-4 items-start ${
        notification.category === 'unread' ? 'bg-gradient-to-r from-purple-500/5 to-transparent' : ''
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${cfg.color}`}>
        <Icon size={18} />
      </div>
      <div className="flex-grow min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-sm font-bold text-white leading-tight">
            {notification.title}
          </h4>
          <span className="text-[10px] text-slate-500 font-semibold shrink-0">
            {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{notification.message}</p>
        <div className="flex items-center gap-3 pt-1">
          {notification.isImportant && (
            <span className="text-[10px] uppercase font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-md px-1.5 py-0.5">
              Important
            </span>
          )}
          {notification.category === 'unread' && onMarkRead && (
            <button
              onClick={() => onMarkRead(notification.id)}
              className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationCard;
