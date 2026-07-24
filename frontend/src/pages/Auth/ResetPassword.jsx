import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiKey } from 'react-icons/fi';

import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import PasswordField from '../../components/auth/PasswordField';
import PasswordStrength from '../../components/auth/PasswordStrength';
import Button from '../../components/ui/Button';
import FormFooter from '../../components/auth/FormFooter';
import { resetPasswordSchema } from '../../utils/authSchemas';

export const ResetPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const watchedPassword = useWatch({ control, name: 'password', defaultValue: '' });

  const onSubmit = (data) => {
    toast.success('Your password has been reset successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Reset Password"
        subtitle="Choose a secure new password for your HackVerse account"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <PasswordField
              label="New Password"
              id="password"
              {...register('password')}
              error={errors.password?.message}
              required
            />
            <PasswordStrength password={watchedPassword} />
          </div>

          <PasswordField
            label="Confirm New Password"
            id="confirmPassword"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            leftIcon={<FiKey size={14} />}
            className="w-full font-bold tracking-wider text-xs uppercase"
          >
            Reset Password
          </Button>
        </form>

        <FormFooter
          text="Back to security"
          linkText="Log In"
          linkTo="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default ResetPassword;
