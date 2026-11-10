import React, { useState, useEffect } from 'react';
import {
  Github,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowUpRight,
  Filter,
  Activity,
  Sprout,
  Maximize2,
} from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';
import { filterProjects } from '../utils/portfolio';
import { ProjectModal } from './ProjectModal';
import { ProjectImage } from './ProjectImage';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ml', label: 'AI & Machine Learning' },
    { id: 'web', label: 'Web Development' },
    { id: 'iot', label: 'Embedded & IoT' },
    { id: 'data', label: 'Data Analytics' },
  ];

  // Deep-linking: auto-open modal if URL hash, pathname, or query param targets a project
  useEffect(() => {
    const checkTarget = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;
      const search = new URLSearchParams(window.location.search);
      const queryParam = search.get('project');

      let targetId: string | null = null;
      if (hash && hash.startsWith('#project-')) {
        targetId = hash.replace('#project-', '');
      } else if (pathname.startsWith('/project/')) {
        targetId = pathname.replace('/project/', '').replace(/\/$/, '');
      } else if (pathname.startsWith('/projects/')) {
        targetId = pathname.replace('/projects/', '').replace(/\/$/, '');
      } else if (queryParam) {
        targetId = queryParam;
      }

      if (targetId) {
        const normalized = targetId.toLowerCase().trim();
        const match = PROJECTS.find(
          (p) => p.id.toLowerCase() === normalized || p.id.toLowerCase().replace(/[-_]/g, '') === normalized.replace(/[-_]/g, '')
        );
        if (match) {
          setActiveModalProject(match);
        }
      }
    };
    checkTarget();
    window.addEventListener('hashchange', checkTarget);
    window.addEventListener('popstate', checkTarget);
    return () => {
      window.removeEventListener('hashchange', checkTarget);
      window.removeEventListener('popstate', checkTarget);
    };
  }, []);

  const handleOpenProjectOverview = (project: Project) => {
    setActiveModalProject(project);
    if (window.history.pushState) {
      window.history.pushState(null, '', `#project-${project.id}`);
    }
  };

  const handleCloseProjectOverview = () => {
    setActiveModalProject(null);
    if (window.history.pushState) {
      const isSubpath = window.location.pathname.startsWith('/project');
      const base = isSubpath ? '/' : window.location.pathname;
      window.history.pushState(null, '', base + '#projects');
    }
  };

  const filteredProjects = filterProjects(PROJECTS, selectedCategory);

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-2">
            Selected Works &amp; Systems
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Featured Projects
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            Real-world engineering implementations across agriculture technology, computer vision, full-stack web applications, embedded IoT microcontrollers, and business data analytics.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar max-w-full touch-pan-x self-start md:self-auto shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer min-h-[36px] flex items-center ${
                selectedCategory === cat.id
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((project) => {
          const isAgri = project.id === 'sriram-farms' || project.id === 'farmsha';
          return (
            <article
              key={project.id}
              className={`group rounded-2xl bg-white dark:bg-slate-900/60 border overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                isAgri
                  ? 'border-emerald-500/30 dark:border-emerald-500/30 hover:border-emerald-500/60 dark:hover:border-emerald-500/60'
                  : 'border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/40'
              }`}
            >
              {/* Top Media Frame - Clickable to open Project Overview */}
              <div
                onClick={() => handleOpenProjectOverview(project)}
                className="relative h-48 xs:h-56 sm:h-64 overflow-hidden bg-slate-950 cursor-pointer group/thumb"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenProjectOverview(project);
                  }
                }}
                aria-label={`Open project overview for ${project.title}`}
                title={`Click to view ${project.title} overview, architecture & sandbox`}
              >
                <ProjectImage
                  project={project}
                  className="w-full h-full object-cover transform group-hover/thumb:scale-105 transition-transform duration-500"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Hover Quick-Action Badge */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white shadow-lg backdrop-blur-sm flex items-center gap-1.5 transform translate-y-2 group-hover/thumb:translate-y-0 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Project Overview</span>
                  </span>
                </div>

                {/* Unboxed Metadata in Media */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300 pointer-events-none">
                  {isAgri ? (
                    <span className="capitalize text-emerald-400 font-semibold flex items-center gap-1.5">
                      <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{project.id === 'farmsha' ? 'Agriculture / Machinery Sharing' : 'Agriculture / Web Development'}</span>
                    </span>
                  ) : (
                    <span className="capitalize text-cyan-400 font-semibold">
                      {project.category === 'ml'
                        ? 'AI / Computer Vision'
                        : project.category === 'web'
                        ? 'Web Development'
                        : project.category === 'iot'
                        ? 'Embedded & IoT'
                        : 'Data Analytics'}
                    </span>
                  )}
                  <span className={isAgri ? 'text-emerald-300/90 font-medium' : 'text-slate-400'}>
                    {project.id === 'sriram-farms' ? 'Live on Vercel' : project.id === 'farmsha' ? 'Machinery Platform' : 'Production Project'}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => handleOpenProjectOverview(project)}
                    className={`text-xl font-bold text-slate-900 dark:text-white transition-colors mb-2 cursor-pointer ${
                      isAgri
                        ? 'hover:text-emerald-500 dark:hover:text-emerald-400'
                        : 'hover:text-cyan-500 dark:hover:text-cyan-400'
                    }`}
                    title="Click to view project overview"
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-xs font-mono mb-3 ${
                      isAgri
                        ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                        : 'text-cyan-600 dark:text-cyan-400'
                    }`}
                  >
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="inline-flex items-center">
                        <span className={isAgri && tIdx === 0 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''}>
                          {tag}
                        </span>
                        {tIdx < project.tags.length - 1 && (
                          <span className="text-slate-400 dark:text-slate-600 ml-2" aria-hidden="true">
                            &bull;
                          </span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Card Action Controls */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenProjectOverview(project)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer ${
                        isAgri
                          ? 'bg-emerald-700 hover:bg-emerald-600'
                          : 'bg-slate-900 dark:bg-slate-800 hover:bg-cyan-600 dark:hover:bg-cyan-600'
                      }`}
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 text-xs font-semibold hover:underline ${
                            isAgri
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-cyan-600 dark:text-cyan-400'
                          }`}
                          title="Open live website"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleOpenProjectOverview(project)}
                        className={`inline-flex items-center gap-1 text-xs font-medium transition-colors cursor-pointer ${
                          isAgri
                            ? 'text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400'
                            : 'text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400'
                        }`}
                      >
                        <Activity className={`w-3.5 h-3.5 ${isAgri ? 'text-emerald-500' : 'text-cyan-500'}`} />
                        <span>Sandbox</span>
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label={`View GitHub repository for ${project.title}`}
                        title="View GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal Dialog for Project Overview */}
      <ProjectModal
        project={activeModalProject}
        onClose={handleCloseProjectOverview}
      />
    </section>
  );
};
