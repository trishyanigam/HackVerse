import React from 'react';
import clsx from 'clsx';
import { FiChevronDown } from 'react-icons/fi';

export const Select = React.forwardRef(({
  label,
  options = [],
  error,
  helperText,
  id,
  disabled = false,
  required = false,
  className,
  children,
  ...props
}, ref) => {
  return (
    <div className={clsx('w-full flex flex-col gap-1.5', className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-slate-300 flex items-center gap-0.5"
        >
          {label}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}

      {/* Select container wrapper */}
      <div className="relative flex items-center">
        <select
          id={id}
          ref={ref}
          disabled={disabled}
          required={required}
          className={clsx(
            'w-full bg-dark-bg/60 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed text-white placeholder-slate-500 pl-4 pr-10 py-2.5 appearance-none cursor-pointer',
            // Error states vs normal states
            error
              ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/25 bg-red-950/5'
              : 'border-dark-border focus:border-brand-purple focus:ring-brand-purple/25 hover:border-slate-700'
          )}
          {...props}
        >
          {/* Support children options or list options */}
          {children ? (
            children
          ) : (
            options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-dark-card text-white py-2"
              >
                {option.label}
              </option>
            ))
          )}
        </select>

        {/* Custom Chevron Indicator */}
        <span className="absolute right-3.5 text-slate-400 pointer-events-none flex items-center justify-center shrink-0">
          <FiChevronDown size={16} />
        </span>
      </div>

      {/* Helper text or validation error message */}
      {error ? (
        <p className="text-[11px] text-red-400 font-medium" id={`${id}-error`}>
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500" id={`${id}-helper`}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
