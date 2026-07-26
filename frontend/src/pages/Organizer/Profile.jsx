import React, { useState } from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import {
  FiMail, FiPhone, FiMapPin, FiBriefcase, FiGlobe,
  FiGithub, FiLinkedin, FiTwitter, FiEdit2, FiSave, FiX
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const socialIconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  portfolio: FiGlobe
};

const OrganizerProfile = () => {
  const { user: authUser } = useAuth();

  const [profile, setProfile] = useState({
    name: authUser?.name || authUser?.email?.split('@')[0] || 'Organizer',
    organization: 'TechInnovators Hack Labs',
    email: authUser?.email || 'organizer@techinnovators.org',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    bio: 'Tech community architect with experience directing hackathons and innovation incubation hubs.',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      portfolio: 'https://hackverse.io'
    }
  });

  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...form });
    toast.success('Organizer profile updated successfully!');
    setEditOpen(false);
  };

  const userInitials = (profile.name
    ? profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
    : 'OR'
  ).toUpperCase();

  return (
    <OrganizerLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Organizer Profile</h2>
          <p className="text-sm text-slate-500">Manage your organizer profile, contact details, and organization meta</p>
        </div>
        <button
          onClick={() => {
            setForm({ ...profile });
            setEditOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
        >
          <FiEdit2 size={14} />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-6 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
              {userInitials}
            </div>
            <h3 className="text-lg font-bold text-white">{profile.name}</h3>
            <p className="text-sm text-purple-400 mt-1 flex items-center justify-center gap-1.5 font-medium">
              <FiBriefcase size={13} />
              {profile.organization}
            </p>
            <p className="text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
              <FiMapPin size={12} />
              {profile.location}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5"
          >
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-slate-400">Social Connections</h4>
            <div className="space-y-3">
              {Object.entries(profile.socialLinks).map(([key, url]) => {
                const Icon = socialIconMap[key] || FiGlobe;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <Icon size={16} className="text-purple-400 shrink-0" />
                    <span className="capitalize">{key}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-6 space-y-5"
          >
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Organizer Biography</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{profile.bio}</p>
            </div>

            <div className="border-t border-white/5 pt-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Contact Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: FiMail, label: 'Email', value: profile.email },
                  { icon: FiPhone, label: 'Phone', value: profile.phone },
                  { icon: FiBriefcase, label: 'Company / Org', value: profile.organization },
                  { icon: FiMapPin, label: 'Base Location', value: profile.location },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{label}</p>
                      <p className="text-sm text-white font-medium mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-[#111118] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
              <h3 className="text-base font-bold text-white">Edit Organizer Profile</h3>
              <button onClick={() => setEditOpen(false)} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all">
                <FiX size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { key: 'name', label: 'Full Name' },
                { key: 'organization', label: 'Organization' },
                { key: 'email', label: 'Contact Email' },
                { key: 'phone', label: 'Contact Phone' },
                { key: 'location', label: 'Location' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="text-xs text-slate-400 mb-1.5 block font-medium">{label}</label>
                  <input
                    type="text"
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full bg-[#0a0a0f] border border-white/10 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block font-medium">Bio</label>
                <textarea
                  value={form.bio}
                  rows={3}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  className="w-full bg-[#0a0a0f] border border-white/10 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-400 bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
              >
                <FiSave size={14} />
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </OrganizerLayout>
  );
};

export default OrganizerProfile;
