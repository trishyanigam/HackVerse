import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import HackathonRegistrationCard from '../../components/participant/HackathonRegistrationCard';
import { registrations } from '../../mock/registrations';

const STATUSES = ['all', 'approved', 'pending', 'rejected', 'cancelled'];

const MyHackathons = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = registrations.filter((r) => {
    const matchSearch = r.hackathonTitle.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || r.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <ParticipantLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">My Hackathons</h2>
        <p className="text-sm text-slate-500 mt-1">All hackathons you have registered for</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search hackathons..."
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

      {/* Results Count */}
      <p className="text-xs text-slate-500 mb-4">
        Showing {filtered.length} of {registrations.length} hackathons
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-600">
          <FiSearch size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No hackathons found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((reg, i) => (
            <HackathonRegistrationCard key={reg.id} registration={reg} index={i} />
          ))}
        </div>
      )}
    </ParticipantLayout>
  );
};

export default MyHackathons;
