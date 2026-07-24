import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const AuthCard = ({
  title,
  subtitle,
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={clsx(
        'w-full max-w-md glass-panel border border-dark-border/60 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6',
        className
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="text-center space-y-1.5">
          {title && (
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div>{children}</div>
    </motion.div>
  );
};

export default AuthCard;
