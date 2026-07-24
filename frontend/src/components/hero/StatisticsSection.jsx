import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { mockStatistics } from '../../mock/statistics';

export const StatisticsSection = ({ statistics = mockStatistics }) => {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statistics.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <Card className="text-center p-6 flex flex-col items-center justify-center gap-1.5 h-full relative overflow-hidden">
              {/* Subtle background gradient glow */}
              <div className="absolute inset-0 bg-gradient-brand/5 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              <h3 className="text-3xl font-black text-white tracking-tight text-gradient">
                {stat.value}
              </h3>
              <p className="text-xs font-semibold text-slate-300">
                {stat.label}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">
                {stat.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
