import React from 'react';
import clsx from 'clsx';
import { FiInbox } from 'react-icons/fi';

export const EmptyState = ({
  title = 'No data available',
  description = 'There are no items to display at this time.',
  icon,
  action,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'glass-panel border border-dark-border/40 rounded-xl px-6 py-12 flex flex-col items-center justify-center text-center gap-4.5 max-w-lg mx-auto shadow-xl',
        className
      )}
      {...props}
    >
      {/* Icon Wrapper */}
      <div className="w-14 h-14 rounded-full bg-slate-900 border border-dark-border flex items-center justify-center text-slate-400 shadow-inner">
        {icon ? (
          <span className="text-2xl">{icon}</span>
        ) : (
          <FiInbox size={26} />
        )}
      </div>

      {/* Texts */}
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-white tracking-wide">
          {title}
        </h3>
        <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Optional CTA Button */}
      {action && (
        <div className="pt-1.5 animate-pulse-slow">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
