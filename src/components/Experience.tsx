import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Calendar,
  CheckCircle,
  Building2,
  MapPin,
} from 'lucide-react';
import { INTERNSHIP_EXPERIENCE, EDUCATION_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Section Header */}
      <div className="mb-12">
        <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-2">
          Career Journey &amp; Credentials
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          Internship &amp; Education
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl">
          Verified industry experience at Svios Technology alongside formal undergraduate training in Electronics and Communication Engineering at Saveetha Engineering College.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Internship Experience */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Professional Internship
            </h3>
          </div>

          <div className="space-y-6">
            {INTERNSHIP_EXPERIENCE.map((intern) => (
              <div
                key={intern.id}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {intern.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md self-start sm:self-auto">
                    <Calendar className="w-3 h-3 text-cyan-500" />
                    <span>{intern.period}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>{intern.organization}</span>
                  <span className="text-slate-400" aria-hidden="true">&bull;</span>
                  <span className="text-xs font-mono text-slate-500">{intern.location}</span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {intern.description}
                </p>

                <div className="space-y-2 mb-5">
                  {intern.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="text-slate-400 text-[11px] mr-1">Skills:</span>
                  {intern.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Academic Education */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Academic Background
            </h3>
          </div>

          <div className="space-y-6">
            {EDUCATION_DATA.map((edu) => (
              <div
                key={edu.id}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {edu.degree}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md self-start sm:self-auto">
                    <Calendar className="w-3 h-3 text-indigo-500" />
                    <span>{edu.period}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>{edu.institution}</span>
                  <span className="text-slate-400" aria-hidden="true">&bull;</span>
                  <span className="text-xs font-mono bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold px-2 py-0.5 rounded">
                    {edu.scoreType}: {edu.score}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {edu.description}
                </p>

                <div className="space-y-2">
                  {edu.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
