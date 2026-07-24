import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const Card = ({
  title,
  subtitle,
  headerActions,
  footer,
  hoverable = false,
  onClick,
  children,
  className,
  ...props
}) => {
  const isInteractive = onClick || hoverable;

  const cardClasses = clsx(
    'glass-panel rounded-xl overflow-hidden shadow-xl border border-dark-border',
    isInteractive && 'glass-panel-hover cursor-pointer',
    className
  );

  const content = (
    <>
      {/* Header section */}
      {(title || subtitle || headerActions) && (
        <div className="px-6 py-5 border-b border-dark-border/40 flex items-center justify-between gap-4">
          <div className="space-y-1">
            {title && (
              <h3 className="text-base font-semibold text-white tracking-wide">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
          {headerActions && (
            <div className="flex items-center gap-2 shrink-0">
              {headerActions}
            </div>
          )}
        </div>
      )}

      {/* Main Content Body */}
      <div className="p-6 text-sm text-slate-300">
        {children}
      </div>

      {/* Footer section */}
      {footer && (
        <div className="px-6 py-4 bg-dark-card/50 border-t border-dark-border/30 flex items-center justify-between text-xs text-slate-400">
          {footer}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        whileHover={{ y: -3, scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} {...props}>
      {content}
    </div>
  );
};

export default Card;
