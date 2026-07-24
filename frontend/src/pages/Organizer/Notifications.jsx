import React, { useState } from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import NotificationPanel from '../../components/organizer/NotificationPanel';
import { notifications as initialNotifications } from '../../mock/notifications';
import { FiBell, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FILTERS = ['all', 'unread', 'important'];

const OrganizerNotifications = () => {
  const [notifs, setNotifs] = useState(
    initialNotifications.map(n => ({
      ...n,
      type: n.isImportant ? 'alert' : 'default',
    }))
  );
  const [filter, setFilter] = useState('all');

  const handleMarkRead = (id) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    toast.success('Notification marked as read');
  };

  const handleMarkAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleDelete = (id) => {
    setNotifs(prev => prev.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const filtered = notifs.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'important') return n.isImportant;
    return true;
  });

  const unreadCount = notifs.filter(n => !n.isRead).length;

  return (
    <OrganizerLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500 text-white">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">Review system alerts, registrations requests, and submissions notifications</p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
          >
            <FiCheckCircle size={14} />
            Mark all read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize border transition-all duration-200 ${
              filter === f
                ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="max-w-2xl bg-[#111118]/40 border border-white/5 rounded-2xl p-4">
        <NotificationPanel
          notifications={filtered}
          onMarkRead={handleMarkRead}
          onDelete={handleDelete}
        />
      </div>
    </OrganizerLayout>
  );
};

export default OrganizerNotifications;
