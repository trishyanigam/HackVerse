import React, { useState } from 'react';
import JudgeLayout from '../../layouts/JudgeLayout';
import NotificationCard from '../../components/judge/NotificationCard';
import { notifications } from '../../mock/notifications';
import FilterBar from '../../components/judge/FilterBar';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
];

// Map existing notifications schema to what NotificationCard expects
const mapped = notifications.map((n) => ({
  id: n.id,
  type: n.type === 'approval' ? 'success'
    : n.type === 'deadline' ? 'warning'
    : n.type === 'rejection' ? 'warning'
    : 'info',
  title: n.title,
  message: n.message,
  read: n.isRead,
  createdAt: n.createdAt,
}));

const JudgeNotifications = () => {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState(mapped);

  const filtered = items.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read.');
  };

  return (
    <JudgeLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4"
        >
          <div>
            <h2 className="text-2xl font-bold text-white">Notifications</h2>
            <p className="text-sm text-slate-500 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-slate-300 transition-all shrink-0"
            >
              <FiCheckCircle size={13} /> Mark all read
            </button>
          )}
        </motion.div>

        {/* Filter */}
        <FilterBar filters={FILTERS} active={filter} onSelect={setFilter} />

        {/* Notification List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-sm">No notifications here.</div>
          ) : (
            filtered.map((n, i) => <NotificationCard key={n.id} notification={n} index={i} />)
          )}
        </div>
      </div>
    </JudgeLayout>
  );
};

export default JudgeNotifications;
