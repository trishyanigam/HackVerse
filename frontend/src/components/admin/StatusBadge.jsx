import React from 'react';

const statusMap = {
  // User statuses
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  blocked: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  suspended: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  
  // Hackathon statuses
  upcoming: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  completed: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  cancelled: 'bg-slate-500/10 text-slate-400 border-slate-500/20',

  // Submission statuses
  reviewed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  unassigned: 'bg-rose-500/10 text-rose-400 border-rose-500/20',

  // Team submission statuses
  submitted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  not_submitted: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const labels = {
  active: 'Active',
  blocked: 'Blocked',
  suspended: 'Suspended',
  upcoming: 'Upcoming',
  completed: 'Completed',
  cancelled: 'Cancelled',
  reviewed: 'Reviewed',
  pending: 'Pending',
  unassigned: 'Unassigned',
  submitted: 'Submitted',
  not_submitted: 'Not Submitted',
};

const StatusBadge = ({ status }) => {
  const normalized = (status || '').toLowerCase();
  const classes = statusMap[normalized] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  const label = labels[normalized] || status;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${classes}`}>
      <span className="w-1 h-1 rounded-full bg-current mr-1.5 shrink-0" />
      {label}
    </span>
  );
};

export default StatusBadge;
