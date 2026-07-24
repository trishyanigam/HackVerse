import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail, FiCheckCircle } from 'react-icons/fi';

import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import EmailField from '../../components/auth/EmailField';
import Button from '../../components/ui/Button';
import FormFooter from '../../components/auth/FormFooter';
import { forgotPasswordSchema } from '../../utils/authSchemas';

export const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const [targetEmail, setTargetEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data) => {
    setTargetEmail(data.email);
    setSubmitted(true);
    toast.success('Password reset instructions sent!');
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Forgot Password?"
        subtitle="Enter your email to receive password reset instructions"
      >
        {submitted ? (
          <div className="text-center space-y-4 py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <FiCheckCircle size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Check Your Inbox</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We have dispatched a password reset token to{' '}
                <span className="text-white font-semibold">{targetEmail}</span>.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSubmitted(false)}
              className="w-full text-xs"
            >
              Try Another Email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <EmailField
              {...register('email')}
              error={errors.email?.message}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              className="w-full font-bold tracking-wider text-xs uppercase"
            >
              Send Reset Link
            </Button>
          </form>
        )}

        <FormFooter
          text="Remembered your password?"
          linkText="Log In"
          linkTo="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPassword;
