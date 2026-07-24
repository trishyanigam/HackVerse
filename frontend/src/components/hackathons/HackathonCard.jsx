import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiDollarSign, FiCalendar, FiMapPin, FiArrowRight } from 'react-icons/fi';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export const HackathonCard = ({ hackathon }) => {
  if (!hackathon) return null;

  const {
    id,
    title,
    tagline,
    banner,
    status,
    prizePool,
    registrations,
    venue,
    category,
    teamSize
  } = hackathon;

  const statusVariants = {
    ongoing: { variant: 'success', text: 'Live Now', dot: true },
    upcoming: { variant: 'info', text: 'Registration Open', dot: false },
    completed: { variant: 'neutral', text: 'Completed', dot: false }
  };

  const statusConfig = statusVariants[status] || statusVariants.upcoming;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        hoverable
        className="h-full flex flex-col justify-between p-0 overflow-hidden group"
      >
        <div>
          {/* Banner Header Image with overlay */}
          <div className="relative h-44 w-full overflow-hidden bg-slate-900">
            <img
              src={banner}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/40 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <Badge variant={statusConfig.variant} size="sm" dot={statusConfig.dot}>
                {statusConfig.text}
              </Badge>
              <span className="text-[10px] font-bold text-white bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                {category}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 space-y-3.5">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white group-hover:text-brand-purple transition-colors line-clamp-1">
                {title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {tagline}
              </p>
            </div>

            {/* Data Pills */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-dark-bg/60 p-2 rounded-lg border border-dark-border/40">
                <FiDollarSign className="text-emerald-400 shrink-0" size={14} />
                <span className="font-semibold text-white truncate">{prizePool}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-dark-bg/60 p-2 rounded-lg border border-dark-border/40">
                <FiUsers className="text-brand-blue shrink-0" size={14} />
                <span className="font-semibold text-slate-300 truncate">{registrations} Hackers</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <FiMapPin size={12} className="text-slate-500" />
                <span className="truncate max-w-[120px]">{venue}</span>
              </span>
              <span className="font-medium text-slate-500">{teamSize}</span>
            </div>
          </div>
        </div>

        {/* Footer Action Button */}
        <div className="p-5 pt-0">
          <Link to={`/hackathons/${id}`}>
            <Button
              variant="outline"
              size="sm"
              rightIcon={<FiArrowRight size={14} />}
              className="w-full group-hover:border-brand-purple/50 group-hover:bg-brand-purple/10"
            >
              View Challenge Details
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default HackathonCard;
