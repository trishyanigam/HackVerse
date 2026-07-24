import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiCalendar, FiUsers, FiDollarSign, FiMonitor,
  FiTag, FiClock, FiCheckCircle, FiUpload,
} from 'react-icons/fi';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import RegistrationStatusBadge from '../../components/participant/RegistrationStatusBadge';
import SubmissionTimeline from '../../components/participant/SubmissionTimeline';
import { registrations } from '../../mock/registrations';

const ParticipantHackathonDetails = () => {
  const navigate = useNavigate();
  // Use first registration as a mock detail view
  const reg = registrations[0];

  return (
    <ParticipantLayout>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/participant/hackathons')}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <FiArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">{reg.hackathonTitle}</h2>
          <p className="text-sm text-slate-500">by {reg.organizer}</p>
        </div>
        <div className="ml-auto">
          <RegistrationStatusBadge status={reg.status} size="md" />
        </div>
      </div>

      {/* Banner */}
      <div className="h-40 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden mb-6">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-5 text-white">
          <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
            {reg.category}
          </span>
        </div>
      </div>

      {/* Submission Progress */}
      <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 mb-5">
        <h4 className="text-sm font-semibold text-white mb-4">Your Submission Progress</h4>
        <div className="overflow-x-auto">
          <SubmissionTimeline currentStep="submitted" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Details Card */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5"
          >
            <h4 className="text-sm font-semibold text-white mb-4">Event Details</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: FiCalendar, label: 'Event Date', value: new Date(reg.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), color: 'text-purple-400' },
                { icon: FiClock, label: 'Submission Deadline', value: new Date(reg.submissionDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), color: 'text-amber-400' },
                { icon: FiDollarSign, label: 'Prize Pool', value: reg.prizePool, color: 'text-emerald-400' },
                { icon: FiMonitor, label: 'Mode', value: reg.mode, color: 'text-blue-400' },
                { icon: FiUsers, label: 'Your Team', value: `${reg.teamName} (${reg.teamSize} members)`, color: 'text-purple-400' },
                { icon: FiTag, label: 'Category', value: reg.category, color: 'text-pink-400' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={14} className={`${color} mt-0.5 shrink-0`} />
                  <div>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-sm text-white font-medium mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111118] border border-white/5 rounded-2xl p-5 h-fit"
        >
          <h4 className="text-sm font-semibold text-white mb-4">Actions</h4>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/participant/submission')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
            >
              <FiUpload size={15} />
              Submit Project
            </button>
            <button
              onClick={() => navigate('/participant/teams')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
            >
              <FiUsers size={15} />
              View Team
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
              <FiCheckCircle size={15} />
              Registration Details
            </button>
          </div>
        </motion.div>
      </div>
    </ParticipantLayout>
  );
};

export default ParticipantHackathonDetails;
