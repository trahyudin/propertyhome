import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { HoverCard, Stagger } from '../animeFx.jsx';
import { WIDGETS } from '../data.js';
import { useLang } from '../i18n.jsx';
import CalculatorModal from './CalculatorModal.jsx';
import { goTo } from '../scroll.js';

export default function Widgets() {
  const { t, lang } = useLang();
  const [calcOpen, setCalcOpen] = useState(false);

  const handleWidgetClick = (id) => {
    if (id === 'calculator') {
      setCalcOpen(true);
    } else if (id === 'whatsapp') {
      window.open(
        'https://wa.me/628112223456?text=' +
          encodeURIComponent('Halo Estatewerks, saya ingin konsultasi mengenai jadwal private viewing & fitur WhatsApp widget.'),
        '_blank'
      );
    } else {
      goTo('#kontak');
    }
  };

  return (
    <section id="widgets" className="bg-charcoal py-24 text-bone sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
            {t.widKicker}
          </span>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{t.widTitle}</h2>
          <p className="mt-4 leading-relaxed text-bone/70">{t.widDesc}</p>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WIDGETS.map((w) => (
            <HoverCard
              key={w.id}
              lift={7}
              scale={1.02}
              onClick={() => handleWidgetClick(w.id)}
              className="group relative flex h-full cursor-pointer flex-col rounded-2xl border border-bone/10 bg-bone/5 p-7 transition-colors hover:border-terracotta/40 hover:bg-bone/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta/15 text-terracotta transition-transform group-hover:scale-110">
                <w.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-lg text-bone">{w.title[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone/70">{w.desc[lang]}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                {t.widDemo} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </HoverCard>
          ))}
        </Stagger>
      </div>

      {/* Interactive Calculator Modal */}
      <CalculatorModal isOpen={calcOpen} onClose={() => setCalcOpen(false)} />
    </section>
  );
}
