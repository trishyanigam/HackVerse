import React from 'react';
import clsx from 'clsx';

export const RememberMeCheckbox = React.forwardRef(({
  label = 'Remember me for 30 days',
  id = 'rememberMe',
  error,
  className,
  ...props
}, ref) => {
  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <label htmlFor={id} className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 select-none">
        <input
          id={id}
          ref={ref}
          type="checkbox"
          className="w-4 h-4 rounded border-dark-border bg-dark-bg text-brand-purple focus:ring-brand-purple/25 focus:ring-2 accent-brand-purple cursor-pointer"
          {...props}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p className="text-[11px] text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
});

RememberMeCheckbox.displayName = 'RememberMeCheckbox';
export default RememberMeCheckbox;
