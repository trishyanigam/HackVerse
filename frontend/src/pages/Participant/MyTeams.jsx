import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiUsers, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import TeamCard from '../../components/participant/TeamCard';
import { myTeams } from '../../mock/teams';

const MyTeams = () => {
  const navigate = useNavigate();

  return (
    <ParticipantLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">My Teams</h2>
          <p className="text-sm text-slate-500 mt-1">Teams you are part of across hackathons</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/participant/team/join')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            <FiUsers size={15} />
            Join Team
          </button>
          <button
            onClick={() => navigate('/participant/team/create')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
          >
            <FiPlus size={15} />
            Create Team
          </button>
        </div>
      </div>

      {myTeams.length === 0 ? (
        <div className="text-center py-20">
          <FiUsers size={40} className="mx-auto text-slate-700 mb-4" />
          <p className="text-slate-500 text-sm">You are not part of any team yet.</p>
          <button
            onClick={() => navigate('/participant/team/create')}
            className="mt-4 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
          >
            Create your first team
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myTeams.map((team, i) => (
            <TeamCard key={team.id} team={team} index={i} />
          ))}
        </div>
      )}
    </ParticipantLayout>
  );
};

export default MyTeams;
