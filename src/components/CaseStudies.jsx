import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { HoverCard, Stagger } from '../animeFx.jsx';
import { CASES } from '../data.js';
import { useLang } from '../i18n.jsx';

export default function CaseStudies() {
  const { t, lang } = useLang();
  return (
    <section id="case" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="max-w-2xl">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
          {t.caseKicker}
        </span>
        <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal dark:text-bone sm:text-5xl">
          {t.caseTitle}
        </h2>
        <p className="mt-4 leading-relaxed text-ink dark:text-bone/70">{t.caseDesc}</p>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
        {CASES.map((c) => (
          <HoverCard
            key={c.name.id}
            lift={7}
            scale={1.02}
            className="flex h-full flex-col rounded-2xl border border-[#1A1A1A]/10 bg-bone p-7 transition-shadow duration-500 hover:shadow-[0_26px_50px_-26px_rgba(194,125,96,0.4)] dark:border-bone/10 dark:bg-charcoal-soft"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand text-terracotta dark:bg-charcoal">
                <c.icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/60 dark:text-bone/50">
                {c.tag[lang]}
              </span>
            </div>
            <h3 className="mt-5 font-serif text-xl text-charcoal dark:text-bone">{c.name[lang]}</h3>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink/85 dark:text-bone/75">
              <p>
                <span className="mr-1.5 font-bold text-charcoal/50 dark:text-bone/40">→</span>
                {c.challenge[lang]}
              </p>
              <p>
                <span className="mr-1.5 font-bold text-terracotta">✓</span>
                {c.solution[lang]}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl border border-terracotta/30 bg-terracotta/10 px-4 py-3 font-serif text-lg text-terracotta font-medium">
              <ArrowRight className="h-4 w-4 shrink-0" />
              <span>{c.result[lang]}</span>
            </div>
          </HoverCard>
        ))}
      </Stagger>
    </section>
  );
}
