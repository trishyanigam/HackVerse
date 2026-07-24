import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiMonitor, FiDollarSign, FiSearch } from 'react-icons/fi';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import RegistrationStatusBadge from '../../components/participant/RegistrationStatusBadge';
import { registrations } from '../../mock/registrations';

const STATUSES = ['all', 'approved', 'pending', 'rejected', 'cancelled'];

const MyRegistrations = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = registrations.filter((r) => {
    const matchSearch = r.hackathonTitle.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || r.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <ParticipantLayout>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">My Registrations</h2>
        <p className="text-sm text-slate-500 mt-1">Complete history of your hackathon registrations</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search registrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize border transition-all ${
                filter === s
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hackathon</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Team</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Deadline</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Prize</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Mode</th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-600 text-sm">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filtered.map((reg, i) => (
                  <motion.tr
                    key={reg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">{reg.hackathonTitle}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{reg.organizer}</p>
                      {reg.rejectionReason && (
                        <p className="text-xs text-red-400 mt-1 max-w-xs">{reg.rejectionReason}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <FiUsers size={12} className="text-purple-400" />
                        {reg.teamName}
                        <span className="text-slate-600">({reg.teamSize})</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Reg. {new Date(reg.registeredOn).toLocaleDateString('en-IN')}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <FiCalendar size={12} className="text-amber-400" />
                        {new Date(reg.submissionDeadline).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-xs text-emerald-400 font-medium">{reg.prizePool}</span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <FiMonitor size={12} />
                        {reg.mode}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <RegistrationStatusBadge status={reg.status} />
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Count Footer */}
      <p className="text-xs text-slate-600 mt-4 text-right">
        {filtered.length} record{filtered.length !== 1 ? 's' : ''}
      </p>
    </ParticipantLayout>
  );
};

export default MyRegistrations;
