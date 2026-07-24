import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiCalendar, FiCode, FiAward, FiArrowRight, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import Button from '../../components/ui/Button';

export const ChooseRole = () => {
  const [selectedRole, setSelectedRole] = useState('participant');
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      title: 'Administrator',
      desc: 'Manage system parameters, hackers, and challenge events.',
      icon: FiShield,
      badge: 'System Admin'
    },
    {
      id: 'organizer',
      title: 'Organizer',
      desc: 'Create hackathons, review submissions, and manage prizes.',
      icon: FiCalendar,
      badge: 'Host Events'
    },
    {
      id: 'participant',
      title: 'Participant',
      desc: 'Form teams, submit projects, and compete for prizes.',
      icon: FiCode,
      badge: 'Build Code'
    },
    {
      id: 'judge',
      title: 'Judge',
      desc: 'Evaluate submissions, score criteria, and review codebases.',
      icon: FiAward,
      badge: 'Score Entries'
    }
  ];

  const handleContinue = () => {
    toast.success(`Role selected: ${selectedRole.toUpperCase()}`);
    navigate('/profile');
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Select Your Primary Role"
        subtitle="Choose how you will be participating inside the HackVerse platform"
        className="max-w-2xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.id;

              return (
                <motion.div
                  key={r.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole(r.id)}
                  className={`relative p-5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-brand-purple/10 border-brand-purple shadow-lg shadow-brand-purple/15'
                      : 'bg-dark-bg/60 border-dark-border hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                      isSelected
                        ? 'bg-brand-purple text-white border-transparent'
                        : 'bg-slate-900 text-slate-400 border-dark-border'
                    }`}>
                      <Icon size={18} />
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-brand-purple text-white flex items-center justify-center text-xs">
                        <FiCheck size={12} />
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">{r.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 pt-1">
                    {r.badge}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleContinue}
            rightIcon={<FiArrowRight size={14} />}
            className="w-full font-bold uppercase tracking-wider text-xs"
          >
            Continue to Profile Setup
          </Button>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default ChooseRole;
