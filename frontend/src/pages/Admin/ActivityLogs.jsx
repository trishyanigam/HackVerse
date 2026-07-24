import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ActivityTimeline from '../../components/admin/ActivityTimeline';
import SearchBar from '../../components/admin/SearchBar';
import TableToolbar from '../../components/admin/TableToolbar';
import AdvancedFilter from '../../components/admin/AdvancedFilter';
import { adminActivityLogs } from '../../mock/admin/activityLogs';
import { motion } from 'framer-motion';

const FILTER_CONFIG = [
  {
    key: 'type',
    placeholder: 'Filter Event Type',
    options: [
      { value: 'security', label: 'Security & Logins' },
      { value: 'hackathon_create', label: 'Hackathon Created' },
      { value: 'hackathon_delete', label: 'Hackathon Deleted' },
      { value: 'submission_review', label: 'Reviews & Scoring' },
      { value: 'registration_approve', label: 'Registrations' },
      { value: 'moderation', label: 'Moderation actions' },
    ],
  },
];

const ActivityLogs = () => {
  const [logs] = useState(adminActivityLogs);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  // Filter
  const filtered = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? log.type === filterType : true;
    return matchesSearch && matchesType;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white tracking-wide">Activity Audit Logs</h2>
          <p className="text-xs text-slate-500 mt-1">Real-time system events timeline trace and audit history trails.</p>
        </motion.div>

        {/* Toolbar */}
        <TableToolbar>
          <SearchBar value={search} onChange={setSearch} placeholder="Search logs by action or actor..." />
          <AdvancedFilter
            filters={FILTER_CONFIG}
            selectedFilters={{ type: filterType }}
            onFilterChange={(_, val) => setFilterType(val)}
          />
        </TableToolbar>

        {/* Timeline block */}
        <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-6 shadow-xl">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No matching activity events found.
            </div>
          ) : (
            <ActivityTimeline activities={filtered} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ActivityLogs;
