import React from 'react';
import PageContainer from '../components/ui/PageContainer';
import FAQAccordion from '../components/faq/FAQAccordion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { FiHelpCircle } from 'react-icons/fi';

export const FAQ = () => {
  return (
    <PageContainer
      title="Frequently Asked Questions"
      description="Find answers to common questions about registrations, submission guidelines, team matching, and prize pools."
      className="space-y-12"
    >
      <FAQAccordion />

      {/* Still Have Questions CTA */}
      <Card className="text-center p-8 max-w-xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple mx-auto flex items-center justify-center">
          <FiHelpCircle size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">Still have questions?</h3>
          <p className="text-xs text-slate-400">
            Can't find the answer you are looking for? Contact our support team directly.
          </p>
        </div>
        <Link to="/contact">
          <Button variant="primary" size="sm">
            Contact Support
          </Button>
        </Link>
      </Card>
    </PageContainer>
  );
};

export default FAQ;
