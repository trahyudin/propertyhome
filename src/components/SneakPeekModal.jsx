import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Laptop,
  Maximize2,
  RefreshCw,
  Smartphone,
  Tablet,
  X,
} from 'lucide-react';
import { useLang } from '../i18n.jsx';

export default function SneakPeekModal({ project, projects, onClose, onSelectProject }) {
  const { t, lang } = useLang();
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  // Close on Escape key and navigate with Arrow keys
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, projects]);

  // Reset loading whenever project changes
  useEffect(() => {
    if (project) {
      setLoading(true);
      setIframeKey((k) => k + 1);
    }
  }, [project?.id]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    onSelectProject(projects[prevIdx]);
  };
  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % projects.length;
    onSelectProject(projects[nextIdx]);
  };

  const handleReload = () => {
    setLoading(true);
    setIframeKey((k) => k + 1);
  };

  // Device dimension styling
  const deviceStyles = {
    desktop: 'w-full h-full rounded-b-2xl',
    tablet: 'w-[768px] max-w-full h-[90%] my-auto rounded-[2rem] border-8 border-charcoal shadow-2xl',
    mobile: 'w-[375px] max-w-full h-[85%] my-auto rounded-[2.5rem] border-8 border-charcoal shadow-2xl',
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Dark Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex h-[94vh] w-full max-w-[1440px] flex-col overflow-hidden rounded-3xl border border-bone/20 bg-charcoal-soft shadow-2xl"
        >
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bone/10 bg-charcoal px-4 py-3 sm:px-6">
            {/* Left: Project Info & Nav */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  aria-label={t.previewPrev}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-bone/70 transition-colors hover:bg-bone/10 hover:text-bone"
                  title={t.previewPrev}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label={t.previewNext}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-bone/70 transition-colors hover:bg-bone/10 hover:text-bone"
                  title={t.previewNext}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="h-4 w-px bg-bone/20" />

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold text-bone sm:text-xl">
                    {project.title}
                  </h3>
                  <span className="rounded-full bg-terracotta/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-terracotta">
                    {project.category}
                  </span>
                  <span className="hidden text-xs text-bone/40 sm:inline">
                    ({currentIndex + 1} / {projects.length})
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Device Viewport Switcher */}
            <div className="hidden items-center rounded-full border border-bone/15 bg-charcoal-soft p-1 md:flex">
              <button
                type="button"
                onClick={() => setDevice('desktop')}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  device === 'desktop'
                    ? 'bg-terracotta text-bone shadow'
                    : 'text-bone/60 hover:text-bone'
                }`}
                title={t.previewSwitchDesktop}
              >
                <Laptop className="h-3.5 w-3.5" />
                <span>{t.previewSwitchDesktop}</span>
              </button>

              <button
                type="button"
                onClick={() => setDevice('tablet')}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  device === 'tablet'
                    ? 'bg-terracotta text-bone shadow'
                    : 'text-bone/60 hover:text-bone'
                }`}
                title={t.previewSwitchTablet}
              >
                <Tablet className="h-3.5 w-3.5" />
                <span>{t.previewSwitchTablet}</span>
              </button>

              <button
                type="button"
                onClick={() => setDevice('mobile')}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  device === 'mobile'
                    ? 'bg-terracotta text-bone shadow'
                    : 'text-bone/60 hover:text-bone'
                }`}
                title={t.previewSwitchMobile}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>{t.previewSwitchMobile}</span>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReload}
                aria-label={t.previewReload}
                title={t.previewReload}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-bone/70 transition-colors hover:bg-bone/10 hover:text-bone"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-terracotta' : ''}`} />
              </button>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-terracotta px-4 py-2 text-xs font-semibold uppercase tracking-wider text-bone shadow-sm transition-all hover:bg-terracotta-deep hover:scale-105"
              >
                <span>{t.previewExternal}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={onClose}
                aria-label={t.previewClose}
                title={t.previewClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-bone/10 text-bone/70 transition-colors hover:bg-bone/20 hover:text-bone"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Browser Address Bar Mockup (Simulated) */}
          <div className="flex items-center justify-between border-b border-bone/10 bg-charcoal-soft/70 px-4 py-2 text-xs text-bone/50">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              </div>
              <span className="ml-2 truncate font-mono text-[11px] text-bone/60">
                {project.liveUrl}
              </span>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-[11px] text-bone/40">
                {lang === 'id' ? 'Gunakan tombol panah ◀ ▶ untuk berganti template' : 'Use arrow keys ◀ ▶ to switch templates'}
              </span>
            </div>
          </div>

          {/* Live Embed Canvas */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#0c0c0c] p-2 sm:p-4">
            {/* Loading Indicator */}
            {loading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-charcoal/90 backdrop-blur-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-bone/20 border-t-terracotta" />
                <p className="mt-4 text-sm font-medium text-bone/75">
                  {t.previewLoading}
                </p>
                <span className="mt-1 text-xs text-bone/40">{project.title}</span>
              </div>
            )}

            {/* Embedded Iframe */}
            <div className={`relative flex items-center justify-center transition-all duration-500 ${deviceStyles[device]}`}>
              <iframe
                key={iframeKey}
                src={project.liveUrl}
                title={project.title}
                onLoad={() => setLoading(false)}
                className="h-full w-full rounded-2xl bg-white border-0 shadow-inner"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
              />
            </div>
          </div>

          {/* Bottom Footer Info Bar */}
          <div className="flex flex-wrap items-center justify-between border-t border-bone/10 bg-charcoal px-5 py-2.5 text-xs text-bone/70">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-terracotta">{project.tag}</span>
              <span>·</span>
              <span className="hidden sm:inline">{project.description.slice(0, 95)}...</span>
            </div>
            <div className="flex items-center gap-2">
              {project.techStack?.map((ts) => (
                <span
                  key={ts}
                  className="rounded bg-bone/10 px-2 py-0.5 text-[10px] font-medium text-bone/80"
                >
                  {ts}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
