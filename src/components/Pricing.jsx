import React from 'react';
import { ArrowRight, Check, Headset, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { HoverCard, Stagger } from '../animeFx.jsx';
import { ADDONS, PLANS } from '../data.js';
import { useLang } from '../i18n.jsx';

export default function Pricing() {
  const { t, lang } = useLang();
  return (
    <section id="harga" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="max-w-2xl">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
          {t.pricKicker}
        </span>
        <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal dark:text-bone sm:text-5xl">
          {t.pricTitle}
        </h2>
        <p className="mt-4 leading-relaxed text-ink dark:text-bone/70">{t.pricDesc}</p>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <HoverCard
            key={plan.name.id}
            lift={plan.featured ? 10 : 6}
            scale={plan.featured ? 1.025 : 1.02}
            className={`relative flex h-full flex-col rounded-3xl p-8 ${
              plan.featured
                ? "bg-charcoal text-bone shadow-[0_40px_80px_-40px_rgba(26,26,26,0.7)] ring-1 ring-terracotta/40"
                : "border border-line bg-bone text-charcoal shadow-sm dark:border-bone/15 dark:bg-charcoal-soft dark:text-bone"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3.5 left-8 rounded-full bg-terracotta px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-bone shadow-md">
                {t.pricFeatured}
              </span>
            )}
            <h3 className={`font-serif text-2xl ${plan.featured ? "text-bone" : "text-charcoal dark:text-bone"}`}>
              {plan.name[lang]}
            </h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-serif text-4xl font-bold">{plan.price[lang]}</span>
            </div>

            <ul className="mt-6 flex-1 space-y-3.5">
              {plan.spec.map((f) => (
                <li key={f[lang]} className="flex items-start gap-3 text-sm">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-terracotta"
                  />
                  <span className={plan.featured ? "text-bone/90" : "text-charcoal/85 dark:text-bone/85"}>
                    {f[lang]}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/628112223456?text=${encodeURIComponent(
                `Halo Estatewerks, saya tertarik dengan paket ${plan.name[lang]} (${plan.price[lang]}). Mohon info detailnya.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
                plan.featured
                  ? "bg-terracotta text-bone shadow-md hover:bg-terracotta-deep hover:scale-105"
                  : "border border-charcoal/25 text-charcoal hover:bg-charcoal hover:text-bone dark:border-bone/25 dark:text-bone dark:hover:bg-bone dark:hover:text-charcoal"
              }`}
            >
              <span>{plan.cta[lang]}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </HoverCard>
        ))}
      </Stagger>

      <Reveal delay={0.15} className="mt-16">
        <h4 className="text-center text-xs font-bold uppercase tracking-[0.22em] text-charcoal/60 dark:text-bone/50">
          {t.pricAddonsTitle}
        </h4>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {ADDONS.map((a) => (
            <span
              key={a.id}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bone px-5 py-2.5 text-sm font-medium text-ink shadow-sm transition-transform hover:scale-105 dark:border-bone/15 dark:bg-charcoal-soft dark:text-bone/80"
            >
              <Check className="h-4 w-4 text-terracotta" />
              {a.label[lang]}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-10">
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-terracotta/30 bg-terracotta/5 p-6 text-center sm:flex-row sm:gap-8">
          <span className="inline-flex items-center gap-2.5 font-serif text-lg text-charcoal dark:text-bone">
            <ShieldCheck className="h-5 w-5 text-terracotta" />
            {t.pricWarranty}
          </span>
          <span className="hidden h-5 w-px bg-terracotta/30 sm:block" />
          <span className="inline-flex items-center gap-2.5 text-sm text-ink dark:text-bone/75">
            <Headset className="h-4 w-4 text-terracotta" />
            {t.pricOnboard}
          </span>
        </div>
      </Reveal>
    </section>
  );
}
