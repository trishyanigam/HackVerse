import React from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiAlertCircle, FiInfo, FiTrash } from 'react-icons/fi';

const iconMap = {
  alert: FiAlertCircle,
  info: FiInfo,
  default: FiBell
};

const colorMap = {
  alert: 'text-red-400 bg-red-500/10 border-red-500/20',
  info: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  default: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
};

const NotificationPanel = ({ notifications, onMarkRead, onDelete }) => {
  return (
    <div className="space-y-3">
      {notifications.length === 0 ? (
        <div className="text-center py-8 text-slate-600">
          <FiBell size={24} className="mx-auto mb-2 opacity-30" />
          <p className="text-xs">All caught up!</p>
        </div>
      ) : (
        notifications.map((notif, i) => {
          const Icon = iconMap[notif.type] || iconMap.default;
          const colorClass = colorMap[notif.type] || colorMap.default;

          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`p-3.5 rounded-xl border flex gap-3.5 hover:bg-white/[0.01] transition-all ${
                notif.isRead ? 'bg-[#0a0a0f] border-white/5 opacity-60' : 'bg-[#111118] border-white/10'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${colorClass}`}>
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-bold text-white leading-normal truncate">{notif.title}</h4>
                  <span className="text-[9px] text-slate-500 shrink-0">{notif.time || '10m ago'}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{notif.message}</p>

                {/* Actions */}
                <div className="flex gap-3 mt-2 text-[10px]">
                  {!notif.isRead && (
                    <button
                      onClick={() => onMarkRead && onMarkRead(notif.id)}
                      className="text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      Mark as read
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(notif.id)}
                      className="text-slate-500 hover:text-red-400 font-medium inline-flex items-center gap-0.5"
                    >
                      <FiTrash size={10} />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default NotificationPanel;
