import React from 'react';
import clsx from 'clsx';
import { BiLoaderAlt } from 'react-icons/bi';

export const LoadingSpinner = ({
  size = 'md',
  color = 'purple',
  fullPage = false,
  className,
  ...props
}) => {
  const sizes = {
    sm: 'w-5 h-5 text-sm',
    md: 'w-8 h-8 text-xl',
    lg: 'w-12 h-12 text-3xl',
  };

  const colors = {
    purple: 'text-brand-purple',
    blue: 'text-brand-blue',
    white: 'text-white',
  };

  const spinner = (
    <BiLoaderAlt
      className={clsx(
        'animate-spin shrink-0',
        sizes[size],
        colors[color],
        className
      )}
      {...props}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg/85 backdrop-blur-sm gap-3">
        {spinner}
        <span className="text-xs font-medium text-slate-400 animate-pulse tracking-widest uppercase">
          Loading HackVerse...
        </span>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
