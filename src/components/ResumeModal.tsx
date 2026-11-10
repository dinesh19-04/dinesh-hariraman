import React, { useEffect } from 'react';
import {
  X,
  Printer,
  Mail,
  Linkedin,
  Github,
  Phone,
  MapPin,
  ExternalLink,
  Award,
  GraduationCap,
  Briefcase,
  Layers,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  PROJECTS,
  SKILL_CATEGORIES,
  INTERNSHIP_EXPERIENCE,
  EDUCATION_DATA,
  ACHIEVEMENTS,
  CERTIFICATIONS,
  HACKATHONS,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md"
    >
      <div
        className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-auto sm:my-6 max-h-[94vh] flex flex-col border border-slate-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Toolbar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-900 text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-cyan-400 font-bold">CURRICULUM VITAE</span>
            <span className="text-slate-500 hidden xs:inline">·</span>
            <span className="text-slate-300 hidden xs:inline">{PERSONAL_INFO.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume view"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content Canvas */}
        <div className="p-4 sm:p-8 md:p-12 overflow-y-auto space-y-6 sm:space-y-7 bg-white font-sans text-slate-900 print:p-0">
          {/* Header */}
          <div className="border-b border-slate-300 pb-5">
            <h2 id="resume-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mb-1">
              {PERSONAL_INFO.name}
            </h2>
            <div className="text-base sm:text-lg font-semibold text-cyan-700 mb-2">
              {PERSONAL_INFO.title}
            </div>

            <p className="text-xs text-slate-600 mb-3 italic">
              &quot;{PERSONAL_INFO.tagline}&quot;
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-slate-600">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline">{PERSONAL_INFO.email}</a>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{PERSONAL_INFO.phone}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-500" />
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/dinesh19-04</a>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-slate-500" />
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/dinesh-hariraman</a>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-cyan-700" />
              <span>Education</span>
            </h3>
            <div className="space-y-3">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-slate-900 text-sm">{edu.degree}</span>
                    <span className="font-mono text-slate-500 text-[11px]">{edu.period}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 mb-1">
                    <span className="font-semibold text-cyan-800">{edu.institution}</span>
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {edu.scoreType}: {edu.score}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-1">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-cyan-700" />
              <span>Professional Internship Experience</span>
            </h3>
            <div className="space-y-3">
              {INTERNSHIP_EXPERIENCE.map((item) => (
                <div key={item.id} className="text-xs">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                    <span className="font-mono text-slate-500 text-[11px]">{item.period}</span>
                  </div>
                  <div className="text-cyan-800 font-semibold mb-1">
                    {item.organization} · {item.location}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-1.5">{item.description}</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5 mb-1.5">
                    {item.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-mono text-slate-500">
                    <span className="font-semibold text-slate-700">Skills Applied: </span>
                    {item.skills.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Engineering Projects */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-700" />
              <span>Featured Engineering Projects</span>
            </h3>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-slate-950 text-sm">{proj.title}</span>
                    <span className="font-mono text-slate-500 text-[11px]">{proj.tags.slice(0, 4).join(' · ')}</span>
                  </div>
                  <div className="text-cyan-800 font-medium mb-1">{proj.subtitle}</div>
                  <p className="text-slate-700 leading-relaxed mb-1">{proj.description}</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {proj.features.slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 border-b border-slate-200 pb-1">
              Technical Repertoire
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <span className="font-bold text-slate-900">{cat.title}: </span>
                  <span className="text-slate-700">{cat.skills.map((s) => s.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathons & Achievements */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-700" />
              <span>National Hackathons & Recognitions</span>
            </h3>

            {/* National Hackathons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-xs">
              {HACKATHONS.map((h) => (
                <div key={h.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-0.5">
                    <span>⚡ {h.name}</span>
                    <span className="text-[10px] text-cyan-700 font-mono">{h.dates}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700 mb-0.5">
                    {h.projectTitle} · {h.teamName}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {h.recognition} ({h.representedInstitution})
                  </div>
                </div>
              ))}
            </div>

            {/* Distinct Institutional Achievement */}
            <div className="mb-3 text-xs bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/80">
              <div className="font-bold text-slate-900 mb-0.5">
                🏆 {ACHIEVEMENTS[0]?.title} ({ACHIEVEMENTS[0]?.date})
              </div>
              <div className="text-slate-600">
                {ACHIEVEMENTS[0]?.issuer} · {ACHIEVEMENTS[0]?.description}
              </div>
            </div>

            {/* 6 Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="text-slate-700 flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900">{cert.title}</span>
                    <span className="text-[11px] text-slate-500"> — {cert.issuer} ({cert.category})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-300 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <span>Official candidate CV for recruiters & technical interviewers</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
