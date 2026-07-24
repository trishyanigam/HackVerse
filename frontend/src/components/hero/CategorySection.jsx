import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'react-icons/fi';
import Card from '../ui/Card';
import { mockCategories } from '../../mock/categories';

export const CategorySection = ({ categories = mockCategories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    // Redirect to hackathon list page filtering by track/category
    navigate(`/hackathons?category=${encodeURIComponent(id)}`);
  };

  return (
    <section className="space-y-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Explore Challenge Tracks
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Choose a discipline track that aligns with your skillset and build specific software solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
        {categories.map((cat, index) => {
          // Resolve icon component dynamically from react-icons/fi
          const Icon = Icons[cat.icon] || Icons.FiCompass;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                hoverable
                onClick={() => handleCategoryClick(cat.id)}
                className="h-full flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  {/* Glowing Icon Wrapper */}
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-brand-purple flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-semibold text-white tracking-wide">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-dark-border/30 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>Available Tracks</span>
                  <span className="text-gradient font-black">{cat.count} Active</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
