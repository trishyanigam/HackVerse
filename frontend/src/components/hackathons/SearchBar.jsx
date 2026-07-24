import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import Input from '../forms/Input';

export const SearchBar = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search by hackathon title, theme, or category...',
  className
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Input
        id="hackathon-search"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        leftIcon={<FiSearch size={16} />}
        rightIcon={
          value ? (
            <button
              onClick={onClear}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer pointer-events-auto"
              type="button"
              aria-label="Clear search"
            >
              <FiX size={16} />
            </button>
          ) : null
        }
        className="w-full"
      />
    </div>
  );
};

export default SearchBar;
