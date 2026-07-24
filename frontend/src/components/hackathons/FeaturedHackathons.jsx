import React from 'react';
import HackathonCard from './HackathonCard';
import { mockHackathons } from '../../mock/hackathons';

export const FeaturedHackathons = ({ hackathons = mockHackathons }) => {
  const featuredList = hackathons.filter(h => h.featured);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Featured Hackathons
          </h2>
          <p className="text-xs text-slate-400">
            Top global developer competitions with active registration windows and high prize pools.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {featuredList.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedHackathons;
