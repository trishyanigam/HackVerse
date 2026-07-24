import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiClock, FiSend, FiMessageSquare } from 'react-icons/fi';
import PageContainer from '../components/ui/PageContainer';
import Card from '../components/ui/Card';
import Input from '../components/forms/Input';
import Textarea from '../components/forms/Textarea';
import Button from '../components/ui/Button';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageContainer
      title="Contact Support & Partnerships"
      description="Have questions about hosting a hackathon or submitting a team project? Get in touch with our team."
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side Details */}
        <div className="space-y-6 lg:col-span-1">
          <Card title="Direct Info" subtitle="Our global response hubs">
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <FiMail size={16} className="text-brand-purple shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">General Inquiries</h4>
                  <p className="text-slate-400">support@hackverse.io</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin size={16} className="text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Headquarters</h4>
                  <p className="text-slate-400">San Francisco, CA & Virtual Global Hubs</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiClock size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">SLA Response Time</h4>
                  <p className="text-slate-400">Under 6 hours for active event inquiries</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side Contact Form */}
        <div className="lg:col-span-2">
          <Card title="Send Message" subtitle="Fill out the form below and we will respond immediately.">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <FiSend size={20} />
                </div>
                <h3 className="text-base font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out. A team member has received your note and will get back to you shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                  className="mt-2"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Full Name"
                    id="contact-name"
                    placeholder="e.g. Sarah Connor"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email Address"
                    id="contact-email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <Input
                  label="Subject Header"
                  id="contact-subject"
                  placeholder="e.g. Hackathon Sponsorship Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />

                <Textarea
                  label="Detailed Message"
                  id="contact-msg"
                  rows={5}
                  placeholder="Write your note or question here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  leftIcon={<FiSend size={14} />}
                >
                  Submit Inquiry
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Contact;
