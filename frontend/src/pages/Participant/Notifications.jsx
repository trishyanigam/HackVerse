import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiFilter, FiCheck, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import NotificationCard from '../../components/participant/NotificationCard';
import { notifications as initialNotifs } from '../../mock/notifications';

const FILTERS = ['all', 'unread', 'important'];

const Notifications = () => {
  const [notifs, setNotifs] = useState(initialNotifs);
  const [filter, setFilter] = useState('all');

  const handleMarkRead = (id) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const filtered = notifs.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'important') return n.isImportant;
    return true;
  });

  const unreadCount = notifs.filter((n) => !n.isRead).length;

  return (
    <ParticipantLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-500 text-white">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">Stay up to date with your hackathon activities</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-300 bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            <FiCheckCircle size={14} />
            Mark all read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-medium capitalize border transition-all ${
              filter === f
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
            }`}
          >
            {f}
            {f === 'unread' && unreadCount > 0 && (
              <span className="ml-2 text-xs bg-purple-500 text-white rounded-full px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3 max-w-2xl">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <FiBell size={32} className="mx-auto text-slate-700 mb-3" />
            <p className="text-slate-500 text-sm">No notifications to show.</p>
          </div>
        ) : (
          filtered.map((notif, i) => (
            <NotificationCard
              key={notif.id}
              notification={notif}
              index={i}
              onMarkRead={handleMarkRead}
            />
          ))
        )}
      </div>
    </ParticipantLayout>
  );
};

export default Notifications;
