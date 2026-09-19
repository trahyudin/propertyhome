import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { useStaggerReveal } from '../animeFx.jsx';
import { TIERS } from '../data.js';
import { useLang } from '../i18n.jsx';

function TierPanel({ cur, lang }) {
  const featsRef = useStaggerReveal({ distance: 18, step: 55, duration: 620 });
  return (
    <div className="overflow-hidden rounded-3xl border border-[#1A1A1A]/10 bg-bone shadow-sm dark:border-bone/10 dark:bg-charcoal-soft">
      <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-terracotta/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">
            {cur.level[lang]}
          </span>
          <h3 className="mt-4 font-serif text-3xl text-charcoal dark:text-bone sm:text-4xl">
            {cur.title[lang]}
          </h3>
          <p className="mt-2 text-sm font-semibold text-ink dark:text-bone/70">{cur.audience[lang]}</p>
          <p className="mt-4 font-serif text-3xl text-terracotta">{cur.price[lang]}</p>
          <p className="mt-4 max-w-md leading-relaxed text-ink dark:text-bone/75">{cur.focus[lang]}</p>
        </div>
        <ul ref={featsRef} className="space-y-3.5">
          {cur.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[15px] text-charcoal/85 dark:text-bone/85">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Solutions() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(TIERS[1].id);

  const cur = TIERS.find((x) => x.id === active) || TIERS[1];

  return (
    <section id="solusi" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="max-w-2xl">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
          {t.solKicker}
        </span>
        <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal dark:text-bone sm:text-5xl">
          {t.solTitle}
        </h2>
        <p className="mt-4 leading-relaxed text-ink dark:text-bone/70">{t.solDesc}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-2.5">
        {TIERS.map((ti) => (
          <button
            key={ti.id}
            onClick={() => setActive(ti.id)}
            aria-pressed={active === ti.id}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
              active === ti.id
                ? "border-charcoal bg-charcoal text-bone shadow-md dark:border-bone dark:bg-bone dark:text-charcoal"
                : "border-line bg-bone text-ink hover:border-charcoal/40 hover:text-charcoal dark:border-bone/20 dark:bg-charcoal-soft dark:text-bone/70 dark:hover:text-bone"
            }`}
          >
            {ti.level[lang]} — {ti.title[lang]}
          </button>
        ))}
      </Reveal>

      <motion.div
        key={active + lang}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10"
      >
        <TierPanel cur={cur} lang={lang} />
      </motion.div>
    </section>
  );
}
