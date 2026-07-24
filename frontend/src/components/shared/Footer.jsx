import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Platform',
      links: [
        { label: 'Browse Hackathons', href: '/hackathons' },
        { label: 'Winner Leaderboard', href: '/leaderboard' },
        { label: 'FAQ Accordion', href: '/faq' }
      ]
    },
    {
      title: 'About Us',
      links: [
        { label: 'Our Story', href: '/about' },
        { label: 'Contact Support', href: '/contact' },
        { label: 'Terms of Use', href: '#terms' }
      ]
    }
  ];

  return (
    <footer className="w-full glass-panel border-t border-dark-border/40 bg-dark-card/30 mt-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10 shadow-inner">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Block */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg bg-gradient-brand flex items-center justify-center font-black text-white text-xs tracking-widest">
              H
            </span>
            <span className="text-base font-bold text-white tracking-wide">
              HackVerse
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            The next-generation Hackathon Management Platform. Cohesive design systems for building elite product experiences.
          </p>
        </div>

        {/* Links Columns */}
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {sec.title}
            </h4>
            <ul className="space-y-2.5">
              {sec.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between border-t border-dark-border/30 pt-6 gap-4">
        <p className="text-[11px] text-slate-500">
          &copy; {currentYear} HackVerse. All rights reserved. Designed for elite hackers.
        </p>

        {/* Social Icons row */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-900 border border-transparent hover:border-dark-border/40 transition-colors cursor-pointer"
            aria-label="GitHub"
          >
            <FiGithub size={16} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-900 border border-transparent hover:border-dark-border/40 transition-colors cursor-pointer"
            aria-label="Twitter"
          >
            <FiTwitter size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-900 border border-transparent hover:border-dark-border/40 transition-colors cursor-pointer"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
