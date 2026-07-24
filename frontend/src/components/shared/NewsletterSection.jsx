import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import Input from '../forms/Input';
import Button from '../ui/Button';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid developer email address.');
      setSuccess(false);
    } else {
      setError('');
      setSuccess(true);
      setEmail('');
    }
  };

  return (
    <section className="relative rounded-2xl overflow-hidden glass-panel border border-dark-border py-12 px-6 sm:px-12 max-w-4xl mx-auto shadow-2xl">
      <div className="absolute inset-0 bg-gradient-brand blur-3xl opacity-5 rounded-full -z-10" />

      <div className="max-w-2xl mx-auto text-center space-y-6 flex flex-col items-center">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Never Miss a Deadline
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Subscribe to our weekly hacker digests. Get notified about upcoming prize pools, developer tracks, and mentor workshops.
          </p>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold"
          >
            🎉 Thank you for subscribing! Your address has been added to our developer newsletter list.
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col sm:flex-row items-stretch sm:items-start gap-3"
          >
            <div className="flex-1">
              <Input
                id="newsletter-email"
                type="email"
                placeholder="developer@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                className="py-0"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={<FiSend size={14} />}
              className="shrink-0"
            >
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
