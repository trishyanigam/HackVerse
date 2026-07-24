import React from 'react';
import clsx from 'clsx';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full tracking-wide';
  
  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variants = {
    primary: 'bg-brand-purple/10 text-purple-300 border border-brand-purple/20',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
    info: 'bg-brand-blue/10 text-blue-300 border border-brand-blue/20',
    neutral: 'bg-slate-500/10 text-slate-300 border border-slate-500/20',
  };

  const dotColors = {
    primary: 'bg-brand-purple shadow-[0_0_8px_rgba(139,92,246,0.5)]',
    success: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]',
    warning: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]',
    danger: 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]',
    info: 'bg-brand-blue shadow-[0_0_8px_rgba(59,130,246,0.5)]',
    neutral: 'bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.5)]',
  };

  return (
    <span
      className={clsx(baseClasses, sizes[size], variants[variant], className)}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {/* Pulsing indicator for important statuses */}
          {['success', 'danger', 'primary'].includes(variant) && (
            <span className={clsx(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              variant === 'primary' && 'bg-brand-purple',
              variant === 'success' && 'bg-emerald-400',
              variant === 'danger' && 'bg-red-400'
            )}></span>
          )}
          <span className={clsx("relative inline-flex rounded-full h-2 w-2", dotColors[variant])}></span>
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
