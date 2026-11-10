import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  ArrowRight,
  FileText,
  Mail,
  Cpu,
  Brain,
  Code2,
  Sparkles,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onExploreProjects: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onExploreProjects,
  onContactClick,
}) => {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const roles = PERSONAL_INFO.roles;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background glow effects */}
      <div
        className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Typographic Presentation */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Mobile Identity Badge (< lg) */}
          <div className="lg:hidden flex items-center gap-3 mb-4 p-2 sm:p-2.5 rounded-2xl bg-slate-900/50 dark:bg-slate-900/70 border border-cyan-500/25 backdrop-blur-md self-start shadow-sm">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-cyan-400 shadow-sm shrink-0">
              <img
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{PERSONAL_INFO.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 rounded font-semibold">
                  ECE &apos;27
                </span>
              </div>
              <div className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                {roles[activeRoleIndex]}
              </div>
            </div>
          </div>

          {/* Unboxed Kicker */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-mono tracking-wider text-cyan-600 dark:text-cyan-400 mb-2 sm:mb-3">
            <span className="uppercase font-semibold tracking-widest">
              {PERSONAL_INFO.title}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 dark:text-slate-400">Saveetha Engineering College</span>
          </div>

          {/* Name & Headline */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.18] mb-3 sm:mb-4 text-balance">
            <span className="block mb-1 sm:mb-2">
              Hello, I&apos;m{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </span>
            <span className="block text-base xs:text-lg sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 leading-snug">
              {PERSONAL_INFO.tagline}
            </span>
          </h1>

          {/* Animated Dynamic Role Indicator (Desktop/Tablet) */}
          <div className="hidden lg:flex items-center gap-2 text-sm sm:text-base font-mono py-1 sm:py-2 text-slate-600 dark:text-slate-300 min-h-[32px] sm:min-h-[36px] mb-4 sm:mb-5">
            <span className="text-slate-400 dark:text-slate-500">I specialize in:</span>
            <span
              key={activeRoleIndex}
              className="font-semibold text-cyan-600 dark:text-cyan-400 transition-all duration-300 transform translate-y-0 opacity-100"
            >
              {roles[activeRoleIndex]}
            </span>
          </div>

          {/* Short Bio */}
          <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-5 sm:mb-7 text-pretty">
            {PERSONAL_INFO.shortBio}
          </p>

          {/* Interactive Buttons (Side-by-side grid on mobile, row on tablet/desktop) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center gap-2 sm:gap-3 mb-5 sm:mb-7">
            <button
              type="button"
              onClick={onExploreProjects}
              className="col-span-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all cursor-pointer whitespace-nowrap shrink-0 group min-h-[44px]"
            >
              <span>View Projects</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenResume}
              className="col-span-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[44px]"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500" />
              <span>Resume</span>
            </button>

            <button
              type="button"
              onClick={onContactClick}
              className="col-span-2 sm:col-auto inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] sm:min-h-[44px]"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Social Links & Location Chips */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-slate-400 dark:text-slate-500 text-[11px] sm:text-xs">Profiles:</span>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-[11px] sm:text-xs whitespace-nowrap shrink-0 min-h-[32px]"
              aria-label="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5 text-cyan-500" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-[11px] sm:text-xs whitespace-nowrap shrink-0 min-h-[32px]"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5 text-indigo-500" />
              <span>LinkedIn</span>
            </a>
            <span className="inline-flex items-center gap-1 px-2 py-1 text-slate-500 text-[11px] sm:text-xs whitespace-nowrap shrink-0">
              <span>📍 {PERSONAL_INFO.location}</span>
            </span>
          </div>
        </div>

        {/* Right Column: Professional Futuristic Neon Tech Portrait */}
        <div className="lg:col-span-5 flex items-center justify-center mt-6 lg:mt-0">
          <div className="relative w-full max-w-[290px] xs:max-w-xs sm:max-w-md group">
            {/* Ambient Neon Backlight */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-cyan-500/30 via-indigo-500/25 to-purple-500/30 blur-2xl opacity-80 group-hover:opacity-100 transition duration-700 pointer-events-none" />

            {/* Profile Framing Card */}
            <div className="relative rounded-3xl p-3 sm:p-4 bg-slate-900/90 dark:bg-slate-900/90 bg-white/95 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl flex flex-col items-center">
              {/* Futuristic Tech Portrait */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-cyan-500/30 dark:border-cyan-500/40 bg-slate-950 shadow-inner group/img">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt="DINESH H - Software Developer & ML Engineer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Tech Status Pill Overlaid */}
                <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 text-[10px] sm:text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>DINESH H</span>
                  </div>
                  <span className="text-slate-300">ECE &bull; Saveetha 2027</span>
                </div>
              </div>

              {/* Identity & Subtitle below portrait */}
              <div className="w-full pt-2.5 sm:pt-3 px-1 sm:px-2 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                    {PERSONAL_INFO.name}
                  </h2>
                  <span className="px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    ML &amp; Dev
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2.5 sm:mb-3">
                  Full-Stack Developer &amp; ML Engineer bridging microcontrollers, neural networks, and modern cloud applications.
                </p>

                {/* Quick Tech Highlights Strip */}
                <div className="w-full pt-2 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-[10px] sm:text-[11px] font-mono">
                  <div className="p-1 sm:p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/60">
                    <div className="text-cyan-600 dark:text-cyan-400 font-bold">AI / ML</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[9px] sm:text-[10px]">PyTorch &bull; CV</div>
                  </div>
                  <div className="p-1 sm:p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/60">
                    <div className="text-indigo-600 dark:text-indigo-400 font-bold">Web</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[9px] sm:text-[10px]">React &bull; Node</div>
                  </div>
                  <div className="p-1 sm:p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/60">
                    <div className="text-purple-600 dark:text-purple-400 font-bold">Embedded</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[9px] sm:text-[10px]">IoT &bull; ESP32</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width KPI / Stat Strip below split */}
      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {PERSONAL_INFO.stats.map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums font-mono bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
              {stat.value}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
