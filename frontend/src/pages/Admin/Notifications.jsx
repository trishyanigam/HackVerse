import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import NotificationCard from '../../components/admin/NotificationCard';
import FilterBar from '../../components/judge/FilterBar'; // Reuse existing design components where appropriate!
import { adminNotifications } from '../../mock/admin/notifications';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FILTERS = [
  { value: 'all', label: 'All notifications' },
  { value: 'unread', label: 'Unread Alerts' },
  { value: 'read', label: 'Read History' },
  { value: 'important', label: 'Important Logs' },
  { value: 'announcement', label: 'Announcements' },
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [items, setItems] = useState(adminNotifications);

  const filtered = items.filter((n) => {
    if (activeTab === 'unread') return n.category === 'unread';
    if (activeTab === 'read') return n.category === 'read';
    if (activeTab === 'important') return n.isImportant;
    if (activeTab === 'announcement') return n.category === 'announcement';
    return true;
  });

  const unreadCount = items.filter((n) => n.category === 'unread').length;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, category: 'read' })));
    toast.success('All alerts marked as read.');
  };

  const handleMarkRead = (id) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, category: 'read' } : n))
    );
    toast.success('Notification marked as read.');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4"
        >
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">System Notifications</h2>
            <p className="text-xs text-slate-500 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread alert logs require attention.` : 'All system logs cleared.'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-slate-300 transition-all shrink-0"
            >
              <FiCheckCircle size={13} /> Clear all unread
            </button>
          )}
        </motion.div>

        {/* Tab Switcher Filters */}
        <FilterBar filters={FILTERS} active={activeTab} onSelect={setActiveTab} />

        {/* Notification list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-sm">
              No matching alerts found in database logs.
            </div>
          ) : (
            filtered.map((notif, idx) => (
              <NotificationCard
                key={notif.id}
                notification={notif}
                index={idx}
                onMarkRead={handleMarkRead}
              />
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Notifications;
