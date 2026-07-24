import React from 'react';
import { FiShield, FiUser, FiMail, FiTrash2 } from 'react-icons/fi';
import { BiCrown } from 'react-icons/bi';

const roleIcon = {
  Leader: BiCrown,
  Admin: FiShield,
};

const MemberCard = ({ member, isLeader: userIsLeader, onRemove }) => {
  const { name, email, role, skills, status, isLeader } = member;

  const RoleIcon = roleIcon[role] || FiUser;

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-500/20 flex items-center justify-center text-purple-300 font-semibold text-sm">
          {name.slice(0, 1)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-white">{name}</span>
            {isLeader && <BiCrown size={12} className="text-amber-400" />}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
            <FiMail size={11} />
            <span>{email}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex gap-1.5 flex-wrap">
          {skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5"
            >
              {skill}
            </span>
          ))}
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            role === 'Leader'
              ? 'bg-amber-500/10 text-amber-400'
              : 'bg-blue-500/10 text-blue-400'
          }`}
        >
          {role}
        </span>
        {userIsLeader && !isLeader && onRemove && (
          <button
            onClick={() => onRemove(member.id)}
            className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all"
          >
            <FiTrash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
