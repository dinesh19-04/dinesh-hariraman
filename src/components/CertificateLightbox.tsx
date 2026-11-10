import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Download,
  Award,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { HackathonItem, HackathonMedia } from '../data/portfolioData';

interface CertificateLightboxProps {
  hackathon: HackathonItem | null;
  initialMediaId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateLightbox: React.FC<CertificateLightboxProps> = ({
  hackathon,
  initialMediaId,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (hackathon && initialMediaId) {
      const idx = hackathon.gallery.findIndex((m) => m.id === initialMediaId);
      if (idx !== -1) {
        setCurrentIndex(idx);
      } else {
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex(0);
    }
    setIsZoomed(false);
  }, [hackathon, initialMediaId, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !hackathon) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) =>
          prev === 0 ? hackathon.gallery.length - 1 : prev - 1
        );
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) =>
          prev === hackathon.gallery.length - 1 ? 0 : prev + 1
        );
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hackathon, onClose]);

  if (!isOpen || !hackathon) return null;

  const currentMedia: HackathonMedia | undefined =
    hackathon.gallery[currentIndex] || hackathon.gallery[0];
  const total = hackathon.gallery.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const getMediaBadge = (type: string) => {
    switch (type) {
      case 'certificate':
        return {
          label: 'OFFICIAL CERTIFICATE',
          style: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      case 'email':
        return {
          label: 'OFFICIAL SELECTION RECORD',
          style: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
      case 'simulation':
        return {
          label: 'MATLAB 3D SIMULATION',
          style: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
        };
      default:
        return {
          label: 'EVENT PHOTO / ARTIFACT',
          style: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        };
    }
  };

  const badge = currentMedia ? getMediaBadge(currentMedia.type) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${hackathon.name} media viewer`}
      className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-950/80 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
              <Award className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {hackathon.name}
                </h3>
                {badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-semibold ${badge.style}`}
                  >
                    {badge.label}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate">
                {hackathon.institution} • {hackathon.dates}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Zoom toggle button */}
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              title={isZoomed ? 'Zoom Out' : 'Zoom In'}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isZoomed ? (
                <ZoomOut className="w-4 h-4" />
              ) : (
                <ZoomIn className="w-4 h-4" />
              )}
            </button>

            {/* Direct Image Link */}
            {currentMedia && (
              <a
                href={currentMedia.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Open original asset in new tab"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Download className="w-4 h-4" />
              </a>
            )}

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              title="Close modal (Esc)"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Container with Navigation Controls */}
        <div className="relative flex-1 bg-black/60 min-h-[300px] sm:min-h-[420px] max-h-[64vh] overflow-auto flex items-center justify-center p-3 sm:p-6 group">
          {currentMedia ? (
            <div
              className={`transition-transform duration-300 flex items-center justify-center ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={currentMedia.url}
                alt={currentMedia.caption}
                className="max-h-[58vh] max-w-full w-auto object-contain rounded-lg shadow-xl border border-slate-800"
              />
            </div>
          ) : (
            <div className="text-slate-400 text-sm">No media available</div>
          )}

          {/* Left Arrow Button */}
          {total > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow Button */}
          {total > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Bottom Details & Thumbnails Strip */}
        <div className="px-4 sm:px-6 py-4 bg-slate-950/95 border-t border-slate-800 shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-200">
                {currentMedia?.caption}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Representing: {hackathon.representedInstitution} • Project: {hackathon.projectTitle}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-slate-400">
                {currentIndex + 1} of {total}
              </span>

              <a
                href={hackathon.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
              >
                <span>View LinkedIn Post</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Thumbnails list */}
          {total > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin">
              {hackathon.gallery.map((media, idx) => (
                <button
                  key={media.id}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'border-indigo-500 ring-2 ring-indigo-500/40 scale-105'
                      : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                  }`}
                >
                  <img
                    src={media.url}
                    alt={media.caption}
                    className="w-full h-full object-cover"
                  />
                  {media.type === 'certificate' && (
                    <span className="absolute bottom-0 right-0 p-0.5 bg-amber-500 text-slate-950 rounded-tl text-[8px] font-bold">
                      CERT
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
