import React from 'react';
import { FiFilter, FiRotateCcw } from 'react-icons/fi';
import Card from '../ui/Card';
import Select from '../forms/Select';
import Button from '../ui/Button';

export const FilterSidebar = ({
  selectedCategory = 'all',
  selectedStatus = 'all',
  onCategoryChange,
  onStatusChange,
  onReset,
  className
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Track Categories' },
    { value: 'AI & Analytics', label: 'AI & Machine Learning' },
    { value: 'Blockchain', label: 'Blockchain & DeFi' },
    { value: 'Internet of Things', label: 'Internet of Things' },
    { value: 'Developer Tools', label: 'Developer Tools' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'ongoing', label: 'Live Now' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <Card
      title="Filter Hackathons"
      headerActions={
        <FiFilter size={16} className="text-brand-purple" />
      }
      className={className}
    >
      <div className="space-y-5">
        {/* Category track selection */}
        <Select
          label="Track Category"
          id="filter-category-select"
          options={categoryOptions}
          value={selectedCategory}
          onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
        />

        {/* Status filter selection */}
        <Select
          label="Event Status"
          id="filter-status-select"
          options={statusOptions}
          value={selectedStatus}
          onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
        />

        {/* Reset button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          leftIcon={<FiRotateCcw size={12} />}
          className="w-full text-xs"
        >
          Reset Filters
        </Button>
      </div>
    </Card>
  );
};

export default FilterSidebar;
