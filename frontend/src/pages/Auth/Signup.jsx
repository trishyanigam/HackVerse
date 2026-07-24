import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiUser, FiArrowRight } from 'react-icons/fi';

import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import InputField from '../../components/auth/InputField';
import EmailField from '../../components/auth/EmailField';
import PasswordField from '../../components/auth/PasswordField';
import PasswordStrength from '../../components/auth/PasswordStrength';
import RoleSelector from '../../components/auth/RoleSelector';
import RememberMeCheckbox from '../../components/auth/RememberMeCheckbox';
import FormFooter from '../../components/auth/FormFooter';
import Button from '../../components/ui/Button';
import { signupSchema } from '../../utils/authSchemas';

export const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      terms: false,
    },
  });

  // Watch password field to update real-time password strength meter
  const watchedPassword = useWatch({ control, name: 'password', defaultValue: '' });

  const onSubmit = (data) => {
    toast.success(`Account created successfully for ${data.name}!`);
    setTimeout(() => {
      navigate('/choose-role');
    }, 1000);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Create Your Account"
        subtitle="Join HackVerse to build, compete, and connect"
        className="max-w-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <InputField
            label="Full Name"
            id="name"
            placeholder="e.g. Trishya Nigam"
            leftIcon={<FiUser size={16} />}
            {...register('name')}
            error={errors.name?.message}
            required
          />

          {/* Email Address */}
          <EmailField
            {...register('email')}
            error={errors.email?.message}
            required
          />

          {/* Role Selection */}
          <RoleSelector
            {...register('role')}
            error={errors.role?.message}
            required
          />

          {/* Password */}
          <div className="space-y-1">
            <PasswordField
              label="Password"
              id="password"
              {...register('password')}
              error={errors.password?.message}
              required
            />
            <PasswordStrength password={watchedPassword} />
          </div>

          {/* Confirm Password */}
          <PasswordField
            label="Confirm Password"
            id="confirmPassword"
            placeholder="••••••••"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            required
          />

          {/* Terms & Conditions Checkbox */}
          <RememberMeCheckbox
            id="terms"
            label="I agree to the HackVerse Terms of Service & Privacy Policy"
            {...register('terms')}
            error={errors.terms?.message}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            rightIcon={<FiArrowRight size={14} />}
            className="w-full font-bold tracking-wider text-xs uppercase"
          >
            Create Account
          </Button>
        </form>

        <FormFooter
          text="Already have an account?"
          linkText="Log In"
          linkTo="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;
