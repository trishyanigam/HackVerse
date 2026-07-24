import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  FiSave, FiUpload, FiGithub, FiExternalLink, FiVideo,
  FiPlus, FiX, FiInfo,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import SubmissionTimeline from '../../components/participant/SubmissionTimeline';
import { registrations } from '../../mock/registrations';

const Submission = () => {
  const [techStack, setTechStack] = useState(['React', 'Node.js']);
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const addTech = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!techStack.includes(techInput.trim())) {
        setTechStack((prev) => [...prev, techInput.trim()]);
      }
      setTechInput('');
    }
  };

  const removeTech = (t) => setTechStack((prev) => prev.filter((item) => item !== t));

  const handleSaveDraft = () => {
    setSaving(true);
    setTimeout(() => {
      toast.success('Draft saved successfully!');
      setSaving(false);
    }, 800);
  };

  const onSubmit = (data) => {
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Project submitted successfully! 🎉');
      setSubmitting(false);
    }, 1500);
  };

  const approvedRegs = registrations.filter((r) => r.status === 'approved');

  return (
    <ParticipantLayout>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Project Submission</h2>
        <p className="text-sm text-slate-500 mt-1">Submit your project for review</p>
      </div>

      {/* Submission Timeline */}
      <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 mb-6">
        <h4 className="text-sm font-semibold text-white mb-4">Submission Progress</h4>
        <div className="overflow-x-auto">
          <SubmissionTimeline currentStep="draft_saved" />
        </div>
      </div>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Hackathon Select */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <h4 className="text-sm font-semibold text-white mb-4">Select Hackathon</h4>
            <select
              {...register('hackathonId', { required: 'Please select a hackathon' })}
              className="w-full bg-[#0a0a0f] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
            >
              <option value="">Choose a hackathon</option>
              {approvedRegs.map((r) => (
                <option key={r.id} value={r.hackathonId}>{r.hackathonTitle} — {r.teamName}</option>
              ))}
            </select>
            {errors.hackathonId && <p className="text-red-400 text-xs mt-1">{errors.hackathonId.message}</p>}
          </motion.div>

          {/* Project Info */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-5">
            <h4 className="text-sm font-semibold text-white">Project Information</h4>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Project Name *</label>
              <input
                {...register('projectName', { required: 'Project name is required' })}
                placeholder="e.g. EcoTrack"
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
              />
              {errors.projectName && <p className="text-red-400 text-xs mt-1">{errors.projectName.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Problem Statement *</label>
              <textarea
                {...register('problemStatement', { required: 'Problem statement is required' })}
                rows={3}
                placeholder="Describe the problem your project solves..."
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all resize-none"
              />
              {errors.problemStatement && <p className="text-red-400 text-xs mt-1">{errors.problemStatement.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Your Solution *</label>
              <textarea
                {...register('solution', { required: 'Solution is required' })}
                rows={3}
                placeholder="Describe your solution approach..."
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all resize-none"
              />
              {errors.solution && <p className="text-red-400 text-xs mt-1">{errors.solution.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Detailed Description</label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder="Provide more details about your implementation, architecture..."
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all resize-none"
              />
            </div>
          </motion.div>

          {/* Links */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-semibold text-white">Links</h4>

            {[
              { name: 'githubUrl', icon: FiGithub, label: 'GitHub Repository URL', placeholder: 'https://github.com/yourteam/project' },
              { name: 'liveDemoUrl', icon: FiExternalLink, label: 'Live Demo URL', placeholder: 'https://your-demo.vercel.app' },
              { name: 'demoVideoUrl', icon: FiVideo, label: 'Demo Video URL', placeholder: 'https://youtube.com/...' },
            ].map(({ name, icon: Icon, label, placeholder }) => (
              <div key={name}>
                <label className="text-sm font-medium text-slate-300 mb-2 block">{label}</label>
                <div className="relative">
                  <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    {...register(name)}
                    type="url"
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Tech Stack */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <h4 className="text-sm font-semibold text-white mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                >
                  {t}
                  <button type="button" onClick={() => removeTech(t)} className="hover:text-red-400 transition-colors">
                    <FiX size={11} />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={addTech}
              placeholder="Type a technology and press Enter..."
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </motion.div>

          {/* File Uploads */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="bg-[#111118] border border-white/5 rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-semibold text-white">Attachments</h4>

            {[
              { label: 'Screenshots', accept: 'image/*', description: 'Upload up to 5 screenshots (PNG, JPG)' },
              { label: 'Presentation PDF', accept: '.pdf', description: 'Upload your project presentation (PDF)' },
            ].map(({ label, accept, description }) => (
              <div key={label}>
                <label className="text-sm font-medium text-slate-300 mb-2 block">{label}</label>
                <label className="flex items-center gap-3 p-4 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition-all group">
                  <FiUpload size={18} className="text-slate-600 group-hover:text-purple-400 transition-colors shrink-0" />
                  <div>
                    <p className="text-sm text-slate-400">{description}</p>
                  </div>
                  <input type="file" accept={accept} multiple={accept === 'image/*'} className="hidden" />
                </label>
              </div>
            ))}
          </motion.div>

          {/* Info Note */}
          <div className="flex gap-3 p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <FiInfo size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              You can save a draft at any time and come back to complete your submission before the deadline.
              Once submitted, you can still edit until the deadline closes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/5 transition-all disabled:opacity-60"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-400 rounded-full animate-spin" />
              ) : (
                <FiSave size={15} />
              )}
              Save Draft
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 disabled:opacity-60 transition-all"
            >
              {submitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FiUpload size={15} />
              )}
              Submit Project
            </button>
          </div>
        </form>
      </div>
    </ParticipantLayout>
  );
};

export default Submission;
