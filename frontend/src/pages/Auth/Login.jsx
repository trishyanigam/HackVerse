import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowRight, FiUserCheck, FiCode, FiAward, FiShield } from 'react-icons/fi';

import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import EmailField from '../../components/auth/EmailField';
import PasswordField from '../../components/auth/PasswordField';
import RememberMeCheckbox from '../../components/auth/RememberMeCheckbox';
import FormFooter from '../../components/auth/FormFooter';
import Button from '../../components/ui/Button';
import { loginSchema } from '../../utils/authSchemas';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState(roleParam || 'participant');

  useEffect(() => {
    if (roleParam) {
      setSelectedRole(roleParam.toLowerCase());
    }
  }, [roleParam]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const getRoleDashboardRoute = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return '/admin/dashboard';
      case 'organizer':
        return '/organizer/dashboard';
      case 'judge':
        return '/judge/dashboard';
      case 'participant':
      default:
        return '/participant/dashboard';
    }
  };

  const onSubmit = (data) => {
    login({ email: data.email, role: selectedRole });
    const targetRoute = getRoleDashboardRoute(selectedRole);
    toast.success(`Welcome back! Logging in as ${selectedRole.toUpperCase()}...`);
    setTimeout(() => {
      navigate(targetRoute);
    }, 600);
  };

  const handleQuickRoleLogin = (roleKey) => {
    setSelectedRole(roleKey);
    const mockEmail = `${roleKey}@hackverse.com`;
    setValue('email', mockEmail);
    setValue('password', 'Password123!');
    login({ email: mockEmail, role: roleKey });
    const targetRoute = getRoleDashboardRoute(roleKey);
    toast.success(`Authenticated as ${roleKey.toUpperCase()} portal...`);
    setTimeout(() => {
      navigate(targetRoute);
    }, 500);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back to HackVerse"
        subtitle="Sign in to access your role-based hackathon portal"
        className="max-w-lg"
      >
        {/* Role Quick Selector Tabs */}
        <div className="space-y-2 mb-6">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
            Select Role Portal
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => handleQuickRoleLogin('participant')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                selectedRole === 'participant'
                  ? 'bg-brand-purple/20 border-brand-purple text-white shadow-lg shadow-brand-purple/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <FiCode size={14} className="text-brand-purple" />
              <span>Participant</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRoleLogin('organizer')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                selectedRole === 'organizer'
                  ? 'bg-brand-blue/20 border-brand-blue text-white shadow-lg shadow-brand-blue/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <FiUserCheck size={14} className="text-brand-blue" />
              <span>Organizer</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRoleLogin('judge')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                selectedRole === 'judge'
                  ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <FiAward size={14} className="text-amber-400" />
              <span>Judge</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRoleLogin('admin')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                selectedRole === 'admin'
                  ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <FiShield size={14} className="text-emerald-400" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email input */}
          <EmailField
            {...register('email')}
            error={errors.email?.message}
          />

          {/* Password input */}
          <PasswordField
            {...register('password')}
            error={errors.password?.message}
          />

          {/* Remember me & Forgot Password links */}
          <div className="flex items-center justify-between text-xs">
            <RememberMeCheckbox
              {...register('rememberMe')}
            />
            <Link
              to="/forgot-password"
              className="font-semibold text-brand-purple hover:text-purple-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            rightIcon={<FiArrowRight size={14} />}
            className="w-full font-bold tracking-wider text-xs uppercase py-3"
          >
            Log In to {selectedRole.toUpperCase()} Dashboard
          </Button>
        </form>

        {/* Form switcher footer */}
        <FormFooter
          text="Don't have an account?"
          linkText="Sign Up"
          linkTo="/signup"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
