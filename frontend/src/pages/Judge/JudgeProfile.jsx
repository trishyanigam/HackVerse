import React, { useState } from 'react';
import JudgeLayout from '../../layouts/JudgeLayout';
import { evaluationHistory } from '../../mock/evaluations';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiAward, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const JudgeProfile = () => {
  const { user: authUser } = useAuth();
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: authUser?.name || authUser?.email?.split('@')[0] || 'Judge Evaluator',
    email: authUser?.email || 'judge@hackverse.dev',
    designation: 'Senior Domain Expert & Hackathon Judge',
    organization: 'TechNova Labs',
    linkedin: 'linkedin.com/in/judge',
    expertise: ['Full-Stack Development', 'AI/ML', 'Web3', 'System Design'],
    bio: 'Experienced software engineer with 8+ years in building scalable products. Passionate about open innovation and mentoring developer squads.',
    avatar: null,
    hackathonsJudged: 12,
    totalEvaluations: evaluationHistory.length,
    avgScore: Math.round(evaluationHistory.reduce((a, e) => a + e.score, 0) / evaluationHistory.length),
  });

  const [draft, setDraft] = useState({ ...profile });

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const userInitials = (profile.name
    ? profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
    : 'JD'
  ).toUpperCase();

  const profileStats = [
    { label: 'Hackathons Judged', value: profile.hackathonsJudged },
    { label: 'Projects Evaluated', value: profile.totalEvaluations },
    { label: 'Avg Score Given', value: `${profile.avgScore}%` },
  ];

  return (
    <JudgeLayout>
      <div className="space-y-6 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">My Profile</h2>
            <p className="text-sm text-slate-500 mt-1">Manage your judge profile and preferences.</p>
          </div>
          {!editing ? (
            <button
              onClick={() => {
                setDraft({ ...profile });
                setEditing(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-slate-300 transition-all"
            >
              <FiEdit2 size={14} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-slate-300 transition-all"
              >
                <FiX size={14} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 rounded-xl text-sm font-bold text-white transition-all shadow-lg"
              >
                <FiSave size={14} /> Save
              </button>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111118] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-lg">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0 space-y-3">
            {editing ? (
              <>
                <input
                  type="text"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/40 transition-all"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={draft.designation}
                  onChange={(e) => setDraft({ ...draft, designation: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-purple-500/40 transition-all"
                  placeholder="Designation"
                />
                <input
                  type="text"
                  value={draft.organization}
                  onChange={(e) => setDraft({ ...draft, organization: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-purple-500/40 transition-all"
                  placeholder="Organization"
                />
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                <p className="text-sm text-slate-400">{profile.designation}</p>
                <p className="text-sm text-slate-500">{profile.organization}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <FiMail size={12} /> {profile.email}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <FiLinkedin size={12} /> {profile.linkedin}
                  </span>
                </div>
              </>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4">
          {profileStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-[#111118] border border-white/5 rounded-2xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-3">
          <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider">Bio</h4>
          {editing ? (
            <textarea
              value={draft.bio}
              onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
              rows={4}
              className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-500/40 resize-none transition-all"
            />
          ) : (
            <p className="text-sm text-slate-300 leading-relaxed">{profile.bio}</p>
          )}
        </div>

        <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-3">
          <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider flex items-center gap-2">
            <FiAward size={13} /> Areas of Expertise
          </h4>
          <div className="flex flex-wrap gap-2">
            {profile.expertise.map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-xl text-xs font-semibold">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </JudgeLayout>
  );
};

export default JudgeProfile;
