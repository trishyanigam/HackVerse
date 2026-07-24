import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiCalendar, FiDollarSign, FiUsers, FiMapPin, FiShield, 
  FiCheckCircle, FiAward, FiArrowLeft, FiClock, FiShare2 
} from 'react-icons/fi';

import PageContainer from '../components/ui/PageContainer';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/forms/Input';
import { mockHackathons } from '../mock/hackathons';

export const HackathonDetails = () => {
  const { id } = useParams();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  // Find hackathon item by ID or default to first mock hackathon
  const hackathon = mockHackathons.find((item) => item.id === id) || mockHackathons[0];

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisteredSuccess(true);
  };

  return (
    <PageContainer className="space-y-8">
      {/* Back button */}
      <div>
        <Link to="/hackathons">
          <Button variant="ghost" size="sm" leftIcon={<FiArrowLeft />}>
            Back to Hackathons
          </Button>
        </Link>
      </div>

      {/* Banner & Hero Header Card */}
      <Card className="p-0 overflow-hidden relative">
        <div className="relative h-64 sm:h-80 w-full bg-slate-900">
          <img
            src={hackathon.banner}
            alt={hackathon.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/60 to-transparent" />

          {/* Banner Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="primary">{hackathon.category}</Badge>
            <Badge variant="success">{hackathon.status.toUpperCase()}</Badge>
          </div>
        </div>

        {/* Header content overlay */}
        <div className="p-6 sm:p-8 space-y-6 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {hackathon.title}
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {hackathon.tagline}
              </p>
              <p className="text-xs text-slate-400">
                Organized by <span className="text-white font-semibold">{hackathon.organizer}</span>
              </p>
            </div>

            {/* CTA Button */}
            <div className="shrink-0 flex items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setRegisteredSuccess(false);
                  setIsRegisterOpen(true);
                }}
              >
                Register for Challenge
              </Button>
            </div>
          </div>

          {/* Parameter Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-dark-border/40 pt-6 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <FiDollarSign className="text-emerald-400" /> Prize Pool
              </span>
              <p className="text-base font-bold text-emerald-400">{hackathon.prizePool}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <FiUsers className="text-brand-blue" /> Team Size
              </span>
              <p className="text-base font-bold text-white">{hackathon.teamSize}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <FiMapPin className="text-purple-400" /> Venue
              </span>
              <p className="text-base font-bold text-white">{hackathon.venue}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <FiCalendar className="text-amber-400" /> Registrations
              </span>
              <p className="text-base font-bold text-white">{hackathon.registrations} Joined</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Details Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Overview, Rules, Criteria */}
        <div className="lg:col-span-2 space-y-8">
          {/* Theme & Description */}
          <Card title="Challenge Theme & Overview">
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p className="font-semibold text-white bg-slate-900 p-3.5 rounded-lg border border-dark-border/40">
                Primary Theme: <span className="text-gradient">{hackathon.theme}</span>
              </p>
              <p>{hackathon.description}</p>
            </div>
          </Card>

          {/* Rules & Guidelines */}
          <Card title="Official Rules & Eligibility">
            <ul className="space-y-3 text-xs text-slate-300">
              {hackathon.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <FiCheckCircle size={16} className="text-brand-purple shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Judging Criteria */}
          <Card title="Judging & Evaluation Criteria">
            <div className="space-y-4">
              {hackathon.judgingCriteria.map((item, idx) => (
                <div key={idx} className="p-4 bg-dark-bg/60 rounded-lg border border-dark-border/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{item.criteria}</h4>
                    <span className="text-xs font-bold text-gradient">{item.weight} Weight</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Side: Timeline & Summary */}
        <div className="space-y-6 lg:col-span-1">
          {/* Timeline Milestones */}
          <Card title="Event Timeline">
            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-dark-border">
              {hackathon.timeline.milestones.map((m, idx) => (
                <div key={idx} className="relative pl-8 space-y-1">
                  <span className="absolute left-1.5 top-1 h-3 w-3 rounded-full bg-brand-purple border-2 border-dark-card -translate-x-1/2" />
                  <h4 className="text-xs font-bold text-white">{m.title}</h4>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <FiClock size={12} /> {m.date}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Organizer Card */}
          <Card title="Organizer Details">
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-white">{hackathon.organizer}</p>
              <p className="text-slate-400">
                Verified host platform operating hackathons on HackVerse.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Registration Modal UI */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title={`Register for ${hackathon.title}`}
        size="md"
      >
        {registeredSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <FiCheckCircle size={28} />
            </div>
            <h3 className="text-base font-bold text-white">Registration Confirmed!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Your hacker account has been registered for this event. Check your dashboard for kickoff details.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsRegisterOpen(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <Input
              label="Team or Solo Name"
              id="reg-team-name"
              placeholder="e.g. DeepMinds Squad"
              required
            />
            <Input
              label="Contact Email"
              id="reg-email"
              type="email"
              placeholder="hacker@domain.com"
              required
            />
            <Input
              label="GitHub Profile URL"
              id="reg-github"
              placeholder="https://github.com/username"
              required
            />

            <div className="pt-3 flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRegisterOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Confirm Registration
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </PageContainer>
  );
};

export default HackathonDetails;
