import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiTarget, FiGlobe, FiUsers } from 'react-icons/fi';
import PageContainer from '../components/ui/PageContainer';
import Card from '../components/ui/Card';
import StatisticsSection from '../components/hero/StatisticsSection';
import SponsorsSection from '../components/shared/SponsorsSection';

export const About = () => {
  const values = [
    { title: 'Open Innovation', desc: 'Democratizing access to global software competitions regardless of geography.', icon: FiGlobe },
    { title: 'Fair Evaluation', desc: 'Standardized grading grids ensuring projects are judged purely on merit and code execution.', icon: FiCheckCircle },
    { title: 'Developer Growth', desc: 'Connecting builders with industry mentorship, grants, and career pipelines.', icon: FiTarget },
    { title: 'Community Driven', desc: 'Fostering collaborative hacking squads and pair programming networks.', icon: FiUsers }
  ];

  return (
    <PageContainer
      title="About HackVerse"
      description="Learn about our mission to empower global developers to build production-ready applications."
      className="space-y-12"
    >
      {/* Mission Banner */}
      <Card className="p-8 relative overflow-hidden bg-gradient-to-r from-dark-card via-slate-900 to-dark-card border-dark-border/60">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gradient">
            Our Mission
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Accelerating global software talent through seamless hackathon experiences.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            HackVerse was created to eliminate administrative friction in tech hackathons. We provide modern SaaS workflows that allow organizers to launch challenges in minutes and empower hackers to focus on what matters most: building software.
          </p>
        </div>
      </Card>

      {/* Values Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white tracking-tight">Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
              >
                <Card className="h-full space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-brand-purple flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <StatisticsSection />

      {/* Sponsors */}
      <SponsorsSection />
    </PageContainer>
  );
};

export default About;
