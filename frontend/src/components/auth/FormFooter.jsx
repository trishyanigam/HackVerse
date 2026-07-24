import React from 'react';
import { Link } from 'react-router-dom';

export const FormFooter = ({
  text = 'Already have an account?',
  linkText = 'Log In',
  linkTo = '/login'
}) => {
  return (
    <p className="text-center text-xs text-slate-400 pt-2">
      {text}{' '}
      <Link
        to={linkTo}
        className="font-bold text-brand-purple hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
};

export default FormFooter;
