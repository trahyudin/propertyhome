import React, { useState, useEffect } from 'react';
import { Eye, ExternalLink, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { HoverCard, Stagger } from '../animeFx.jsx';
import { PORTFOLIO, PORTFOLIO_CATEGORIES } from '../data.js';
import { useLang } from '../i18n.jsx';
import SneakPeekModal from './SneakPeekModal.jsx';

export default function Portfolio() {
  const { t, lang } = useLang();
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [items, setItems] = useState(PORTFOLIO);
  const [previewProject, setPreviewProject] = useState(null);

  // Fetch portfolio dynamically from API if connected, with fallback to data.js
  useEffect(() => {
    let isMounted = true;
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((res) => {
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setItems(res.data);
        }
      })
      .catch(() => {
        // Silently use static fallback
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredItems = selectedCategory === "Semua"
    ? items
    : items.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Reveal className="max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
            {t.portKicker}
          </span>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal dark:text-bone sm:text-5xl">
            {t.portTitle}
          </h2>
          <p className="mt-4 leading-relaxed text-ink dark:text-bone/70">{t.portDesc}</p>
        </Reveal>

        {/* Category Filter Pills */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-terracotta text-bone shadow-sm'
                    : 'border border-line bg-bone text-ink hover:border-terracotta/40 dark:border-bone/15 dark:bg-charcoal-soft dark:text-bone/70 dark:hover:text-bone'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((p) => {
          const hasLink = p.liveUrl && p.liveUrl !== "#";
          return (
            <HoverCard
              key={p.id}
              as="article"
              lift={8}
              scale={1.02}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1A1A1A]/10 bg-bone shadow-sm transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(194,125,96,0.55)] dark:border-bone/10 dark:bg-charcoal-soft"
            >
              {/* Image Preview with Hover Overlay */}
              <div 
                onClick={() => setPreviewProject(p)}
                className="relative aspect-[16/10] cursor-pointer overflow-hidden bg-charcoal"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  crossOrigin="anonymous"
                  onError={(e) => {
                    const fb = p.fallback;
                    if (fb && e.currentTarget.src !== fb) e.currentTarget.src = fb;
                  }}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-charcoal/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-bone backdrop-blur">
                  {p.tag}
                </span>

                {/* Sneak Peek Overlay on Hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-bone px-4 py-2 text-xs font-bold uppercase tracking-wider text-charcoal shadow-lg transition-transform group-hover:scale-105">
                    <Eye className="h-4 w-4 text-terracotta" />
                    {t.portSneakPeek}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                    {p.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-ink/50 dark:text-bone/40">
                    {p.badge}
                  </span>
                </div>

                <h3 className="mt-1 font-serif text-xl font-bold text-charcoal dark:text-bone">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/85 dark:text-bone/75">
                  {p.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.techStack.map((t2) => (
                    <span
                      key={t2}
                      className="rounded-md bg-sand px-2 py-1 text-[11px] font-semibold text-charcoal/70 dark:bg-charcoal dark:text-bone/70"
                    >
                      {t2}
                    </span>
                  ))}
                </div>

                {/* Action Buttons: Sneak Peek & Visit Live */}
                <div className="mt-6 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPreviewProject(p)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-terracotta px-4 py-3 text-xs font-semibold uppercase tracking-wider text-bone shadow-sm transition hover:bg-terracotta-deep hover:scale-[1.02]"
                  >
                    <Eye className="h-4 w-4" />
                    <span>{t.portSneakPeek}</span>
                  </button>

                  {hasLink ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t.portDemo}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#1A1A1A]/15 px-3 py-3 text-xs font-semibold text-charcoal transition hover:border-terracotta hover:text-terracotta dark:border-bone/20 dark:text-bone dark:hover:border-terracotta"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-[#1A1A1A]/10 px-3 py-3 text-ink/40 dark:border-bone/10 dark:text-bone/30">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </div>
            </HoverCard>
          );
        })}
      </Stagger>

      {/* Embedded Live Preview Modal */}
      <SneakPeekModal
        project={previewProject}
        projects={filteredItems}
        onClose={() => setPreviewProject(null)}
        onSelectProject={(p) => setPreviewProject(p)}
      />
    </section>
  );
}
