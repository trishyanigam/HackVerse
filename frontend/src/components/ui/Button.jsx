import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { BiLoaderAlt } from 'react-icons/bi';

export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  
  // Base classes for SaaS UI style buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  // Size styles
  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4.5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  // Modern SaaS styling variants matching Purple + Blue branding
  const variants = {
    primary: 'bg-gradient-brand text-white shadow-lg hover:shadow-brand-purple/25 shadow-md border border-transparent focus:ring-brand-purple hover:brightness-110',
    secondary: 'bg-dark-accent hover:bg-slate-800 text-slate-100 border border-dark-border focus:ring-slate-500',
    outline: 'bg-transparent border border-dark-border hover:border-brand-purple/50 text-slate-300 hover:text-white focus:ring-brand-purple/50',
    ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-900 focus:ring-slate-500',
    danger: 'bg-red-600/95 hover:bg-red-600 text-white shadow-lg shadow-red-900/10 focus:ring-red-500',
    success: 'bg-emerald-600/95 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-900/10 focus:ring-emerald-500',
  };

  const buttonClasses = clsx(
    baseClasses,
    sizes[size],
    variants[variant],
    className
  );

  return (
    <motion.button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {isLoading ? (
        <BiLoaderAlt className="animate-spin text-lg" aria-hidden="true" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;
