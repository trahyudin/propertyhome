import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calculator, Check, MessageCircle, X } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { goTo } from '../scroll.js';

function formatCurrency(amount, lang) {
  if (lang === 'id') {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount / 15500);
}

function Slider({ label, value, display, min, max, step, onChange }) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/70 dark:text-bone/70">{label}</span>
        <span className="font-serif text-base font-semibold text-terracotta">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--fill': `${fill}%` }}
        className="h-2 w-full cursor-pointer"
      />
    </div>
  );
}

export default function CalculatorModal({ isOpen, onClose }) {
  const { lang, t } = useLang();
  
  // Base price in IDR: 3.5 Miliar (or $225k USD)
  const [price, setPrice] = useState(3500000000);
  const [downPct, setDownPct] = useState(20);
  const [term, setTerm] = useState(15);
  const [rate, setRate] = useState(6.5);

  const down = (price * downPct) / 100;
  const principal = price - down;
  const r = rate / 100 / 12;
  const n = term * 12;
  const monthly =
    principal > 0
      ? r > 0
        ? (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        : principal / n
      : 0;
  const totalInterest = monthly * n - principal;
  const total = down + monthly * n;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-bone/20 bg-bone p-6 shadow-2xl dark:border-bone/10 dark:bg-charcoal-soft sm:p-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#1a1a1a]/10 pb-5 dark:border-bone/10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-terracotta/15 text-terracotta">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal dark:text-bone sm:text-3xl">
                  {t.calcTitle}
                </h3>
                <p className="mt-1 text-xs text-ink/75 dark:text-bone/70 sm:text-sm">
                  {t.calcSubtitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label={t.calcClose}
              className="rounded-full p-2 text-charcoal/60 transition-colors hover:bg-sand hover:text-charcoal dark:text-bone/60 dark:hover:bg-charcoal dark:hover:text-bone"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Body: Inputs & Results */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            {/* Sliders */}
            <div className="space-y-6">
              <Slider
                label={lang === 'id' ? 'Harga Properti' : 'Property Value'}
                value={price}
                min={500000000}
                max={20000000000}
                step={100000000}
                onChange={setPrice}
                display={formatCurrency(price, lang)}
              />

              <Slider
                label={lang === 'id' ? `Uang Muka (DP ${downPct}%)` : `Down Payment (${downPct}%)`}
                value={downPct}
                min={10}
                max={70}
                step={5}
                onChange={setDownPct}
                display={formatCurrency(down, lang)}
              />

              <Slider
                label={lang === 'id' ? 'Jangka Waktu (Tenor)' : 'Loan Term'}
                value={term}
                min={5}
                max={30}
                step={1}
                onChange={setTerm}
                display={`${term} ${lang === 'id' ? 'Tahun' : 'Years'}`}
              />

              <Slider
                label={lang === 'id' ? 'Suku Bunga Tahunan (Fixed)' : 'Annual Interest Rate'}
                value={rate}
                min={3}
                max={12}
                step={0.25}
                onChange={setRate}
                display={`${rate.toFixed(2)}%`}
              />
            </div>

            {/* Result Summary Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-terracotta/20 bg-sand p-6 dark:border-bone/10 dark:bg-charcoal sm:p-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-terracotta">
                  {lang === 'id' ? 'Estimasi Cicilan Bulanan' : 'Estimated Monthly Payment'}
                </span>
                <p className="mt-2 font-serif text-3xl font-bold text-charcoal dark:text-bone sm:text-4xl">
                  {formatCurrency(monthly, lang)}
                </p>
                <p className="mt-1 text-xs text-ink/75 dark:text-bone/70">
                  {lang === 'id' ? `per bulan · tenor ${term} tahun` : `per month · ${term} years term`}
                </p>

                {/* Details Breakdown */}
                <div className="mt-6 space-y-2.5 border-t border-[#1a1a1a]/10 pt-4 text-xs dark:border-bone/10 sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink/80 dark:text-bone/70">{lang === 'id' ? 'Pokok Pinjaman' : 'Loan Principal'}</span>
                    <span className="font-semibold text-charcoal dark:text-bone">{formatCurrency(principal, lang)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/80 dark:text-bone/70">{lang === 'id' ? 'Total Bunga' : 'Total Interest'}</span>
                    <span className="font-semibold text-charcoal dark:text-bone">{formatCurrency(totalInterest, lang)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#1a1a1a]/10 pt-2 font-bold dark:border-bone/10">
                    <span className="text-charcoal dark:text-bone">{lang === 'id' ? 'Total Pengembalian' : 'Total Cost'}</span>
                    <span className="text-terracotta">{formatCurrency(total, lang)}</span>
                  </div>
                </div>

                {/* Ratio Bar */}
                <div className="mt-6">
                  <div className="flex h-2.5 overflow-hidden rounded-full bg-[#1a1a1a]/10 dark:bg-bone/10">
                    <div className="bg-terracotta" style={{ width: `${downPct}%` }} />
                    <div className="bg-charcoal dark:bg-bone" style={{ width: `${100 - downPct}%` }} />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-ink/70 dark:text-bone/70">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-terracotta" /> DP {downPct}%
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-charcoal dark:bg-bone" /> Pinjaman {100 - downPct}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={`https://wa.me/628112223456?text=${encodeURIComponent(
                    `Halo Estatewerks, saya ingin simulasi KPR properti seharga ${formatCurrency(price, 'id')} dengan DP ${downPct}% dan tenor ${term} tahun.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-terracotta px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-bone shadow-md transition-all hover:bg-terracotta-deep hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4" />
                  {lang === 'id' ? 'Konsultasi via WhatsApp' : 'Consult on WhatsApp'}
                </a>
                <button
                  onClick={() => {
                    onClose();
                    goTo('#kontak');
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#1a1a1a]/20 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-charcoal transition-colors hover:bg-charcoal hover:text-bone dark:border-bone/20 dark:text-bone dark:hover:bg-bone dark:hover:text-charcoal"
                >
                  {lang === 'id' ? 'Form Kontak' : 'Contact Form'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
