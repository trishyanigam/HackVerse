import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';
import { getUserById } from '../../mock/admin/users';
import { FiChevronLeft, FiMail, FiCalendar, FiActivity, FiLayers, FiFolder, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUserById(id);

  // Activity events mock data
  const userTimeline = [
    { title: 'Joined Platform', time: '2026-01-15', desc: 'Registered account and verified email address' },
    { title: 'Joined Team', time: '2026-02-10', desc: 'Accepted invitation to join team "ByteBuilders"' },
    { title: 'Registered for Hackathon', time: '2026-07-01', desc: 'Registered for "CodeSprint 2026"' },
    { title: 'Submitted Project', time: '2026-07-20', desc: 'Submitted project "EcoTrack" for evaluation' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/admin/users')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-bold uppercase tracking-wider transition-colors"
        >
          <FiChevronLeft size={16} /> Back to Users list
        </button>

        {/* Profile Card Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6 items-start justify-between"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-xl text-purple-400">
              {user.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white leading-tight">{user.name}</h3>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-semibold capitalize bg-white/5 px-2 py-0.5 border border-white/5 rounded-md text-slate-300">
                  {user.role}
                </span>
                <StatusBadge status={user.status} />
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 text-center">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
              <FiLayers className="mx-auto mb-1 text-purple-400" size={16} />
              <p className="text-lg font-bold text-white">{user.hackathons}</p>
              <p className="text-[9px] uppercase font-bold text-slate-500">Hackathons</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
              <FiFolder className="mx-auto mb-1 text-blue-400" size={16} />
              <p className="text-lg font-bold text-white">{user.teams}</p>
              <p className="text-[9px] uppercase font-bold text-slate-500">Teams</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
              <FiSend className="mx-auto mb-1 text-emerald-400" size={16} />
              <p className="text-lg font-bold text-white">{user.submissions}</p>
              <p className="text-[9px] uppercase font-bold text-slate-500">Submissions</p>
            </div>
          </div>
        </motion.div>

        {/* Detailed Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* User Contact & Metadata Info */}
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg space-y-4">
            <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider">
              Profile details
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <FiMail className="text-slate-500 shrink-0" size={15} />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Email Address</p>
                  <p className="truncate font-semibold">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <FiCalendar className="text-slate-500 shrink-0" size={15} />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Registration Date</p>
                  <p className="font-semibold">{new Date(user.registeredAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <FiActivity className="text-slate-500 shrink-0" size={15} />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Activity Level</p>
                  <p className="font-semibold text-emerald-400">High (Active Contributor)</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Timeline Audit */}
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg space-y-4">
            <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider">
              Recent Action Timeline
            </h4>
            <div className="relative pl-5 space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
              {userTimeline.map((item, idx) => (
                <div key={idx} className="relative space-y-0.5">
                  {/* node */}
                  <div className="absolute -left-[21px] top-1.5 w-[10px] h-[10px] rounded-full border-2 border-purple-500 bg-[#0f0f1a]" />
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold text-white leading-tight">{item.title}</p>
                    <span className="text-[9px] text-slate-500 font-bold">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserDetails;
