import React, { useState } from 'react';
import { 
  FiGrid, FiUsers, FiClock, FiCheckSquare, FiPlus, 
  FiArrowUpRight, FiSearch, FiSliders, FiEye, FiEdit3, 
  FiTrash2, FiExternalLink 
} from 'react-icons/fi';

import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import PageContainer from '../components/ui/PageContainer';
import Input from '../components/forms/Input';
import Select from '../components/forms/Select';
import SkeletonLoader from '../components/feedback/SkeletonLoader';

export const DashboardDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trackFilter, setTrackFilter] = useState('all');
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  // Stats cards mockup
  const stats = [
    { title: 'Registered Hacker', count: '1,248', growth: '+12%', subtitle: 'active accounts', icon: FiUsers, color: 'purple' },
    { title: 'Active submissions', count: '312', growth: '+18%', subtitle: 'teams in pipeline', icon: FiGrid, color: 'blue' },
    { title: 'Time Remaining', count: '36 hrs', growth: 'Phase 2', subtitle: 'deadline: July 26', icon: FiClock, color: 'purple' },
    { title: 'Reviews Completed', count: '89 / 312', growth: '28%', subtitle: 'evaluations', icon: FiCheckSquare, color: 'blue' },
  ];

  // Hackathon submissions mockup data
  const submissions = [
    { id: '1', project: 'NeuralFlow', team: 'DeepMinds', track: 'AI & Analytics', members: 4, status: 'success', statusText: 'Verified' },
    { id: '2', project: 'EtherWallet Lite', team: 'Web3 Builders', track: 'Blockchain', members: 2, status: 'warning', statusText: 'In Review' },
    { id: '3', project: 'FitTrack IoT', team: 'Health Hackers', track: 'Internet of Things', members: 3, status: 'primary', statusText: 'Draft' },
    { id: '4', project: 'CodeCraft IDE', team: 'Vim Masters', track: 'Developer Tools', members: 1, status: 'success', statusText: 'Verified' },
    { id: '5', project: 'SmartAgri Sensors', team: 'Green Fields', track: 'Internet of Things', members: 4, status: 'danger', statusText: 'Action Req' },
  ];

  // Filter submissions
  const filteredSubmissions = submissions.filter(item => {
    const matchesSearch = item.project.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrack = trackFilter === 'all' || item.track.toLowerCase().includes(trackFilter.toLowerCase());
    return matchesSearch && matchesTrack;
  });

  const handleRefreshStats = () => {
    setIsDemoLoading(true);
    setTimeout(() => {
      setIsDemoLoading(false);
    }, 1200);
  };

  return (
    <PageContainer
      title="HackVerse Admin Panel"
      description="Monitor registrations, manage project review pipelines, and examine statistics for Summer Hackathon 2026."
      headerActions={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshStats}
          >
            Refresh Pipeline
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<FiPlus />}
          >
            Add New Submission
          </Button>
        </>
      }
    >
      {/* 4x Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="relative overflow-hidden">
              {isDemoLoading ? (
                <div className="space-y-3">
                  <SkeletonLoader variant="title" width="30%" className="h-3 my-0" />
                  <SkeletonLoader variant="rectangular" height="30px" className="rounded-md" />
                  <SkeletonLoader variant="text" width="60%" className="h-2 my-0" />
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {stat.count}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {stat.growth}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {stat.subtitle}
                      </span>
                    </div>
                  </div>
                  
                  {/* Glowing Icon Container */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border shadow-inner ${
                    stat.color === 'purple' 
                      ? 'bg-brand-purple/10 border-brand-purple/20 text-brand-purple'
                      : 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue'
                  }`}>
                    <Icon size={20} />
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Main Table Card Layout */}
      <Card
        title="Active Submission Review Pipeline"
        subtitle="Manage developer hackathon submissions, view track filters, and check team size limits."
        headerActions={
          <div className="flex items-center gap-3">
            <Input
              id="search-proj"
              placeholder="Search project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<FiSearch size={14} />}
              className="w-48 sm:w-56 shrink-0 py-0"
            />
            <Select
              id="filter-track"
              options={[
                { value: 'all', label: 'All tracks' },
                { value: 'ai', label: 'AI Category' },
                { value: 'blockchain', label: 'Blockchain' },
                { value: 'iot', label: 'IoT Category' }
              ]}
              value={trackFilter}
              onChange={(e) => setTrackFilter(e.target.value)}
              className="w-36 shrink-0"
            />
          </div>
        }
      >
        {isDemoLoading ? (
          <div className="space-y-4 py-4">
            <SkeletonLoader variant="rectangular" height="40px" />
            <SkeletonLoader variant="rectangular" height="40px" />
            <SkeletonLoader variant="rectangular" height="40px" />
            <SkeletonLoader variant="rectangular" height="40px" />
          </div>
        ) : filteredSubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-dark-border/40 text-slate-400 text-xs font-semibold">
                  <th className="pb-3.5 pl-2">Project Name</th>
                  <th className="pb-3.5">Hacker Team</th>
                  <th className="pb-3.5">Track Category</th>
                  <th className="pb-3.5">Members</th>
                  <th className="pb-3.5 text-center">Status</th>
                  <th className="pb-3.5 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/20 text-slate-300 text-xs">
                {filteredSubmissions.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-900/30 transition-colors">
                    {/* Project */}
                    <td className="py-4 pl-2 font-semibold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-purple" />
                      {row.project}
                    </td>
                    
                    {/* Team */}
                    <td className="py-4 font-medium">{row.team}</td>
                    
                    {/* Track */}
                    <td className="py-4">
                      <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-dark-border text-slate-400 font-medium">
                        {row.track}
                      </span>
                    </td>
                    
                    {/* Members */}
                    <td className="py-4 font-bold text-slate-400">{row.members} Hacker</td>
                    
                    {/* Status */}
                    <td className="py-4 text-center">
                      <Badge variant={row.status} size="sm" dot>
                        {row.statusText}
                      </Badge>
                    </td>
                    
                    {/* Actions */}
                    <td className="py-4 text-right pr-2">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-slate-400 hover:text-white"
                          onClick={() => alert(`View Project ${row.project}`)}
                          aria-label="View Details"
                        >
                          <FiEye size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-slate-400 hover:text-white"
                          onClick={() => alert(`Edit Project ${row.project}`)}
                          aria-label="Edit Details"
                        >
                          <FiEdit3 size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-slate-400 hover:text-red-400"
                          onClick={() => alert(`Delete Project ${row.project}`)}
                          aria-label="Delete Submission"
                        >
                          <FiTrash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10">
            <p className="text-center text-xs text-slate-400">
              No review submissions match your search parameters.
            </p>
          </div>
        )}
      </Card>
    </PageContainer>
  );
};

export default DashboardDemo;
