import React from 'react';
import Select from '../forms/Select';

export const RoleSelector = React.forwardRef(({
  label = 'Select Account Role',
  id = 'role',
  error,
  ...props
}, ref) => {
  const options = [
    { value: '', label: '-- Choose a role --' },
    { value: 'participant', label: 'Hacker / Participant' },
    { value: 'organizer', label: 'Hackathon Organizer' },
    { value: 'judge', label: 'Judge / Evaluator' },
    { value: 'admin', label: 'Administrator' }
  ];

  return (
    <Select
      id={id}
      ref={ref}
      label={label}
      options={options}
      error={error}
      {...props}
    />
  );
});

RoleSelector.displayName = 'RoleSelector';
export default RoleSelector;
