import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const PageContainer = ({
  title,
  description,
  headerActions,
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={clsx('w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6', className)}
      {...props}
    >
      {/* Header section with page title & optional CTAs */}
      {(title || description || headerActions) && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-dark-border/40">
          <div className="space-y-1.5">
            {title && (
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {headerActions && (
            <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
              {headerActions}
            </div>
          )}
        </div>
      )}

      {/* Main Container Content */}
      <div className="w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default PageContainer;
