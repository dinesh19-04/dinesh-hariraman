import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {PERSONAL_INFO.name}
          </span>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-600">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {PERSONAL_INFO.title}
          </span>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-600">·</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-5 text-slate-600 dark:text-slate-400">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            aria-label="GitHub profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            aria-label="Send email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={onOpenResume}
            className="text-xs font-mono hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Resume
          </button>
        </div>

        {/* Right: Back to Top */}
        <div>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
