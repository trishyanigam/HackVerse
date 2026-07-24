import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiUserPlus, FiEdit2, FiLogOut, FiUsers,
  FiCalendar, FiClock, FiMail,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import MemberCard from '../../components/participant/MemberCard';
import InviteMemberModal from '../../components/participant/InviteMemberModal';
import RegistrationStatusBadge from '../../components/participant/RegistrationStatusBadge';
import { myTeams } from '../../mock/teams';

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inviteOpen, setInviteOpen] = useState(false);

  const team = myTeams.find((t) => t.id === id) || myTeams[0];

  const handleRemoveMember = (memberId) => {
    toast.success('Member removed from team');
  };

  const handleLeaveTeam = () => {
    toast.error('Left team successfully');
    navigate('/participant/teams');
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
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">{team.name}</h2>
          <p className="text-sm text-slate-500">{team.hackathon}</p>
        </div>
        <div className="flex gap-2">
          {team.isLeader && (
            <button
              onClick={() => setInviteOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all"
            >
              <FiUserPlus size={14} />
              Invite Member
            </button>
          )}
          {team.isLeader ? (
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-300 bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
              <FiEdit2 size={14} />
              Edit Team
            </button>
          ) : (
            <button
              onClick={handleLeaveTeam}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 transition-all"
            >
              <FiLogOut size={14} />
              Leave Team
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Team Info */}
        <div className="space-y-5">
          {/* Team Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                {team.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">{team.name}</h3>
                <RegistrationStatusBadge status={team.status} />
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">{team.description}</p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <FiCalendar size={14} className="text-purple-400 shrink-0" />
                <span className="text-slate-500">Created</span>
                <span className="text-slate-300 ml-auto">
                  {new Date(team.createdAt).toLocaleDateString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiUsers size={14} className="text-blue-400 shrink-0" />
                <span className="text-slate-500">Members</span>
                <span className="text-slate-300 ml-auto">
                  {team.members.length}/{team.maxMembers}
                </span>
              </div>
            </div>

            {/* Capacity Bar */}
            <div className="mt-4">
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(team.members.length / team.maxMembers) * 100}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Pending Invites */}
          {team.pendingInvites.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#111118] border border-amber-500/20 rounded-2xl p-5"
            >
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <FiClock size={14} className="text-amber-400" />
                Pending Invites
              </h4>
              {team.pendingInvites.map((invite) => (
                <div key={invite.id} className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-semibold">
                    {invite.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm text-white">{invite.name}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <FiMail size={10} />
                      {invite.email}
                    </div>
                  </div>
                  <span className="ml-auto text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400">
                    Pending
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right: Members List */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-2xl p-5"
        >
          <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <FiUsers size={15} className="text-purple-400" />
            Team Members ({team.members.length})
          </h4>
          <div>
            {team.members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                isLeader={team.isLeader}
                onRemove={handleRemoveMember}
              />
            ))}
          </div>

          {team.members.length < team.maxMembers && team.isLeader && (
            <button
              onClick={() => setInviteOpen(true)}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm text-slate-500 border border-dashed border-white/10 hover:border-purple-500/30 hover:text-purple-400 transition-all"
            >
              <FiUserPlus size={15} />
              Invite more members ({team.maxMembers - team.members.length} slots open)
            </button>
          )}
        </motion.div>
      </div>

      <InviteMemberModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
        teamName={team.name}
      />
    </ParticipantLayout>
  );
};

export default TeamDetails;
