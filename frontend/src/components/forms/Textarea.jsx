import React from 'react';
import clsx from 'clsx';

export const Textarea = React.forwardRef(({
  label,
  error,
  helperText,
  id,
  rows = 4,
  disabled = false,
  required = false,
  className,
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

      {/* Textarea field */}
      <textarea
        id={id}
        ref={ref}
        rows={rows}
        disabled={disabled}
        required={required}
        className={clsx(
          'w-full bg-dark-bg/60 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed text-white placeholder-slate-500 px-4 py-3 resize-y min-h-[80px]',
          // Error states vs normal states
          error
            ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/25 bg-red-950/5'
            : 'border-dark-border focus:border-brand-purple focus:ring-brand-purple/25 hover:border-slate-700'
        )}
        {...props}
      />

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

Textarea.displayName = 'Textarea';
export default Textarea;
