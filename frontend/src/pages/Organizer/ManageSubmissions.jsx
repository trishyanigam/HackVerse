import React, { useState } from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import SubmissionTable from '../../components/organizer/SubmissionTable';
import SubmissionCard from '../../components/organizer/SubmissionCard';
import SearchBar from '../../components/organizer/SearchBar';
import FilterBar from '../../components/organizer/FilterBar';
import Pagination from '../../components/organizer/Pagination';
import { submissions as initialSubmissions } from '../../mock/submissions';
import toast from 'react-hot-toast';

const SUBMISSION_FILTERS = [
  { label: 'All Submissions', value: 'all' },
  { label: 'Under Review', value: 'under_review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

const ITEMS_PER_PAGE = 4;

const ManageSubmissions = () => {
  const [submissions, setSubmissions] = useState(
    initialSubmissions.map((s, idx) => ({
      ...s,
      assignedJudgeName: idx === 0 ? 'Dr. Aris Thorne' : idx === 1 ? 'Elena Rostova' : null,
    }))
  );

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSub, setSelectedSub] = useState(null);

  // Review Update handler
  const handleReviewSubmit = (id, reviewData) => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          return {
            ...sub,
            score: parseInt(reviewData.score) || null,
            reviewStatus: reviewData.status,
            feedback: reviewData.feedback || '',
          };
        }
        return sub;
      })
    );
    toast.success('Project evaluation successfully updated!');
  };

  // Filter
  const filtered = submissions.filter((sub) => {
    const matchesSearch = sub.projectName.toLowerCase().includes(search.toLowerCase()) ||
                          sub.teamName.toLowerCase().includes(search.toLowerCase()) ||
                          sub.hackathonTitle.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || sub.reviewStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <OrganizerLayout>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Manage Submissions</h2>
        <p className="text-sm text-slate-500 mt-1">Review team project deliverables, check code links, and submit evaluations or scores</p>
      </div>

      {/* Control bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6 bg-[#111118]/50 p-4 rounded-2xl border border-white/5">
        <SearchBar value={search} onChange={(val) => { setSearch(val); setCurrentPage(1); }} placeholder="Search projects, teams or hackathons..." />
        <FilterBar selected={filter} onChange={(val) => { setFilter(val); setCurrentPage(1); }} options={SUBMISSION_FILTERS} />
      </div>

      {/* Table */}
      <SubmissionTable
        submissions={paginated}
        onViewClick={setSelectedSub}
      />

      {/* Pagination */}
      <Pagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Details Card Modal */}
      {selectedSub && (
        <SubmissionCard
          submission={selectedSub}
          onClose={() => setSelectedSub(null)}
          onReviewSubmit={handleReviewSubmit}
        />
      )}
    </OrganizerLayout>
  );
};

export default ManageSubmissions;
