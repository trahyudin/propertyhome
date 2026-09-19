import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Languages, Menu, Moon, Sun, X } from 'lucide-react';
import { goTo } from '../scroll.js';
import { useLang } from '../i18n.jsx';

export default function Navbar() {
  const { t, lang, setLang, toggleLang, theme, toggleTheme } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkCls = (isScrolled) =>
    `text-[13px] font-medium uppercase tracking-[0.12em] transition-colors hover:text-terracotta dark:hover:text-terracotta ${
      isScrolled ? 'text-charcoal dark:text-bone/85' : 'text-bone/90 hover:text-bone'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-300 ${
        scrolled
          ? 'border-b border-[#1a1a1a]/10 bg-sand/90 shadow-sm backdrop-blur-md dark:border-bone/10 dark:bg-charcoal/90'
          : 'bg-gradient-to-b from-charcoal/70 to-transparent'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={() => goTo('#top', 0)}
          aria-label={t.navAriaTop}
          className="flex items-center gap-2.5 text-left transition-transform hover:scale-105"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta font-serif text-xl text-bone shadow-md">
            ES
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className={`font-serif text-lg tracking-[0.14em] font-bold ${scrolled ? 'text-charcoal dark:text-bone' : 'text-bone drop-shadow-[0_1px_10px_rgba(26,26,26,0.8)]'}`}>
              ESTATEWERKS
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-terracotta font-semibold">
              {t.navBrandTag}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {t.navLinks.map((l) => (
            <button key={l.href} onClick={() => goTo(l.href)} className={linkCls(scrolled)}>
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Language"
            className={`hidden items-center rounded-full border p-1 sm:flex ${
              scrolled ? 'border-charcoal/20 dark:border-bone/30' : 'border-bone/30 bg-charcoal/30'
            }`}
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <button
              type="button"
              onClick={() => setLang('id')}
              aria-pressed={lang === 'id'}
              className={`flex h-8 w-11 items-center justify-center gap-1 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all ${
                lang === 'id' ? 'bg-terracotta text-bone shadow-sm' : 'text-bone/80 hover:text-bone'
              }`}
            >
              <Languages className="h-3.5 w-3.5" /> ID
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`flex h-8 w-11 items-center justify-center gap-1 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all ${
                lang === 'en' ? 'bg-terracotta text-bone shadow-sm' : 'text-bone/80 hover:text-bone'
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
              scrolled
                ? 'border-charcoal/20 text-charcoal hover:bg-charcoal/5 dark:border-bone/30 dark:text-bone dark:hover:bg-bone/10'
                : 'border-bone/30 bg-charcoal/30 text-bone hover:bg-charcoal/50'
            }`}
            style={{ backdropFilter: 'blur(8px)' }}
          >
            {theme === 'dark' ? (
              <Sun className="h-[18px] w-[18px] text-amber-300" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>

          {/* CTA Button */}
          <button
            onClick={() => goTo('#harga')}
            className="hidden items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-[13px] font-semibold text-bone transition-all hover:bg-terracotta-deep hover:shadow-lg sm:inline-flex"
          >
            {t.navCta}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={t.navMenuAria}
            aria-expanded={open}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
              scrolled
                ? 'border-charcoal/20 text-charcoal dark:border-bone/30 dark:text-bone'
                : 'border-bone/40 text-bone'
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-bone/15 bg-charcoal-soft/95 backdrop-blur-md"
          >
            <div className="flex flex-col gap-1 px-5 py-4 sm:px-8 lg:hidden">
              {t.navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => {
                    setOpen(false);
                    goTo(l.href);
                  }}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-bone/80 transition-colors hover:bg-bone/10"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  goTo('#harga');
                }}
                className="mt-2 rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-bone"
              >
                {t.navCta}
              </button>
              <div role="group" aria-label="Language" className="mt-2 flex gap-2">
                <button
                  onClick={() => {
                    setLang('id');
                    setOpen(false);
                  }}
                  aria-pressed={lang === 'id'}
                  className={`flex-1 rounded-full border px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide ${
                    lang === 'id'
                      ? 'border-terracotta bg-terracotta text-bone'
                      : 'border-bone/30 text-bone/80'
                  }`}
                >
                  Bahasa Indonesia
                </button>
                <button
                  onClick={() => {
                    setLang('en');
                    setOpen(false);
                  }}
                  aria-pressed={lang === 'en'}
                  className={`flex-1 rounded-full border px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide ${
                    lang === 'en'
                      ? 'border-terracotta bg-terracotta text-bone'
                      : 'border-bone/30 text-bone/80'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
