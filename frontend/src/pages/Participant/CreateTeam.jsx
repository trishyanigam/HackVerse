import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiUsers, FiArrowLeft, FiUpload, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ParticipantLayout from '../../layouts/ParticipantLayout';
import { registrations } from '../../mock/registrations';

const CreateTeam = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { maxMembers: 4 },
  });

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      toast.success(`Team "${data.teamName}" created successfully!`);
      setLoading(false);
      navigate('/participant/teams');
    }, 1200);
  };

  return (
    <ParticipantLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/participant/teams')}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <FiArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">Create Team</h2>
          <p className="text-sm text-slate-500">Form a new team for a hackathon</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111118] border border-white/5 rounded-2xl p-6"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Team Name */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Team Name *</label>
              <input
                {...register('teamName', { required: 'Team name is required', minLength: { value: 3, message: 'Min 3 characters' } })}
                placeholder="e.g. ByteBuilders"
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
              />
              {errors.teamName && <p className="text-red-400 text-xs mt-1">{errors.teamName.message}</p>}
            </div>

            {/* Hackathon Select */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Hackathon *</label>
              <select
                {...register('hackathonId', { required: 'Please select a hackathon' })}
                className="w-full bg-[#0a0a0f] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
              >
                <option value="">Select a hackathon</option>
                {registrations
                  .filter((r) => r.status === 'approved' || r.status === 'pending')
                  .map((r) => (
                    <option key={r.id} value={r.hackathonId}>
                      {r.hackathonTitle}
                    </option>
                  ))}
              </select>
              {errors.hackathonId && <p className="text-red-400 text-xs mt-1">{errors.hackathonId.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                placeholder="Describe your team's focus and goals..."
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all resize-none"
              />
            </div>

            {/* Max Members */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Maximum Members
              </label>
              <input
                type="number"
                {...register('maxMembers', {
                  required: true,
                  min: { value: 2, message: 'Min 2 members' },
                  max: { value: 10, message: 'Max 10 members' },
                })}
                min={2}
                max={10}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
              />
              {errors.maxMembers && <p className="text-red-400 text-xs mt-1">{errors.maxMembers.message}</p>}
            </div>

            {/* Team Logo Upload */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Team Logo</label>
              <label className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition-all group">
                <FiUpload size={24} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
                <div className="text-center">
                  <p className="text-sm text-slate-400">Click to upload team logo</p>
                  <p className="text-xs text-slate-600 mt-1">PNG, JPG up to 2MB</p>
                </div>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>

            {/* Info Note */}
            <div className="flex gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <FiInfo size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                After creating your team, you can invite members via email. Your team will be automatically
                linked to the selected hackathon.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/participant/teams')}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-slate-400 bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FiUsers size={15} />
                    Create Team
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </ParticipantLayout>
  );
};

export default CreateTeam;
