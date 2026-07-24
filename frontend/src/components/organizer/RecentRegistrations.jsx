import React from 'react';
import { FiUsers } from 'react-icons/fi';
import RegistrationStatusBadge from '../participant/RegistrationStatusBadge';

const RecentRegistrations = ({ registrations }) => {
  return (
    <div className="space-y-3.5">
      {registrations.slice(0, 4).map((reg) => (
        <div
          key={reg.id}
          className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/15 transition-all"
        >
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{reg.teamName}</h4>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">Leader: {reg.leader}</p>
            <p className="text-[9px] text-purple-400 font-semibold uppercase tracking-wider truncate mt-0.5">{reg.hackathon}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <FiUsers size={11} className="text-slate-600" />
              {reg.members}
            </span>
            <RegistrationStatusBadge status={reg.status} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentRegistrations;
