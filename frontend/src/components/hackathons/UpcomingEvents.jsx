import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiArrowRight } from 'react-icons/fi';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { mockHackathons } from '../../mock/hackathons';

export const UpcomingEvents = ({ hackathons = mockHackathons }) => {
  const upcomingList = hackathons.filter(h => h.status === 'upcoming');

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Upcoming Hackathon Timelines
        </h2>
        <p className="text-xs text-slate-400">
          Mark your calendars for upcoming developer sprints starting this month.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        {upcomingList.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:border-brand-purple/40">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left side details */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-dark-border flex flex-col items-center justify-center shrink-0 text-slate-300">
                    <FiCalendar size={20} className="text-brand-purple" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">
                        {item.title}
                      </h3>
                      <Badge variant="info" size="sm">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 max-w-xl">
                      {item.tagline}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <FiClock size={12} className="text-brand-blue" />
                        Starts: {item.timeline.start}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin size={12} />
                        {item.venue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side CTA */}
                <div className="shrink-0">
                  <Link to={`/hackathons/${item.id}`}>
                    <Button
                      variant="secondary"
                      size="sm"
                      rightIcon={<FiArrowRight size={14} />}
                    >
                      Pre-Register
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
