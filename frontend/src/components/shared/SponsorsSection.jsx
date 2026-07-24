import React from 'react';
import { motion } from 'framer-motion';

export const SponsorsSection = () => {
  // Mock sponsor branding logos using stylish SVG placeholders or text representations
  const sponsors = [
    { name: 'Cerebral AI Lab', tier: 'Gold Sponsor' },
    { name: 'Ethereum Builders Fund', tier: 'Gold Sponsor' },
    { name: 'Vercel Deployment Cloud', tier: 'Silver Sponsor' },
    { name: 'GitHub Sponsors API', tier: 'Silver Sponsor' },
    { name: 'HealthTech Labs Inc', tier: 'Bronze Sponsor' },
    { name: 'SensorNodes DevKits', tier: 'Bronze Sponsor' }
  ];

  return (
    <section className="space-y-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Backed by Leading Tech Teams
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Our events are sponsored by platforms who provide prize pools, developer credits, and mentorship.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4">
        {sponsors.map((sp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            className="glass-panel border border-dark-border/40 hover:border-brand-purple/40 rounded-xl p-5 flex flex-col items-center justify-center text-center gap-1.5 shadow-md transition-all duration-200 cursor-pointer"
          >
            {/* Mock Logo placeholder */}
            <span className="text-xs font-black tracking-widest text-slate-300 uppercase">
              {sp.name.split(' ')[0]}
            </span>
            <span className="text-[9px] font-bold text-gradient uppercase tracking-widest">
              {sp.tier.split(' ')[0]}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SponsorsSection;
