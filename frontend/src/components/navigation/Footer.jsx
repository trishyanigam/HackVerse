import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiGlobe } from 'react-icons/fi';
import clsx from 'clsx';

export const Footer = ({
  brandName = 'HackVerse',
  links = [
    {
      title: 'Platform',
      items: [
        { label: 'Showcase', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Components', href: '#components' }
      ]
    },
    {
      title: 'Resources',
      items: [
        { label: 'Documentation', href: '#docs' },
        { label: 'Design Guidelines', href: '#design' },
        { label: 'SaaS Figma UI', href: '#figma' }
      ]
    },
    {
      title: 'Legal',
      items: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' }
      ]
    }
  ],
  socialLinks = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiGlobe, href: '#', label: 'Website' }
  ],
  className,
  ...props
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={clsx(
        'w-full glass-panel border-t border-dark-border/40 bg-dark-card/30 mt-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10 shadow-inner',
        className
      )}
      {...props}
    >
      {/* Upper footer grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Leftmost Column - Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg bg-gradient-brand flex items-center justify-center font-black text-white text-xs tracking-widest">
              H
            </span>
            <span className="text-base font-bold text-white tracking-wide">
              {brandName}
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            The next-generation Hackathon Management Platform. Cohesive design systems for building elite product experiences.
          </p>
        </div>

        {/* Dynamic footer link columns */}
        {links.map((column) => (
          <div key={column.title} className="space-y-3 md:col-span-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {column.title}
            </h4>
            <ul className="space-y-2.5">
              {column.items.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom footer section */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-dark-border/30 pt-6 gap-4">
        <p className="text-[11px] text-slate-500">
          &copy; {currentYear} {brandName} Inc. All rights reserved.
        </p>

        {/* Social Icons row */}
        <div className="flex items-center gap-3">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-900 border border-transparent hover:border-dark-border/40 transition-colors cursor-pointer"
                aria-label={social.label}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
