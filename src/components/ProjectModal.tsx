import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Github,
  ExternalLink,
  Layers,
  Cpu,
  BarChart3,
  Play,
  CheckCircle,
  AlertTriangle,
  Send,
  Activity,
  Target,
  Lightbulb,
  Sprout,
  Calculator,
  MapPin,
  Users,
  Navigation,
  Truck,
} from 'lucide-react';
import { Project } from '../data/portfolioData';
import { ProjectImage } from './ProjectImage';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'problem-solution' | 'architecture' | 'simulation'>('overview');

  // Simulation states
  // 1. AlphaReps
  const [exerciseAngle, setExerciseAngle] = useState<number>(145);
  const [repCount, setRepCount] = useState<number>(12);
  // 2. Hariraman Builders
  const [selectedService, setSelectedService] = useState<'residential' | 'commercial' | 'renovation'>('residential');
  // 3. Accident Alert
  const [simGForce, setSimGForce] = useState<number>(1.2);
  const [simAlertTriggered, setSimAlertTriggered] = useState<boolean>(false);
  // 4. Sales Analytics
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'North' | 'South' | 'West'>('All');
  const [selectedQuarter, setSelectedQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q3');
  // 5. SRI RAM FARMS
  const [farmMachineType, setFarmMachineType] = useState<'small' | 'large'>('small');
  const [farmAreaCents, setFarmAreaCents] = useState<number>(50);
  // 6. Farmsha Platform
  const [farmshaRole, setFarmshaRole] = useState<'farmer' | 'owner' | 'agent'>('farmer');
  const [farmshaMachine, setFarmshaMachine] = useState<'tractor' | 'harvester' | 'rotavator' | 'seeder'>('tractor');
  const [farmshaHours, setFarmshaHours] = useState<number>(4);
  const [farmshaLocation, setFarmshaLocation] = useState<string>('Ranipet Cluster');
  const [farmshaBooked, setFarmshaBooked] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  // Ensure overview tab is active when a new project is opened
  useEffect(() => {
    if (project) {
      setActiveTab('overview');
    }
  }, [project]);

  if (!project) return null;

  const isAgri = project.id === 'sriram-farms' || project.id === 'farmsha';

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md"
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto sm:my-8 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className={`text-xs font-mono uppercase tracking-wider ${isAgri ? 'text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5' : 'text-cyan-600 dark:text-cyan-400'}`}>
              {isAgri && <Sprout className="w-3.5 h-3.5" />}
              <span>{isAgri ? 'Agriculture Tech' : 'Specification'}</span>
            </span>
            <span className="text-slate-400" aria-hidden="true">&bull;</span>
            <span className="text-xs font-mono text-slate-500 capitalize">
              {project.category.toUpperCase()}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project modal"
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Top Banner & Title Lockup */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7">
              <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className={`text-sm font-medium mb-4 ${isAgri ? 'text-emerald-600 dark:text-emerald-400' : 'text-cyan-600 dark:text-cyan-400'}`}>
                {project.subtitle}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {project.longDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 mb-5">
                {project.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-md ${
                      isAgri && idx === 0
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20'
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold transition-all shadow-sm ${
                      isAgri
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20'
                        : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-cyan-500/20'
                    }`}
                  >
                    <span>Open Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* Visual Preview */}
            <div className="md:col-span-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-md">
              <ProjectImage
                project={project}
                isModal={true}
                className="w-full h-56 object-cover"
              />
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs text-slate-500 dark:text-slate-400">{m.label}</div>
                <div className={`text-base sm:text-lg font-bold font-mono tabular-nums ${isAgri ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? isAgri ? 'bg-emerald-600 text-white' : 'bg-cyan-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Overview &amp; Features
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('problem-solution')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'problem-solution'
                  ? isAgri ? 'bg-emerald-600 text-white' : 'bg-cyan-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Problem &amp; Solution
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'architecture'
                  ? isAgri ? 'bg-emerald-600 text-white' : 'bg-cyan-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              System Architecture
            </button>
            {project.hasInteractiveDemo && (
              <button
                type="button"
                onClick={() => setActiveTab('simulation')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'simulation'
                    ? isAgri ? 'bg-emerald-600 text-white font-bold' : 'bg-cyan-600 text-white font-bold'
                    : isAgri ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30' : 'text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/30'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Interactive Sandbox</span>
              </button>
            )}
          </div>

          {/* Tab 1: Overview & Features */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Core Architectural Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 flex items-start gap-2.5"
                  >
                    <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isAgri ? 'text-emerald-500' : 'text-cyan-500'}`} />
                    <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Problem & Solution */}
          {activeTab === 'problem-solution' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The Engineering Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className={`p-5 rounded-xl space-y-2 ${isAgri ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20' : 'bg-cyan-500/5 dark:bg-cyan-950/20 border border-cyan-500/20'}`}>
                <div className={`flex items-center gap-2 font-bold text-sm ${isAgri ? 'text-emerald-600 dark:text-emerald-400' : 'text-cyan-600 dark:text-cyan-400'}`}>
                  <Lightbulb className="w-4 h-4" />
                  <span>Implemented Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: System Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                System Workflow &amp; Layer Design
              </h4>
              <div className="space-y-3">
                {project.architecture.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 font-mono text-xs flex items-center gap-3"
                  >
                    <span className={`w-6 h-6 rounded-md text-white font-bold flex items-center justify-center shrink-0 ${isAgri ? 'bg-emerald-600' : 'bg-cyan-600'}`}>
                      {idx + 1}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200">{layer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Interactive Sandbox / Simulation */}
          {activeTab === 'simulation' && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 text-white space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Play className="w-4 h-4 text-cyan-400" />
                  <span>INTERACTIVE LOGIC SANDBOX</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">State Simulation Live</span>
              </div>

              {/* Simulation 0: SRI RAM FARMS Machinery & Acreage Pricing Calculator */}
              {project.id === 'sriram-farms' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Interactive Agricultural Machinery Rental &amp; Acreage Calculator (Pricing: Cents &times; Rate per Cent; 1 Acre = 100 Cents):
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Select Machinery Type:</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFarmMachineType('small')}
                          className={`p-2.5 text-xs font-mono rounded-xl transition-all cursor-pointer text-center border ${
                            farmMachineType === 'small'
                              ? 'bg-emerald-600/30 border-emerald-500 text-white font-bold shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-semibold text-emerald-300">Small Machine</div>
                          <div className="text-[11px] text-slate-300">₹45 / Cent</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFarmMachineType('large')}
                          className={`p-2.5 text-xs font-mono rounded-xl transition-all cursor-pointer text-center border ${
                            farmMachineType === 'large'
                              ? 'bg-emerald-600/30 border-emerald-500 text-white font-bold shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-semibold text-emerald-300">Large Machine</div>
                          <div className="text-[11px] text-slate-300">₹40 / Cent</div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-mono text-slate-400">Cultivated Area (Cents):</label>
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          {farmAreaCents} Cents ({(farmAreaCents / 100).toFixed(2)} Acres)
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="200"
                        step="5"
                        value={farmAreaCents}
                        onChange={(e) => setFarmAreaCents(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                        <span>10 Cents</span>
                        <span>100 Cents (1 Acre)</span>
                        <span>200 Cents</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-emerald-900/60 font-mono text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Selected Equipment:</span>
                      <span className="text-white font-bold">
                        {farmMachineType === 'small' ? 'Small Planting Machine (₹45/cent)' : 'Large Planting Machine (₹40/cent)'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Acreage Rate Breakdown:</span>
                      <span className="text-slate-300">
                        {farmAreaCents} Cents &times; ₹{farmMachineType === 'small' ? 45 : 40}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                      <span className="text-slate-400">Calculated Machinery Rental:</span>
                      <span className="text-base text-emerald-400 font-extrabold">
                        ₹{(farmAreaCents * (farmMachineType === 'small' ? 45 : 40)).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-800 text-[11px]">
                      <span className="text-slate-400">Database Sync:</span>
                      <span className="text-cyan-400">Cloud Firestore + Dexie.js (Offline Ready)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Simulation 0B: FARMSHA Smart Agricultural Machinery Sharing Platform */}
              {project.id === 'farmsha' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <p className="text-xs text-slate-400">
                      Smart Farm Machinery Sharing &amp; Rental Dispatch Simulation (Uber for Farm Equipment):
                    </p>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live GPS Dispatch Engine
                    </span>
                  </div>

                  {/* Role Selector */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Select Platform Role (Role-Based Dashboard Module):</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => { setFarmshaRole('farmer'); setFarmshaBooked(false); }}
                        className={`p-2 text-xs font-mono rounded-xl transition-all cursor-pointer text-center border ${
                          farmshaRole === 'farmer'
                            ? 'bg-emerald-600/30 border-emerald-500 text-white font-bold shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-emerald-300">Farmer</div>
                        <div className="text-[10px] text-slate-300">Book Equipment</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setFarmshaRole('owner'); setFarmshaBooked(false); }}
                        className={`p-2 text-xs font-mono rounded-xl transition-all cursor-pointer text-center border ${
                          farmshaRole === 'owner'
                            ? 'bg-emerald-600/30 border-emerald-500 text-white font-bold shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-emerald-300">Machinery Owner</div>
                        <div className="text-[10px] text-slate-300">Fleet &amp; Earnings</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setFarmshaRole('agent'); setFarmshaBooked(false); }}
                        className={`p-2 text-xs font-mono rounded-xl transition-all cursor-pointer text-center border ${
                          farmshaRole === 'agent'
                            ? 'bg-emerald-600/30 border-emerald-500 text-white font-bold shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-emerald-300">Agent Coordinator</div>
                        <div className="text-[10px] text-slate-300">Cluster Dispatch</div>
                      </button>
                    </div>
                  </div>

                  {/* Machinery Selection & Region Filter */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Agricultural Machinery Category:</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'tractor', label: 'Tractor', rate: 800, sub: '45 HP Mahindra' },
                          { id: 'harvester', label: 'Harvester', rate: 1800, sub: 'Track Combine' },
                          { id: 'rotavator', label: 'Rotavator', rate: 600, sub: '7ft Shaktiman' },
                          { id: 'seeder', label: 'Seed Drill', rate: 500, sub: '9-Tyne Feeder' },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => { setFarmshaMachine(m.id as any); setFarmshaBooked(false); }}
                            className={`p-2 text-xs font-mono rounded-xl transition-all cursor-pointer text-left border ${
                              farmshaMachine === m.id
                                ? 'bg-emerald-600/25 border-emerald-500 text-white font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="font-semibold text-emerald-300">{m.label}</div>
                            <div className="text-[10px] text-slate-400">{m.sub}</div>
                            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">₹{m.rate}/hr</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs font-mono text-slate-400 flex items-center gap-1">
                            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Location / Village Cluster:</span>
                          </label>
                          <span className="text-[11px] font-mono text-emerald-400 font-bold">{farmshaLocation}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {['Ranipet Cluster', 'Arcot Sector', 'Walajah Hub', 'Arakkonam'].map((loc) => (
                            <button
                              key={loc}
                              type="button"
                              onClick={() => { setFarmshaLocation(loc); setFarmshaBooked(false); }}
                              className={`py-1.5 px-2 text-[11px] font-mono rounded-lg transition-colors cursor-pointer text-center border ${
                                farmshaLocation === loc
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {loc}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs font-mono text-slate-400">Required Operating Duration:</label>
                          <span className="text-xs font-mono text-emerald-400 font-bold">
                            {farmshaHours} {farmshaHours === 1 ? 'Hour' : 'Hours'} ({farmshaHours >= 8 ? 'Full Working Day' : 'Half Day Block'})
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          step="1"
                          value={farmshaHours}
                          onChange={(e) => { setFarmshaHours(Number(e.target.value)); setFarmshaBooked(false); }}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                          <span>1 Hour</span>
                          <span>6 Hours</span>
                          <span>12 Hours</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rate Card & Real-time Calculation */}
                  {(() => {
                    const machineryData: Record<'tractor' | 'harvester' | 'rotavator' | 'seeder', { name: string; rate: number; units: string }> = {
                      tractor: { name: 'Mahindra 575 DI (45 HP Tractor)', rate: 800, units: '3 Units Nearby' },
                      harvester: { name: 'Preet 987 Track Combine Harvester', rate: 1800, units: '1 Unit Available' },
                      rotavator: { name: 'Shaktiman 7ft Heavy Duty Rotavator', rate: 600, units: '2 Units Nearby' },
                      seeder: { name: 'Fieldking Zero-Till 9-Tyne Seed Drill', rate: 500, units: '2 Units Nearby' },
                    };
                    const rates = machineryData[farmshaMachine];
                    const totalCost = farmshaHours * rates.rate;

                    return (
                      <div className="p-4 rounded-xl bg-slate-900 border border-emerald-900/60 font-mono text-xs space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Matched Equipment:</span>
                          <span className="text-white font-bold">{rates.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">GPS Fleet Density ({farmshaLocation}):</span>
                          <span className="text-emerald-400 font-semibold">{rates.units}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Transparent Rental Formula:</span>
                          <span className="text-slate-300">
                            {farmshaHours} hrs &times; ₹{rates.rate}/hr (Direct Owner Rate, 0% Middleman Markups)
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                          <span className="text-slate-400">Total Machinery Booking Cost:</span>
                          <span className="text-base text-emerald-400 font-extrabold">
                            ₹{totalCost.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Booking simulation action */}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                          <div className="text-[11px] text-slate-400">
                            Current Mode: <span className="text-emerald-300 capitalize">{farmshaRole} Module</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFarmshaBooked(true)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                              farmshaBooked
                                ? 'bg-emerald-500 text-slate-950 font-bold'
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            }`}
                          >
                            {farmshaBooked ? '✓ Reservation Dispatched!' : 'Simulate Machinery Dispatch'}
                          </button>
                        </div>

                        {farmshaBooked && (
                          <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-[11px] text-emerald-300 font-mono space-y-1">
                            <div className="font-bold">✓ Booking Request Successfully Dispatched to Nearby Owner!</div>
                            <div className="text-slate-300">
                              Notification sent via SMS/OTP to Machinery Owner in {farmshaLocation}. Real-time GPS status: Assigned &bull; ETA 25 mins.
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Simulation 1: AlphaReps Knee Angle & Rep Counter */}
              {project.id === 'alphareps-gym-partner' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Adjust the simulated joint flexion angle to trigger anatomical peak detection:
                  </p>
                  <div className="flex items-center gap-4">
                    <label className="text-xs font-mono text-slate-400">Knee Joint Flexion:</label>
                    <input
                      type="range"
                      min="60"
                      max="180"
                      value={exerciseAngle}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setExerciseAngle(val);
                        if (val <= 75) setRepCount((prev: number) => prev + 1);
                      }}
                      className="w-48 accent-cyan-400"
                    />
                    <span className="font-mono text-xs text-cyan-400 font-bold">{exerciseAngle}&deg;</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Posture Classification:</span>
                      <span className={exerciseAngle <= 90 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                        {exerciseAngle <= 90 ? 'PARALLEL DEPTH REACHED (VALID REP)' : 'INSUFFICIENT DEPTH (PARTIAL)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cumulative Valid Reps:</span>
                      <span className="text-cyan-400 font-bold">{repCount} Reps</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                      <span className="text-slate-400">Inference Latency:</span>
                      <span className="text-slate-200">28 ms (35 FPS Edge Tensor)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Simulation 2: Hariraman Builders */}
              {project.id === 'hariraman-builders' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Switch construction sectors to test client routing:
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedService('residential')}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                        selectedService === 'residential'
                          ? 'bg-cyan-600 text-white font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Residential Villas
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedService('commercial')}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                        selectedService === 'commercial'
                          ? 'bg-cyan-600 text-white font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Commercial Complexes
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedService('renovation')}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                        selectedService === 'renovation'
                          ? 'bg-cyan-600 text-white font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Structural Renovation
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Selected Sector:</span>
                      <span className="text-white capitalize">{selectedService} Projects</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Live Status:</span>
                      <span className="text-emerald-400">Active Production on Vercel</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                      <span className="text-slate-400">Production URL:</span>
                      <a
                        href="https://hariramanbuilders.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        hariramanbuilders.vercel.app
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Simulation 3: Accident Alert System */}
              {project.id === 'accident-alert-system' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Test the ADXL345 accelerometer impact detection algorithm and automated GSM SOS SMS trigger:
                  </p>
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-mono text-slate-400">Simulate Deceleration G-Force:</label>
                    <input
                      type="range"
                      min="0.5"
                      max="6.0"
                      step="0.1"
                      value={simGForce}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSimGForce(val);
                        setSimAlertTriggered(val >= 3.5);
                      }}
                      className="w-48 accent-cyan-400"
                    />
                    <span className="font-mono text-xs text-cyan-400 font-bold">{simGForce.toFixed(1)} G</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Crash Threshold:</span>
                      <span className="text-slate-200">&gt;= 3.5 G Impact Acceleration</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                      <span className="text-slate-400">System SOS State:</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        simAlertTriggered
                          ? 'bg-rose-500/20 text-rose-400 animate-pulse'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {simAlertTriggered ? 'ACCIDENT DETECTED - BROADCASTING GPS' : 'NORMAL MONITORING (PASSIVE)'}
                      </span>
                    </div>
                    {simAlertTriggered && (
                      <div className="text-[11px] text-amber-300 bg-amber-950/40 p-2.5 rounded border border-amber-800/40">
                        [GSM SIM800 SMS]: &quot;CRITICAL: Vehicle Impact (4.1G). GPS Coordinates: 13.0827&deg; N, 80.2707&deg; E. Rescue response required.&quot;
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Simulation 4: Sales Analytics Dashboard */}
              {project.id === 'sales-analytics-dashboard' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Interact with dynamic slicers to evaluate pivot aggregations across regions and quarters:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Region Slicer:</label>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white"
                      >
                        <option value="All">All Regions</option>
                        <option value="North">North Territory</option>
                        <option value="South">South Territory</option>
                        <option value="West">West Territory</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Fiscal Quarter:</label>
                      <select
                        value={selectedQuarter}
                        onChange={(e) => setSelectedQuarter(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white"
                      >
                        <option value="Q1">Q1 Performance</option>
                        <option value="Q2">Q2 Performance</option>
                        <option value="Q3">Q3 Performance</option>
                        <option value="Q4">Q4 Performance</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Calculated Gross Revenue:</span>
                      <span className="text-cyan-400 font-bold">
                        ₹{selectedRegion === 'All' ? '1,420,000' : selectedRegion === 'North' ? '540,000' : selectedRegion === 'South' ? '490,000' : '390,000'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Operating Profit Margin:</span>
                      <span className="text-emerald-400 font-bold">34.8% (Target Exceeded)</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800 text-slate-300">
                      <span>Formula Breakdown:</span>
                      <span>=GETPIVOTDATA(&quot;Sales&quot;, PivotTable1)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between shrink-0">
          <div className="text-xs font-mono text-slate-500">
            DINESH H &bull; Saveetha Engineering College
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
