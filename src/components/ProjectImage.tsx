import React, { useState, useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { Sprout, Activity, Cpu, BarChart3, Code2, Sparkles } from 'lucide-react';

interface ProjectImageProps {
  project: Project;
  className?: string;
  isModal?: boolean;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  project,
  className = 'w-full h-full object-cover',
  isModal = false,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(project.image);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [allFailed, setAllFailed] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(project.image);
    setFailedAttempts(0);
    setAllFailed(false);
  }, [project.image]);

  const handleError = () => {
    const attempts = failedAttempts + 1;
    setFailedAttempts(attempts);

    const baseName = project.image.split('/').pop() || '';
    const nameWithoutExt = baseName.replace(/\.[^/.]+$/, '');
    const isPng = project.image.endsWith('.png');

    if (attempts === 1) {
      // Attempt 1: Swap extension (.png <-> .jpg)
      const alternateExt = isPng ? `${nameWithoutExt}.jpg` : `${nameWithoutExt}.png`;
      setCurrentSrc(`/assets/projects/${alternateExt}`);
    } else if (attempts === 2) {
      // Attempt 2: Try root /assets/ directory
      const ext = isPng ? 'png' : 'jpg';
      setCurrentSrc(`/assets/${nameWithoutExt}.${ext}`);
    } else if (attempts === 3) {
      // Attempt 3: Try alternate in root /assets/
      const alternateExt = isPng ? 'jpg' : 'png';
      setCurrentSrc(`/assets/${nameWithoutExt}.${alternateExt}`);
    } else {
      // All file attempts failed: switch to stylized vector fallback
      setAllFailed(true);
    }
  };

  const isAgri = project.id === 'sriram-farms' || project.id === 'farmsha';

  if (allFailed) {
    return (
      <div
        className={`w-full ${
          isModal ? 'h-56' : 'h-full'
        } relative overflow-hidden flex flex-col justify-between p-6 select-none bg-gradient-to-br ${
          isAgri
            ? 'from-emerald-950 via-slate-950 to-emerald-900/40 border border-emerald-800/40'
            : project.category === 'ml'
            ? 'from-cyan-950 via-slate-950 to-blue-950 border border-cyan-800/40'
            : project.category === 'iot'
            ? 'from-amber-950 via-slate-950 to-slate-900 border border-amber-800/40'
            : project.category === 'data'
            ? 'from-indigo-950 via-slate-950 to-purple-950 border border-indigo-800/40'
            : 'from-slate-900 via-slate-950 to-slate-900 border border-slate-800'
        }`}
      >
        {/* Subtle Decorative Geometric Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold ${
              isAgri
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
            }`}
          >
            {isAgri ? (
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
            ) : project.category === 'ml' ? (
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
            ) : project.category === 'iot' ? (
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
            ) : project.category === 'data' ? (
              <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
            ) : (
              <Code2 className="w-3.5 h-3.5 text-slate-300" />
            )}
            <span>{isAgri ? 'Agriculture Tech' : project.subtitle}</span>
          </span>

          <Sparkles className={`w-4 h-4 ${isAgri ? 'text-emerald-400' : 'text-cyan-400'} animate-pulse`} />
        </div>

        <div className="relative z-10">
          <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-1 drop-shadow-md">
            {project.title}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2 max-w-md font-mono">
            {project.subtitle}
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 pt-2 border-t border-white/10 text-[11px] font-mono text-slate-400">
          <span>{project.tags.slice(0, 3).join(' • ')}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={project.title}
      className={className}
      onError={handleError}
    />
  );
};
