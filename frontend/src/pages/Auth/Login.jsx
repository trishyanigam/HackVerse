import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowRight } from 'react-icons/fi';

import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import EmailField from '../../components/auth/EmailField';
import PasswordField from '../../components/auth/PasswordField';
import RememberMeCheckbox from '../../components/auth/RememberMeCheckbox';
import SocialLoginButtons from '../../components/auth/SocialLoginButtons';
import FormFooter from '../../components/auth/FormFooter';
import Button from '../../components/ui/Button';
import { loginSchema } from '../../utils/authSchemas';

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    // Mock authentication trigger
    toast.success(`Welcome back! Logged in as ${data.email}`);
    setTimeout(() => {
      navigate('/dashboard-demo');
    }, 1000);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to your HackVerse hacker dashboard"
      >
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
          <div className="flex items-center justify-between">
            <RememberMeCheckbox
              {...register('rememberMe')}
            />
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-brand-purple hover:text-purple-300 transition-colors"
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
            className="w-full font-bold tracking-wider text-xs uppercase"
          >
            Log In
          </Button>
        </form>

        {/* Social login buttons */}
        <SocialLoginButtons />

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
