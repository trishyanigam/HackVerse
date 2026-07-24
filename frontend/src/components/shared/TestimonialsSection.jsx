import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import Card from '../ui/Card';
import { mockTestimonials } from '../../mock/testimonials';

export const TestimonialsSection = ({ testimonials = mockTestimonials }) => {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Hear From Our Hackers
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          See how developers around the world leverage HackVerse to build products and team up.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {testimonials.map((test, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col justify-between">
              {/* Ratings */}
              <div className="flex items-center gap-1 text-amber-400 mb-3.5">
                {Array.from({ length: test.rating }).map((_, i) => (
                  <FiStar key={i} size={14} className="fill-amber-400" />
                ))}
              </div>

              {/* Feedback text */}
              <p className="text-xs text-slate-300 italic leading-relaxed mb-6">
                "{test.feedback}"
              </p>

              {/* Avatar Summary */}
              <div className="flex items-center gap-3 border-t border-dark-border/40 pt-4.5">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-700 shadow-inner"
                />
                <div>
                  <h4 className="text-xs font-semibold text-white">{test.name}</h4>
                  <p className="text-[10px] text-slate-400">{test.role}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
