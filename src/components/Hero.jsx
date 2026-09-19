import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { goTo } from '../scroll.js';
import { IMG } from '../data.js';
import { useLang } from '../i18n.jsx';
import { useFloat, useMagnetic } from '../animeFx.jsx';

function BrowserMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-bone/15 bg-charcoal shadow-[0_40px_90px_-30px_rgba(26,26,26,0.8)]">
      <div className="flex items-center gap-1.5 border-b border-bone/10 bg-charcoal-soft px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E0B4A0]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E4DFD3]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#C9C2B2]" />
        <span className="ml-3 h-4 flex-1 rounded-full bg-bone/10" />
      </div>
      <img src={IMG.twilight} alt="Preview desktop" className="aspect-[16/10] w-full object-cover" />
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="w-40 overflow-hidden rounded-[1.8rem] border-4 border-charcoal-soft bg-charcoal shadow-[0_30px_60px_-24px_rgba(26,26,26,0.85)] sm:w-48">
      <div className="flex items-center justify-center py-1.5">
        <span className="h-4 w-16 rounded-full bg-bone/20" />
      </div>
      <img src={IMG.penthouse} alt="Preview mobile" className="aspect-[9/16] w-full object-cover" />
      <div className="border-t border-charcoal-soft bg-charcoal-soft px-3 py-2 text-right text-[9px] font-semibold uppercase tracking-widest text-bone/70">
        Mobile-first
      </div>
    </div>
  );
}

function AuroraBlob({ className = "", style = {}, float = {} }) {
  const ref = useFloat({ duration: 12000, ...float });
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={style}
    />
  );
}

function Speck({ className = "", style = {}, float = {} }) {
  const ref = useFloat({ duration: 5500, ...float });
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-bone ${className}`}
      style={style}
    />
  );
}

function Aurora() {
  const specks = [
    { cls: "left-[12%] top-[24%] h-1.5 w-1.5 opacity-50", fl: { y: 16 } },
    { cls: "left-[30%] top-[12%] h-1 w-1 opacity-40", fl: { y: 12 } },
    { cls: "right-[16%] top-[20%] h-1.5 w-1.5 opacity-45", fl: { y: 14 } },
    { cls: "right-[28%] top-[40%] h-1 w-1 opacity-35", fl: { y: 18 } },
    { cls: "left-[45%] bottom-[18%] h-1 w-1 opacity-30", fl: { y: 12 } },
    { cls: "right-[8%] bottom-[30%] h-1.5 w-1.5 opacity-40", fl: { y: 15 } },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <AuroraBlob
        className="left-[6%] top-[-8%] h-[44vmax] w-[44vmax]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(194,125,96,0.55), rgba(194,125,96,0.10) 55%, transparent 72%)",
          mixBlendMode: "screen",
        }}
        float={{ y: 24, duration: 12000 }}
      />
      <AuroraBlob
        className="right-[-12%] top-[6%] h-[40vmax] w-[40vmax]"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(216,164,127,0.42), rgba(216,164,127,0.08) 55%, transparent 74%)",
          mixBlendMode: "screen",
        }}
        float={{ y: -20, duration: 15000 }}
      />
      <AuroraBlob
        className="bottom-[-16%] left-[28%] h-[38vmax] w-[38vmax]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(250,249,246,0.14), rgba(250,249,246,0.02) 55%, transparent 70%)",
          mixBlendMode: "screen",
        }}
        float={{ y: 18, duration: 17000 }}
      />
      {specks.map((s, i) => (
        <Speck key={i} className={s.cls} float={s.fl} />
      ))}
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const browserFloat = useFloat({ y: 9, duration: 9000 });
  const phoneFloat = useFloat({ y: 14, duration: 5600 });
  const chipFloat = useFloat({ y: 7, duration: 6400 });
  const ctaMagnetic = useMagnetic();

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-charcoal">
      <img
        src={IMG.coast}
        alt=""
        className="absolute inset-0 h-full w-full animate-ken-burns object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/75 to-charcoal/95" />
      <Aurora />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-36">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-bone/25 bg-bone/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-bone backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-terracotta" />
              {t.heroBadge}
            </span>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-bone/75">
              {t.heroTrust.map((tr) => (
                <span key={tr} className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                  {tr}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-serif text-4xl leading-[1.12] text-bone sm:text-5xl lg:text-6xl"
          >
            {t.heroTitleA}{" "}
            <span className="text-terracotta">{t.heroTitleB}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-bone/85 sm:text-lg"
          >
            {t.heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3.5"
          >
            <button
              ref={ctaMagnetic}
              onClick={() => goTo("#solusi")}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-4 text-sm font-semibold text-bone transition-all hover:bg-terracotta-deep hover:shadow-[0_20px_40px_-14px_rgba(194,125,96,0.7)] hover:scale-105"
            >
              {t.heroCta1}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="https://wa.me/628112223456"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-bone/30 bg-charcoal/40 px-6 py-4 text-sm font-semibold text-bone backdrop-blur-sm transition-all hover:border-bone hover:bg-bone/10 hover:scale-105"
            >
              <MessageCircle className="h-4 w-4 text-terracotta" />
              {t.heroCta2}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden justify-center lg:flex"
        >
          <div ref={browserFloat} className="w-full max-w-md">
            <BrowserMockup />
          </div>
          <div ref={phoneFloat} className="absolute -bottom-8 -right-2">
            <PhoneMockup />
          </div>
          <div
            ref={chipFloat}
            className="absolute -left-6 -top-9 rounded-2xl border border-bone/25 bg-charcoal-soft/90 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-bone/50">{t.heroChipLabel}</p>
            <p className="font-serif text-2xl text-bone">95<span className="text-sm text-terracotta">+</span></p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
