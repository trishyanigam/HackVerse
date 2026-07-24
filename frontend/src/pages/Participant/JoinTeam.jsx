import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiUsers, FiArrowLeft, FiUserPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import { availableTeams } from '../../mock/teams';

const JoinTeam = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [requested, setRequested] = useState([]);

  const filtered = availableTeams.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.hackathon.toLowerCase().includes(search.toLowerCase())
  );

  const handleRequest = (teamId, teamName) => {
    setRequested((prev) => [...prev, teamId]);
    toast.success(`Join request sent to ${teamName}`);
  };

  return (
    <ParticipantLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/participant/teams')}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <FiArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">Join a Team</h2>
          <p className="text-sm text-slate-500">Browse available teams looking for members</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Search by team name or hackathon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all max-w-xl"
        />
      </div>

      {/* Team List */}
      <div className="space-y-4 max-w-3xl">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-600">
            <FiUsers size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No teams found matching your search.</p>
          </div>
        ) : (
          filtered.map((team, i) => {
            const hasRequested = requested.includes(team.id);
            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#111118] border border-white/5 rounded-2xl p-5 hover:border-purple-500/20 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-sm shrink-0">
                      {team.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{team.name}</h3>
                      <p className="text-xs text-purple-400 mb-2">{team.hackathon}</p>
                      <p className="text-sm text-slate-400 leading-relaxed mb-3">{team.description}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {team.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <FiUsers size={12} className="text-purple-400" />
                          {team.members}/{team.maxMembers} members
                        </div>
                        <span className="text-emerald-400 font-medium">
                          {team.openSlots} slot{team.openSlots !== 1 ? 's' : ''} open
                        </span>
                        <span>Leader: {team.leader}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {hasRequested ? (
                      <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20">
                        Request Sent
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRequest(team.id, team.name)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
                      >
                        <FiUserPlus size={13} />
                        Request to Join
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </ParticipantLayout>
  );
};

export default JoinTeam;
