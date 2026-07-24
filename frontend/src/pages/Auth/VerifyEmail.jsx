import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import Button from '../../components/ui/Button';

export const VerifyEmail = () => {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    setVerified(true);
    toast.success('Email verified successfully! Account is active.');
  };

  return (
    <AuthLayout>
      <AuthCard
        title={verified ? 'Email Verified!' : 'Verify Your Email'}
        subtitle={
          verified
            ? 'Your account has been fully activated.'
            : 'We sent a verification link to your email address.'
        }
      >
        <div className="text-center space-y-6 py-2">
          {/* Vector Icon */}
          <div className="w-16 h-16 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple mx-auto flex items-center justify-center">
            {verified ? (
              <FiCheckCircle size={32} className="text-emerald-400" />
            ) : (
              <FiMail size={32} className="animate-bounce text-brand-purple" />
            )}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
            {verified
              ? 'Thank you for verifying your address. You can now access all hackathons and squad options.'
              : 'Click the button below to simulate completing email verification.'}
          </p>

          {verified ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/dashboard-demo')}
              rightIcon={<FiArrowRight size={14} />}
              className="w-full font-bold uppercase tracking-wider text-xs"
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleVerify}
              className="w-full font-bold uppercase tracking-wider text-xs"
            >
              Verify Email Address
            </Button>
          )}
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default VerifyEmail;
