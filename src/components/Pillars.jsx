import React from 'react';
import Reveal from './Reveal.jsx';
import { HoverCard, Stagger } from '../animeFx.jsx';
import { PILLARS } from '../data.js';
import { useLang } from '../i18n.jsx';

export default function Pillars() {
  const { t, lang } = useLang();
  return (
    <section id="keuntungan" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="max-w-2xl">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
          {t.pillarsKicker}
        </span>
        <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal dark:text-bone sm:text-5xl">
          {t.pillarsTitle}
        </h2>
        <p className="mt-4 leading-relaxed text-ink dark:text-bone/70">{t.pillarsSub}</p>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p) => (
          <HoverCard
            key={p.title.id}
            lift={7}
            scale={1.025}
            className="flex h-full flex-col rounded-2xl border border-[#1A1A1A]/10 bg-bone p-7 transition-shadow duration-500 hover:shadow-[0_26px_50px_-26px_rgba(194,125,96,0.5)] dark:border-bone/10 dark:bg-charcoal-soft"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand text-terracotta dark:bg-bone/10">
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-serif text-lg text-charcoal dark:text-bone">{p.title[lang]}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink dark:text-bone/70">{p.desc[lang]}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((tg) => (
                <span
                  key={tg}
                  className="rounded-full border border-line bg-sand px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-ink/80 dark:border-bone/15 dark:bg-charcoal dark:text-bone/70"
                >
                  {tg}
                </span>
              ))}
            </div>
          </HoverCard>
        ))}
      </Stagger>
    </section>
  );
}
