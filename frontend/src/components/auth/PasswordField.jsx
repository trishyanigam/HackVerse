import React, { useState } from 'react';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import InputField from './InputField';

export const PasswordField = React.forwardRef(({
  label = 'Password',
  id = 'password',
  placeholder = '••••••••',
  error,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputField
      id={id}
      ref={ref}
      label={label}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      error={error}
      leftIcon={<FiLock size={16} />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-slate-400 hover:text-white transition-colors p-1 focus:outline-none cursor-pointer"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      }
      {...props}
    />
  );
});

PasswordField.displayName = 'PasswordField';
export default PasswordField;
