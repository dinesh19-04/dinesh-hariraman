import React from 'react';
import {
  Brain,
  Code2,
  Cpu,
  GraduationCap,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  EDUCATION_DATA,
  INTERNSHIP_EXPERIENCE,
  ACHIEVEMENTS,
} from '../data/portfolioData';

interface AboutProps {
  onNavigateToProjects: () => void;
  onNavigateToContact: () => void;
}

export const About: React.FC<AboutProps> = ({
  onNavigateToProjects,
  onNavigateToContact,
}) => {
  const pillars = [
    {
      icon: <Brain className="w-5 h-5 text-cyan-500" />,
      title: 'Machine Learning & Computer Vision',
      description:
        'Building intelligent vision models, deep learning exercise tracking (AlphaReps), and video analysis with PyTorch, TensorFlow, and OpenCV.',
    },
    {
      icon: <Code2 className="w-5 h-5 text-indigo-500" />,
      title: 'Full-Stack Software Engineering',
      description:
        'Developing responsive, modern web applications like Hariraman Builders using React.js, Node.js, FastAPI, and modular component architectures.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-purple-500" />,
      title: 'Embedded Systems & IoT Hardware',
      description:
        'Programming Arduino Nano and ESP32 in Embedded C, interfacing ADXL345 accelerometers, GPS, and GSM modules for emergency alert hardware.',
    },
    {
      icon: <Layers className="w-5 h-5 text-emerald-500" />,
      title: 'Hardware-to-Software Synergy',
      description:
        'Bridging the physical-digital boundary—from register-level communication protocols (SPI, I2C, UART) to cloud data analytics and intuitive user interfaces.',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Section Header */}
      <div className="mb-8 sm:mb-14">
        <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-1.5 sm:mb-2">
          Engineering Background &amp; Philosophy
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-4">
          About Me
        </h2>
        <div className="space-y-3 sm:space-y-4 max-w-3xl text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>{PERSONAL_INFO.aboutIntroduction}</p>
          <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 border-l-2 border-cyan-500/40 pl-3 sm:pl-4 py-1">
            {PERSONAL_INFO.hardwareSoftwarePhilosophy}
          </p>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-16">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-colors shadow-sm"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 sm:mb-4">
              {pillar.icon}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2">
              {pillar.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      {/* Education & Internship Highlight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
        {/* Education Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-cyan-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Education
            </h3>
          </div>

          <div className="space-y-5">
            {EDUCATION_DATA.map((edu) => (
              <div
                key={edu.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {edu.degree}
                  </h4>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded self-start sm:self-auto">
                    {edu.period}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 font-medium mb-2">
                  <span>{edu.institution}</span>
                  <span className="text-slate-400" aria-hidden="true">&bull;</span>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                    {edu.scoreType}: {edu.score}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Internship Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-5 h-5 text-indigo-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Internship Experience
            </h3>
          </div>

          {INTERNSHIP_EXPERIENCE.map((intern) => (
            <div
              key={intern.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {intern.title}
                  </h4>
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {intern.period}
                  </span>
                </div>
                <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                  {intern.organization} &bull; {intern.location}
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                  {intern.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">&bull;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500">
                {intern.skills.map((s, idx) => (
                  <span key={idx} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
