import React, { useState } from 'react';
import {
  Trophy,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Award,
  Sparkles,
  Users,
  Check,
  Calendar,
  Building,
  Flag,
  Cpu,
  Layers,
  Eye,
  FileCheck,
  Image as ImageIcon,
  ArrowRight,
} from 'lucide-react';
import {
  ACHIEVEMENTS,
  CERTIFICATIONS,
  HACKATHONS,
  Certification,
  Achievement,
  HackathonItem,
} from '../data/portfolioData';
import { CertificateLightbox } from './CertificateLightbox';

export const Achievements: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeHackathon, setActiveHackathon] = useState<HackathonItem | null>(null);
  const [lightboxInitialMediaId, setLightboxInitialMediaId] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'all' | 'hackathons' | 'competitions' | 'certifications'>('all');

  const featuredAchievement = ACHIEVEMENTS[0];

  const handleOpenLightbox = (hackathon: HackathonItem, mediaId?: string) => {
    setActiveHackathon(hackathon);
    setLightboxInitialMediaId(mediaId);
  };

  const getIssuerBadgeColor = (issuer: string) => {
    switch (issuer) {
      case 'Coursera':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'NPTEL':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Simplilearn':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      default:
        return 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20';
    }
  };

  return (
    <section
      id="hackathons"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Anchor alias for achievements */}
      <div id="achievements" className="scroll-mt-20 sm:scroll-mt-24 pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>National Competitions &amp; Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Hackathons &amp; Achievements
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            National-level hackathons demonstrating rapid prototype engineering, collaborative robotics, and AI-driven disaster telemetry—alongside competitive milestones and industry certifications.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200 dark:border-slate-800/80 self-start md:self-auto overflow-x-auto no-scrollbar max-w-full touch-pan-x shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap min-h-[36px] flex items-center ${
              activeTab === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Recognitions
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hackathons')}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap min-h-[36px] flex items-center ${
              activeTab === 'hackathons'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            National Hackathons (2)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('competitions')}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap min-h-[36px] flex items-center ${
              activeTab === 'competitions'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Awards &amp; Finalist
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('certifications')}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap min-h-[36px] flex items-center ${
              activeTab === 'certifications'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Certifications (6)
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: NATIONAL-LEVEL HACKATHONS (CICADA'25 & SMART INDIA HACKATHON)
         ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'hackathons') && (
        <div className="mb-16 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Award className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                National Level Hackathons
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              2 National Participations &amp; Institutional Representation
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {HACKATHONS.map((hackathon) => {
              const isSIH = hackathon.id === 'sih-2025';

              return (
                <article
                  key={hackathon.id}
                  className={`relative rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group shadow-xl ${
                    isSIH
                      ? 'bg-gradient-to-br from-slate-900/90 via-[#07131e]/90 to-slate-950/95 border-emerald-500/30 dark:border-emerald-500/30 hover:border-emerald-400/50'
                      : 'bg-gradient-to-br from-slate-900/90 via-[#130d24]/90 to-slate-950/95 border-purple-500/30 dark:border-purple-500/30 hover:border-purple-400/50'
                  }`}
                >
                  {/* Subtle Top Glowing Accent Line */}
                  {isSIH ? (
                    // Subtle Indian Tricolor Glow Accent Bar
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-90 shadow-sm" />
                  ) : (
                    // Electric Purple/Violet Glow Accent Bar
                    <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 opacity-90 shadow-sm" />
                  )}

                  {/* Card Main Body */}
                  <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                    {/* Header: Event Badge & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border ${
                            isSIH
                              ? 'bg-[#FF9933]/15 text-amber-500 dark:text-amber-400 border-[#FF9933]/30'
                              : 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30'
                          }`}
                        >
                          {hackathon.badge}
                        </span>

                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {hackathon.edition}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{hackathon.dates}</span>
                      </div>
                    </div>

                    {/* Title & Organization */}
                    <div>
                      <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                        {hackathon.name}
                      </h4>
                      <p className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                        Organized by: {hackathon.organizer}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <Building className="w-3.5 h-3.5 shrink-0" />
                        <span>Host: {hackathon.institution}</span>
                      </div>
                    </div>

                    {/* Verified Recognition Box */}
                    <div
                      className={`p-3.5 sm:p-4 rounded-2xl border ${
                        isSIH
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                          : 'bg-purple-950/30 border-purple-500/30 text-purple-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        <span>Verified Recognition &amp; Milestone</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {hackathon.recognition}
                      </p>
                      <p className="text-xs text-slate-300 dark:text-slate-400 mt-1 leading-relaxed">
                        {hackathon.verifiedDetails}
                      </p>
                    </div>

                    {/* Project & Solution Showcase */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Project: {hackathon.projectTitle}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {hackathon.description}
                      </p>
                    </div>

                    {/* Team & Institutional Representation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
                        <span className="text-slate-400 block mb-1">Represented Institution:</span>
                        <span className="font-semibold text-cyan-300">{hackathon.representedInstitution}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
                        <span className="text-slate-400 block mb-1">Team Designation:</span>
                        <span className="font-semibold text-white">{hackathon.teamName}</span>
                      </div>
                    </div>

                    {/* Team Members List */}
                    <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                      <span className="text-xs font-mono text-slate-400 block mb-2">
                        Collaborating Team Members:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {hackathon.teammates.map((member) => (
                          <span
                            key={member}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                              member === 'DINESH H'
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                                : 'bg-slate-800/80 text-slate-300 border-slate-700'
                            }`}
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Technical Highlights */}
                    <div>
                      <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Key Engineering Highlights</span>
                      </h5>
                      <ul className="space-y-2">
                        {hackathon.keyHighlights.map((hl) => (
                          <li
                            key={hl}
                            className="flex items-start gap-2 text-xs text-slate-300"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Media & Certificate Interactive Preview Strip */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Event Photos &amp; Verified Assets ({hackathon.gallery.length})</span>
                        </span>
                        <span className="text-[11px] font-mono text-indigo-400 hidden xs:inline">
                          Click any image to enlarge
                        </span>
                      </div>

                      <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
                        {hackathon.gallery.map((media) => (
                          <button
                            key={media.id}
                            type="button"
                            onClick={() => handleOpenLightbox(hackathon, media.id)}
                            className="group/img relative aspect-video rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          >
                            <img
                              src={media.url}
                              alt={media.caption}
                              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 group-hover/img:bg-transparent transition-colors flex items-center justify-center">
                              <Eye className="w-4 h-4 text-white opacity-0 group-hover/img:opacity-100 transition-opacity drop-shadow" />
                            </div>
                            {media.type === 'certificate' && (
                              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-500/90 text-slate-950 text-[8px] font-extrabold font-mono uppercase">
                                Cert
                              </span>
                            )}
                            {media.type === 'email' && (
                              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-emerald-500/90 text-slate-950 text-[8px] font-extrabold font-mono uppercase">
                                Record
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 sm:p-6 bg-slate-950/80 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenLightbox(hackathon)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>
                        {hackathon.id === 'cicada-2025'
                          ? 'View Certificate & Gallery'
                          : 'View Official Record & Gallery'}
                      </span>
                    </button>

                    <a
                      href={hackathon.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-md ${
                        isSIH
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
                          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'
                      }`}
                    >
                      <span>
                        {hackathon.id === 'cicada-2025'
                          ? 'View LinkedIn Profile / Post'
                          : 'View LinkedIn Post'}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2: DISTINCT COMPETITIVE MILESTONE (TOP 10 MINI PROJECT FINALIST)
         ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'competitions') && featuredAchievement && (
        <div className="mb-16">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                <Trophy className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Institutional Competition Finalist
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-500">
              Distinct Mini Project Competition Recognition
            </span>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900/60 to-cyan-500/10 dark:from-amber-500/15 dark:via-slate-900/90 dark:to-cyan-500/15 p-6 sm:p-8 border border-amber-500/40 shadow-xl">
            <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-500 flex items-center justify-center shrink-0 shadow-inner">
                  <Trophy className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      INSTITUTIONAL COMPETITIVE RECOGNITION
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {featuredAchievement.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {featuredAchievement.title}
                  </h3>
                  <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
                    {featuredAchievement.issuer}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                    {featuredAchievement.description}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 italic">
                    Note: Kept distinct from national hackathon participations to accurately reflect competition scopes.
                  </p>
                </div>
              </div>

              {/* Stat callout badge */}
              <div className="shrink-0 w-full lg:w-auto p-5 rounded-2xl bg-white/80 dark:bg-slate-950/80 border border-amber-500/30 backdrop-blur-sm flex items-center justify-between lg:flex-col lg:items-end gap-2 shadow-md">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span>Competitive Selection Field</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                  Top 10 <span className="text-sm font-normal text-slate-500">/ 160 Teams</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: VERIFIED TECHNICAL CERTIFICATIONS (6)
         ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'certifications') && (
        <div>
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Verified Technical Certifications (6)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono">
              Coursera • NPTEL • Simplilearn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATIONS.map((cert, index) => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${getIssuerBadgeColor(
                        cert.issuer
                      )} font-semibold`}
                    >
                      {cert.issuer}
                    </span>

                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                      #{index + 1}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors mb-2 leading-snug">
                    {cert.title}
                  </h4>

                  <div className="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-4">
                    Domain: {cert.category}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    <span>View Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Credential Verification Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="w-full max-w-md p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">
                Certification Credential
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-500 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>VERIFIED</span>
              </span>
            </div>

            <div>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${getIssuerBadgeColor(
                  selectedCert.issuer
                )} font-semibold inline-block mb-2`}
              >
                {selectedCert.issuer}
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedCert.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Domain Specialization: {selectedCert.category}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div>Recipient: DINESH H</div>
              <div>Issuing Organization: {selectedCert.issuer}</div>
              <div>Domain Category: {selectedCert.category}</div>
              <div>Verification State: Active Credential</div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Certificates and Event Media */}
      <CertificateLightbox
        hackathon={activeHackathon}
        initialMediaId={lightboxInitialMediaId}
        isOpen={Boolean(activeHackathon)}
        onClose={() => {
          setActiveHackathon(null);
          setLightboxInitialMediaId(undefined);
        }}
      />
    </section>
  );
};
