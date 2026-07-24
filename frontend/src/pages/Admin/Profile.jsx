import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ProfileCard from '../../components/admin/ProfileCard';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiEdit2, FiLock, FiGlobe, FiLinkedin } from 'react-icons/fi';
import toast from 'react-hot-toast';

const mockProfile = {
  name: 'Devika Sen',
  email: 'admin@hackverse.dev',
  phone: '+91 98765 43210',
  role: 'Platform Owner',
  bio: 'Lead Architect & Principal Platform Administrator. Responsible for platform scalability, user operations guidelines and event integrity.',
  linkedin: 'linkedin.com/in/devikasen',
  website: 'hackverse.dev',
};

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(mockProfile);
  const [draft, setDraft] = useState(mockProfile);

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    toast.success('Admin profile credentials updated successfully!');
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">Admin Profile</h2>
            <p className="text-xs text-slate-500 mt-1">Manage credentials and authentication details.</p>
          </div>
          {editing ? (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-slate-300 transition-all"
              >
                <FiX size={14} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 rounded-xl text-xs font-bold text-white transition-all shadow-md shadow-purple-500/10"
              >
                <FiSave size={14} /> Save Profile
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-slate-300 transition-all"
            >
              <FiEdit2 size={14} /> Edit profile details
            </button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Visual profile details card */}
          <div className="md:col-span-1">
            <ProfileCard profile={profile} />
          </div>

          {/* Form input sections */}
          <div className="md:col-span-2 space-y-5">
            <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                Credentials Setup
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    className="w-full bg-white/[0.03] disabled:opacity-50 border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={draft.phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    className="w-full bg-white/[0.03] disabled:opacity-50 border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                  Bio / Responsibilities
                </label>
                <textarea
                  disabled={!editing}
                  value={draft.bio}
                  onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                  rows={3}
                  className="w-full bg-white/[0.03] disabled:opacity-50 border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Links configurations */}
            <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                Network Links
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiLinkedin size={15} className="text-slate-500" />
                  <input
                    type="text"
                    disabled={!editing}
                    value={draft.linkedin}
                    onChange={(e) => setDraft({ ...draft, linkedin: e.target.value })}
                    placeholder="LinkedIn Profile URL"
                    className="flex-grow bg-white/[0.03] disabled:opacity-50 border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <FiGlobe size={15} className="text-slate-500" />
                  <input
                    type="text"
                    disabled={!editing}
                    value={draft.website}
                    onChange={(e) => setDraft({ ...draft, website: e.target.value })}
                    placeholder="Personal website URL"
                    className="flex-grow bg-white/[0.03] disabled:opacity-50 border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Security preferences */}
            {!editing && (
              <button
                onClick={() => toast.success('Password update dialog triggered')}
                className="w-full py-2.5 bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 border border-white/5 hover:border-rose-500/20 rounded-xl text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition-all"
              >
                <FiLock size={13} /> Update Access Password
              </button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
