import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageContainer from '../components/ui/PageContainer';
import SearchBar from '../components/hackathons/SearchBar';
import FilterSidebar from '../components/hackathons/FilterSidebar';
import HackathonCard from '../components/hackathons/HackathonCard';
import Pagination from '../components/shared/Pagination';
import EmptyState from '../components/feedback/EmptyState';
import { mockHackathons } from '../mock/hackathons';

export const Hackathons = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync query params if passed in URL
  useEffect(() => {
    if (initialSearch) setSearchTerm(initialSearch);
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialSearch, initialCategory]);

  // Filter hackathons
  const filteredHackathons = mockHackathons.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase() ||
      item.id === selectedCategory;

    const matchesStatus =
      selectedStatus === 'all' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Reset filter state
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setCurrentPage(1);
  };

  return (
    <PageContainer
      title="Hackathon Listing Workspace"
      description="Explore active, upcoming, and completed developer hackathons."
      className="space-y-6"
    >
      {/* Top Search Header */}
      <div className="w-full">
        <SearchBar
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          onClear={() => setSearchTerm('')}
        />
      </div>

      {/* Main Workspace Grid: Sidebar + Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={(val) => {
              setSelectedCategory(val);
              setCurrentPage(1);
            }}
            onStatusChange={(val) => {
              setSelectedStatus(val);
              setCurrentPage(1);
            }}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Cards List Grid */}
        <div className="lg:col-span-3 space-y-6">
          {filteredHackathons.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHackathons.map((hackathon) => (
                  <HackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={1}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </>
          ) : (
            <EmptyState
              title="No Matching Hackathons Found"
              description="No challenge tracks match your active search terms or filters. Try clearing your parameters."
              action={
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-brand-purple hover:underline"
                >
                  Reset All Filters
                </button>
              }
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Hackathons;
