import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiGithub } from 'react-icons/fi';
import Button from '../ui/Button';

export const SocialLoginButtons = ({ onGoogleClick, onGithubClick }) => {
  return (
    <div className="space-y-3 w-full">
      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-dark-border/60 w-full" />
        <span className="bg-dark-card px-3 text-[10px] uppercase font-bold text-slate-500 tracking-widest absolute">
          Or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onGoogleClick || (() => alert('Google Social Auth clicked'))}
          leftIcon={<FcGoogle size={16} />}
          className="w-full text-xs font-semibold"
        >
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onGithubClick || (() => alert('GitHub Social Auth clicked'))}
          leftIcon={<FiGithub size={16} />}
          className="w-full text-xs font-semibold"
        >
          GitHub
        </Button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
