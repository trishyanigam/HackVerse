import React, { useState } from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import JudgeCard from '../../components/organizer/JudgeCard';
import JudgeAssignmentModal from '../../components/organizer/JudgeAssignmentModal';
import SearchBar from '../../components/organizer/SearchBar';
import FilterBar from '../../components/organizer/FilterBar';
import { mockJudges } from '../../mock/judges';
import toast from 'react-hot-toast';

const EXPERTISE_FILTERS = [
  { label: 'All Expertise', value: 'all' },
  { label: 'Generative AI', value: 'Generative AI' },
  { label: 'Smart Contracts', value: 'Smart Contracts' },
  { label: 'UI/UX Design', value: 'UI/UX Design' },
  { label: 'IoT Telemetry', value: 'IoT Telemetry' },
];

const AssignJudges = () => {
  const [judges, setJudges] = useState(mockJudges);
  const [search, setSearch] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Assign Handler
  const handleAssignProject = (judgeId, project) => {
    setJudges((prev) =>
      prev.map((judge) => {
        if (judge.id === judgeId) {
          const nextList = [
            ...(judge.assignedProjectsList || []),
            { id: project.id, name: project.projectName, team: project.teamName }
          ];
          return {
            ...judge,
            projectsAssigned: nextList.length,
            assignedProjectsList: nextList
          };
        }
        return judge;
      })
    );
    toast.success(`Project "${project.projectName}" successfully assigned to judge!`);
  };

  const handleOpenAssignModal = (judge) => {
    setSelectedJudge(judge);
    setModalOpen(true);
  };

  // Filter
  const filtered = judges.filter((j) => {
    const matchesSearch = j.name.toLowerCase().includes(search.toLowerCase()) ||
                          j.email.toLowerCase().includes(search.toLowerCase());
    const matchesExpertise = expertiseFilter === 'all' || j.expertise.includes(expertiseFilter);
    return matchesSearch && matchesExpertise;
  });

  return (
    <OrganizerLayout>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Assign Judges</h2>
        <p className="text-sm text-slate-500 mt-1">Allocate project submissions to subject matter expert judges for review and scoring</p>
      </div>

      {/* Control bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6 bg-[#111118]/50 p-4 rounded-2xl border border-white/5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search judges by name or email..." />
        <FilterBar selected={expertiseFilter} onChange={setExpertiseFilter} options={EXPERTISE_FILTERS} />
      </div>

      {/* Judges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((judge, idx) => (
          <JudgeCard
            key={judge.id}
            judge={judge}
            index={idx}
            onAssignClick={handleOpenAssignModal}
          />
        ))}
      </div>

      {/* Assignment Modal */}
      <JudgeAssignmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        judge={selectedJudge}
        onAssign={handleAssignProject}
      />
    </OrganizerLayout>
  );
};

export default AssignJudges;
