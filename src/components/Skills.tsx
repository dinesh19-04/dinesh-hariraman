import React, { useState } from 'react';
import {
  Code,
  Globe,
  Database,
  BrainCircuit,
  Cpu,
  Wrench,
  Search,
  Radio,
  BarChart3,
  Server,
  Layers,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { filterSkillCategories } from '../utils/portfolio';

export const Skills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming':
        return <Code className="w-5 h-5 text-cyan-500" />;
      case 'web-dev':
        return <Globe className="w-5 h-5 text-sky-500" />;
      case 'ml-cv':
        return <BrainCircuit className="w-5 h-5 text-purple-500" />;
      case 'data-analytics':
        return <BarChart3 className="w-5 h-5 text-indigo-500" />;
      case 'embedded-iot':
        return <Cpu className="w-5 h-5 text-emerald-500" />;
      case 'protocols':
        return <Radio className="w-5 h-5 text-rose-500" />;
      case 'tools-platforms':
        return <Wrench className="w-5 h-5 text-amber-500" />;
      case 'databases-cloud':
        return <Database className="w-5 h-5 text-teal-500" />;
      default:
        return <Code className="w-5 h-5 text-cyan-500" />;
    }
  };

  const filteredCategories = filterSkillCategories(
    SKILL_CATEGORIES.filter(
      (cat) => selectedCategory === 'all' || cat.id === selectedCategory
    ),
    searchQuery
  );

  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-2">
            Technical Repertoire
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Technical Skills
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            Organized across programming, full-stack web, machine learning, data analytics, embedded IoT hardware, and hardware communication protocols.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <label htmlFor="skill-search" className="sr-only">Search technical skills</label>
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            id="skill-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. PyTorch, React, ESP32)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-xl mb-6 sm:mb-10 overflow-x-auto no-scrollbar max-w-full touch-pan-x border border-slate-200 dark:border-slate-800 shrink-0">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer min-h-[36px] flex items-center ${
            selectedCategory === 'all'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All Domains
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 min-h-[36px] ${
              selectedCategory === cat.id
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {filteredCategories.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
          No skills matching &quot;{searchQuery}&quot;. Try searching for Python, React, PyTorch, or Arduino.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {getCategoryIcon(category.id)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                  {category.description}
                </p>

                {/* Skill List items */}
                <div className="space-y-3">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 hover:border-cyan-500/40 dark:hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                          {skill.name}
                        </span>
                        {skill.highlight && (
                          <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">
                            {skill.highlight}
                          </span>
                        )}
                      </div>
                      {skill.levelDescription && (
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {skill.levelDescription}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
