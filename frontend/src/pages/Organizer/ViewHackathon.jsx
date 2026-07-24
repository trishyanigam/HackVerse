import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import {
  FiArrowLeft, FiEdit2, FiCalendar, FiUsers, FiDollarSign, FiMonitor,
  FiMapPin, FiLayers, FiShield
} from 'react-icons/fi';
import { mockHackathons } from '../../mock/hackathons';

const ViewHackathon = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find target hackathon or fallback
  const h = mockHackathons.find(item => item.id === id) || mockHackathons[0];

  return (
    <OrganizerLayout>
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/organizer/hackathons')}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-all"
        >
          <FiArrowLeft size={16} />
          Back to list
        </button>

        <button
          onClick={() => navigate(`/organizer/hackathon/edit/${h.id}`)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
        >
          <FiEdit2 size={13} />
          Edit Hackathon
        </button>
      </div>

      {/* Banner */}
      <div className="h-56 rounded-2xl bg-slate-900 border border-white/5 relative overflow-hidden mb-6">
        <img src={h.banner} alt={h.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6">
          <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full text-purple-300 bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm">
            {h.theme}
          </span>
          <h2 className="text-2xl font-bold text-white mt-2">{h.title}</h2>
          <p className="text-xs text-slate-300 mt-1">{h.organizer}</p>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Registrations', value: h.registrations, icon: FiUsers, color: 'text-purple-400' },
          { label: 'Submissions Count', value: Math.floor((h.registrations || 0) * 0.4), icon: FiLayers, color: 'text-emerald-400' },
          { label: 'Assigned Judges', value: 4, icon: FiShield, color: 'text-blue-400' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#111118] border border-white/5 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left main details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-3">Description</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{h.description}</p>
          </div>

          {/* Rules */}
          {h.rules && (
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-4">Official Rules</h3>
              <ul className="space-y-3.5">
                {h.rules.map((rule, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-300 items-start">
                    <span className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[10px] text-purple-300 font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Judging Criteria */}
          {h.judgingCriteria && (
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-4">Judging Criteria</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {h.judgingCriteria.map((item, idx) => (
                  <div key={idx} className="bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-xs font-bold text-white">{item.criteria}</h4>
                      <span className="text-xs font-bold text-purple-400">{item.weight}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar specs */}
        <div className="space-y-6">
          {/* Metadata details */}
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Event Info</h3>

            <div className="space-y-3.5">
              {[
                { label: 'Start Date', value: h.timeline?.start || 'July 24, 2026', icon: FiCalendar },
                { label: 'End Date', value: h.timeline?.end || 'July 27, 2026', icon: FiCalendar },
                { label: 'Prize Pool', value: h.prizePool, icon: FiDollarSign, color: 'text-emerald-400' },
                { label: 'Mode', value: h.venue.includes('Virtual') ? 'Online' : 'Offline', icon: FiMonitor },
                { label: 'Venue Location', value: h.venue, icon: FiMapPin },
                { label: 'Team Constraint', value: h.teamSize, icon: FiUsers },
              ].map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-start gap-3">
                    <Icon size={14} className={`text-slate-500 mt-0.5 shrink-0 ${info.color || ''}`} />
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{info.label}</p>
                      <p className="text-xs text-white font-medium mt-0.5">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
};

export default ViewHackathon;
