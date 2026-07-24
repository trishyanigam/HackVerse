import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JudgeLayout from '../../layouts/JudgeLayout';
import ProjectOverviewCard from '../../components/judge/ProjectOverviewCard';
import EvaluationTimeline from '../../components/judge/EvaluationTimeline';
import { getProjectDetails } from '../../mock/projectDetails';
import { assignedProjects } from '../../mock/assignedProjects';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClipboard } from 'react-icons/fi';

const timelineEvents = [
  { id: 1, title: 'Project Submitted', description: 'The team made their final submission.', completed: true, timestamp: '2026-07-20T18:30:00Z' },
  { id: 2, title: 'Assigned for Review', description: 'This project was assigned to you for evaluation.', completed: true, timestamp: '2026-07-21T09:00:00Z' },
  { id: 3, title: 'Review In Progress', description: 'You have started reviewing this project.', completed: false, timestamp: null },
  { id: 4, title: 'Evaluation Submitted', description: 'Final scores and feedback submitted.', completed: false, timestamp: null },
];

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectDetails(id);
  const meta = assignedProjects.find((p) => p.id === id) || assignedProjects[0];

  const enriched = {
    ...project,
    status: meta?.status || 'pending',
    teamSize: project?.members?.length || 2,
    submissionDate: meta?.submissionDate || '2026-07-20',
    category: 'Open Innovation',
    description: project?.description || '',
    githubUrl: project?.githubUrl,
    liveUrl: project?.liveDemoUrl,
  };

  return (
    <JudgeLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/judge/projects')}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <FiArrowLeft size={16} /> Back to Projects
        </motion.button>

        {/* Banner */}
        {meta?.banner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-48 rounded-2xl overflow-hidden relative"
          >
            <img src={meta.banner} alt={enriched.projectName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-5">
            <ProjectOverviewCard project={enriched} />

            {/* Team Members */}
            {project?.members && (
              <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white mb-4">Team Members</h3>
                <div className="space-y-3">
                  {project.members.map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{m.name}</p>
                        <p className="text-xs text-slate-500">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problem & Solution */}
            {project?.problemStatement && (
              <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-4">
                <div>
                  <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1.5">Problem Statement</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{project.problemStatement}</p>
                </div>
                {project.solution && (
                  <div>
                    <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1.5">Solution</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar — Timeline & CTA */}
          <div className="space-y-5">
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-4">Review Progress</h3>
              <EvaluationTimeline events={timelineEvents} />
            </div>
            <button
              onClick={() => navigate(`/judge/evaluate/${id || 'sub001'}`)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 rounded-xl text-sm font-bold text-white transition-all shadow-lg"
            >
              <FiClipboard size={15} /> Start Evaluation
            </button>
          </div>
        </div>
      </div>
    </JudgeLayout>
  );
};

export default ProjectDetails;
