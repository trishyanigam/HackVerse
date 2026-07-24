import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiEdit2, FiGithub, FiLinkedin, FiTwitter, FiGlobe,
  FiMail, FiMapPin, FiBookOpen, FiStar, FiX, FiSave,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import { participantUser } from '../../mock/participantDashboard';

const socialIconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  portfolio: FiGlobe,
};

const ParticipantProfile = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState(participantUser);
  const [form, setForm] = useState({ ...participantUser });

  const handleSave = () => {
    setUser({ ...form });
    toast.success('Profile updated successfully!');
    setEditOpen(false);
  };

  return (
    <ParticipantLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">My Profile</h2>
          <p className="text-sm text-slate-500">Manage your public profile and information</p>
        </div>
        <button
          onClick={() => setEditOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
        >
          <FiEdit2 size={14} />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Avatar Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-6 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <h3 className="text-lg font-bold text-white">{user.name}</h3>
            <p className="text-sm text-purple-400 mt-1">{user.role}</p>
            <p className="text-xs text-slate-500 mt-2 flex items-center justify-center gap-1.5">
              <FiMapPin size={11} />
              {user.college}
            </p>

            {/* Stats Row */}
            <div className="flex justify-around mt-5 pt-5 border-t border-white/5">
              <div>
                <p className="text-lg font-bold text-white">{user.hackathonsWon}</p>
                <p className="text-xs text-slate-500">Wins</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white">{user.totalPoints.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Points</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white">#{user.rank}</p>
                <p className="text-xs text-slate-500">Rank</p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5"
          >
            <h4 className="text-sm font-semibold text-white mb-4">Social Links</h4>
            <div className="space-y-3">
              {Object.entries(user.socialLinks).map(([key, url]) => {
                const Icon = socialIconMap[key] || FiGlobe;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <Icon size={16} className="text-purple-400" />
                    <span className="capitalize">{key}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5"
          >
            <h4 className="text-sm font-semibold text-white mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: FiMail, label: 'Email', value: user.email },
                { icon: FiBookOpen, label: 'Branch', value: user.branch },
                { icon: FiMapPin, label: 'College', value: user.college },
                { icon: FiStar, label: 'Year', value: user.year },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Icon size={14} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-sm text-white font-medium mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5"
          >
            <h4 className="text-sm font-semibold text-white mb-3">Bio</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{user.bio}</p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5"
          >
            <h4 className="text-sm font-semibold text-white mb-4">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-[#111118] border border-white/10 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-white">Edit Profile</h3>
              <button onClick={() => setEditOpen(false)} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all">
                <FiX size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', type: 'text' },
                { key: 'college', label: 'College', type: 'text' },
                { key: 'branch', label: 'Branch', type: 'text' },
                { key: 'year', label: 'Year', type: 'text' },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="text-sm font-medium text-slate-300 mb-1.5 block">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-slate-300 mb-1.5 block">Bio</label>
                <textarea
                  value={form.bio}
                  rows={3}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setEditOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-sm text-slate-400 bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
              >
                <FiSave size={14} />
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </ParticipantLayout>
  );
};

export default ParticipantProfile;
