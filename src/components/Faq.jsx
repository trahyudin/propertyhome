import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { FAQS } from '../data.js';
import { useLang } from '../i18n.jsx';

export default function Faq() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
          {t.faqKicker}
        </span>
        <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal dark:text-bone sm:text-5xl">
          {t.faqTitle}
        </h2>
      </Reveal>

      <div className="mt-12 space-y-3.5">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q.id} delay={i * 0.04}>
              <div className="overflow-hidden rounded-2xl border border-line bg-bone shadow-sm transition-colors hover:border-terracotta/30 dark:border-bone/15 dark:bg-charcoal-soft">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                >
                  <span className="font-serif text-lg font-medium text-charcoal dark:text-bone">
                    {item.q[lang]}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-terracotta transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ink dark:text-bone/75">
                        {item.a[lang]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
