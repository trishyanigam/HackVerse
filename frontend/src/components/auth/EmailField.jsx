import React from 'react';
import { FiMail } from 'react-icons/fi';
import InputField from './InputField';

export const EmailField = React.forwardRef(({
  label = 'Email Address',
  id = 'email',
  placeholder = 'name@company.com',
  error,
  ...props
}, ref) => {
  return (
    <InputField
      id={id}
      ref={ref}
      label={label}
      type="email"
      placeholder={placeholder}
      error={error}
      leftIcon={<FiMail size={16} />}
      {...props}
    />
  );
});

EmailField.displayName = 'EmailField';
export default EmailField;
