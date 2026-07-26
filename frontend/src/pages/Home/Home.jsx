import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiShield, 
  FiCalendar, 
  FiCode, 
  FiAward, 
  FiZap, 
  FiCheckCircle, 
  FiLayers, 
  FiCpu, 
  FiDatabase, 
  FiLock,
  FiFileText,
  FiGrid,
  FiArrowRight
} from 'react-icons/fi';
import PageContainer from '../../components/ui/PageContainer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import HeroSection from '../../components/hero/HeroSection';
import FeaturedHackathons from '../../components/hackathons/FeaturedHackathons';
import UpcomingEvents from '../../components/hackathons/UpcomingEvents';
import StatisticsSection from '../../components/hero/StatisticsSection';
import TestimonialsSection from '../../components/shared/TestimonialsSection';
import SponsorsSection from '../../components/shared/SponsorsSection';

export const Home = () => {
  const navigate = useNavigate();

  // Problem statement comparison items from PDF
  const problemComparison = [
    { old: 'Google Forms for Registration', new: 'Unified Dedicated Registration Portal' },
    { old: 'WhatsApp & Email Invites', new: 'Systematic Team Invites & Code Generation' },
    { old: 'Excel Sheets for Scoring', new: 'Automated 7-Criteria Judge Evaluation Engine' },
    { old: 'Google Drive for Submissions', new: 'Structured Project Submission (GitHub, PDF, Video)' },
    { old: 'Manual Score Calculations', new: 'Live Leaderboard with Timestamp Tie-Breakers' },
    { old: 'Manual Certificate Design', new: 'Automated PDFKit Verified Certificate Issuance' },
  ];

  // 4 User Roles breakdown from PDF
  const userRoles = [
    {
      title: 'Administrator',
      roleKey: 'admin',
      desc: 'Platform owner with full system control, user management, and audit tracking.',
      icon: FiShield,
      color: 'emerald',
      badge: 'Platform Owner',
      permissions: [
        'View & edit all platform users',
        'Block / unblock suspicious accounts',
        'Manage hackathons, teams & submissions',
        'System analytics & audit log tracking',
      ],
    },
    {
      title: 'Organizer',
      roleKey: 'organizer',
      desc: 'Host events, configure dates, criteria, manage teams, assign judges, publish results.',
      icon: FiCalendar,
      color: 'blue',
      badge: 'Event Creator',
      permissions: [
        'Create & manage custom hackathons',
        'Open / close registrations',
        'Approve or reject team applications',
        'Assign judges & publish official leaderboards',
      ],
    },
    {
      title: 'Participant',
      roleKey: 'participant',
      desc: 'Discover challenges, form or join teams, submit projects, and track rankings.',
      icon: FiCode,
      color: 'purple',
      badge: 'Hacker Squad',
      permissions: [
        'Register for active hackathons',
        'Create teams & invite members via code',
        'Submit codebases, live demos & slide decks',
        'View live rankings & download PDF certificates',
      ],
    },
    {
      title: 'Judge',
      roleKey: 'judge',
      desc: 'Evaluate assigned projects across 7 criteria with structured feedback.',
      icon: FiAward,
      color: 'amber',
      badge: 'Domain Evaluator',
      permissions: [
        'View assigned team submissions',
        'Score 7 criteria (Innovation, UI/UX, etc.)',
        'Provide constructive evaluator feedback',
        'Review codebases & live preview links',
      ],
    },
  ];

  // Tech Stack details from PDF
  const techStack = [
    { name: 'MongoDB', category: 'Database', desc: 'Mongoose ODM, Document Collections, Compound Indexing', icon: FiDatabase },
    { name: 'Express.js', category: 'Backend Framework', desc: 'RESTful API Routing, Controllers, Middlewares', icon: FiCpu },
    { name: 'React.js', category: 'Frontend Library', desc: 'Vite, React Router DOM, Framer Motion, Context', icon: FiGrid },
    { name: 'Node.js', category: 'Runtime Environment', desc: 'Async/Await, Node-Cron, PDFKit, Nodemailer', icon: FiZap },
    { name: 'JWT & bcrypt', category: 'Security & Auth', desc: 'Token Rotation, Password Hashing, Protected Routes', icon: FiLock },
    { name: 'Tailwind CSS', category: 'Styling Architecture', desc: 'Responsive Design System & Custom UI Tokens', icon: FiLayers },
  ];

  return (
    <PageContainer className="space-y-24 py-6">
      {/* Hero Header with Search & Get Started CTA */}
      <HeroSection />

      {/* Project Overview & Problem Statement Section */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-semibold text-brand-purple">
            Capstone Project Specifications
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Centralized Solution for Modern Hackathons
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminating chaos by consolidating registration, team formation, project submissions, judging, and result publication into one seamless web application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Problem Statement Card */}
          <Card className="p-8 space-y-4 border-rose-500/20 bg-rose-950/10">
            <div className="flex items-center gap-3 text-rose-400 font-bold text-base">
              <span className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">❌</span>
              Traditional Scattered Hackathons
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              College hackathons rely on multiple disconnected tools (Google Forms, WhatsApp, Excel Sheets, Email, Google Drive), leading to lost submissions and delayed results.
            </p>
            <div className="space-y-2.5 pt-2">
              {problemComparison.map((item, idx) => (
                <div key={idx} className="flex items-center text-xs text-slate-400 gap-2">
                  <span className="text-rose-400 text-xs">✕</span>
                  <span>{item.old}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Solution Statement Card */}
          <Card className="p-8 space-y-4 border-emerald-500/20 bg-emerald-950/10">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-base">
              <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">✨</span>
              HackVerse Centralized Ecosystem
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              One unified MERN stack application providing role-based workflows for Administrators, Organizers, Participants, and Judges.
            </p>
            <div className="space-y-2.5 pt-2">
              {problemComparison.map((item, idx) => (
                <div key={idx} className="flex items-center text-xs text-slate-200 gap-2 font-medium">
                  <FiCheckCircle className="text-emerald-400 text-xs shrink-0" />
                  <span>{item.new}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Hackathons Listing */}
      <FeaturedHackathons />

      {/* Upcoming Hackathon Events & Timeline */}
      <UpcomingEvents />

      {/* 4 User Roles & Permissions Breakdown */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Designed for Every Stakeholder
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Role-based authentication & permissions tailored to each user type.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userRoles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full flex flex-col justify-between p-6 space-y-5 border-slate-800 hover:border-brand-purple/40">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-white">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                        {role.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white">{role.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{role.desc}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Permissions</p>
                      {role.permissions.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="text-brand-purple mt-0.5">•</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/login?role=${role.roleKey}`)}
                    className="w-full text-xs font-semibold mt-4"
                  >
                    Login as {role.title}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Technology Stack & Architecture Details */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Built with MERN Stack Architecture
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Production-grade full-stack architecture adhering to enterprise standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <Card key={idx} className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-purple shrink-0">
                  <Icon size={22} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{tech.category}</span>
                  <h3 className="text-base font-bold text-white">{tech.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{tech.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Platform Statistics */}
      <StatisticsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Sponsors Grid */}
      <SponsorsSection />

      {/* Bottom Get Started Call To Action Banner */}
      <Card className="p-10 sm:p-14 bg-gradient-to-r from-brand-purple/20 via-slate-900 to-brand-blue/20 border-brand-purple/30 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ready to Host or Compete on HackVerse?
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Create your account today to start organizing hackathons, forming hacker teams, and building production-ready projects.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/login')}
            rightIcon={<FiArrowRight size={18} />}
            className="px-8 py-3.5 text-sm font-bold shadow-xl shadow-brand-purple/25"
          >
            Get Started Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/signup')}
            className="px-8 py-3.5 text-sm font-semibold border-slate-700"
          >
            Sign Up Free
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Home;
