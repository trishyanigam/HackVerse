import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiZap, FiAward, FiUsers } from 'react-icons/fi';
import PageContainer from '../../components/ui/PageContainer';
import Card from '../../components/ui/Card';
import HeroSection from '../../components/hero/HeroSection';
import FeaturedHackathons from '../../components/hackathons/FeaturedHackathons';
import UpcomingEvents from '../../components/hackathons/UpcomingEvents';
import CategorySection from '../../components/hero/CategorySection';
import StatisticsSection from '../../components/hero/StatisticsSection';
import TestimonialsSection from '../../components/shared/TestimonialsSection';
import SponsorsSection from '../../components/shared/SponsorsSection';
import NewsletterSection from '../../components/shared/NewsletterSection';

export const Home = () => {
  const whyParticipateList = [
    {
      title: 'Global Mentorship',
      desc: 'Connect with core developers and engineers from top Web3, AI, and Cloud companies during 1-on-1 office hours.',
      icon: FiUsers
    },
    {
      title: 'Instant API Credits & Grants',
      desc: 'Access sponsor credits and infrastructure grants to deploy high-throughput products without financial barriers.',
      icon: FiZap
    },
    {
      title: 'Verifiable Proof of Hack',
      desc: 'Build a verifiable digital resume of hackathon submissions, leaderboard rankings, and project codebases.',
      icon: FiCode
    },
    {
      title: '$250,000+ Prize Pools',
      desc: 'Compete for cash rewards, incubation grants, and VC accelerator track entries.',
      icon: FiAward
    }
  ];

  return (
    <PageContainer className="space-y-20 py-6">
      {/* Hero Header */}
      <HeroSection />

      {/* Featured Challenges */}
      <FeaturedHackathons />

      {/* Upcoming Event Timelines */}
      <UpcomingEvents />

      {/* Categories & Tracks */}
      <CategorySection />

      {/* Platform Statistics */}
      <StatisticsSection />

      {/* Why Participate Section */}
      <section className="space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Why Build on HackVerse?
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Everything you need to turn a weekend project into a venture-backed startup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {whyParticipateList.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col justify-between p-6">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/20 text-brand-blue flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Sponsors Grid */}
      <SponsorsSection />

      {/* Newsletter Digest */}
      <NewsletterSection />
    </PageContainer>
  );
};

export default Home;
