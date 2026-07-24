import React from 'react';
import clsx from 'clsx';

export const InputField = React.forwardRef(({
  label,
  error,
  helperText,
  id,
  type = 'text',
  leftIcon,
  rightIcon,
  disabled = false,
  required = false,
  className,
  ...props
}, ref) => {
  return (
    <div className={clsx('w-full flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-slate-300 flex items-center justify-between"
        >
          <span className="flex items-center gap-0.5">
            {label}
            {required && <span className="text-red-400 font-bold">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center shrink-0">
            {leftIcon}
          </span>
        )}

        <input
          id={id}
          ref={ref}
          type={type}
          disabled={disabled}
          className={clsx(
            'w-full bg-dark-bg/80 border rounded-xl text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed text-white placeholder-slate-500 py-2.5',
            leftIcon ? 'pl-10' : 'pl-4',
            rightIcon ? 'pr-10' : 'pr-4',
            error
              ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/25 bg-red-950/10'
              : 'border-dark-border focus:border-brand-purple focus:ring-brand-purple/25 hover:border-slate-700'
          )}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3.5 flex items-center justify-center shrink-0">
            {rightIcon}
          </span>
        )}
      </div>

      {error ? (
        <p className="text-[11px] text-red-400 font-medium tracking-wide">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
});

InputField.displayName = 'InputField';
export default InputField;
