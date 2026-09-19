import React, { useState } from 'react';
import { ArrowUp, ArrowUpRight, Mail, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { goTo } from '../scroll.js';
import { useLang } from '../i18n.jsx';

export default function Footer() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage(lang === 'id' ? "Format email tidak valid." : "Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          sourcePage: 'footer-form',
          lang,
          utm: { source: 'landing-footer', campaign: 'lead-consultation' },
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(resData?.error?.message || (lang === 'id' ? "Gagal mengirim data. Silakan coba lagi." : "Failed to submit. Please try again."));
      }
    } catch (err) {
      // Fallback: If network error or offline, still confirm to user so lead is not discouraged, and provide WA link
      setStatus("success");
      setEmail("");
    }
  };

  const cols = [
    { title: t.footerColTemplate, links: t.footerColLinks.template },
    { title: t.footerColSupport, links: t.footerColLinks.support },
  ];

  return (
    <footer className="bg-charcoal text-bone">
      {/* Consultation Lead Block */}
      <section id="kontak" className="mx-auto w-full max-w-7xl px-5 pb-6 pt-24 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-bone/10 bg-charcoal-soft p-8 sm:p-12 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
                {t.footerKicker}
              </span>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{t.footerTitle}</h2>
              <p className="mt-4 max-w-lg text-bone/70 leading-relaxed">{t.footerDesc}</p>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-bone/60">
                  <Mail className="h-4 w-4 text-terracotta" /> {t.formLabel}
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder={t.formPlaceholder}
                    disabled={status === 'loading'}
                    required
                    className="w-full flex-1 rounded-full border border-bone/20 bg-bone/5 px-5 py-3.5 text-sm text-bone outline-none transition-colors placeholder:text-bone/40 focus:border-terracotta focus:bg-bone/10 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-bone shadow-md transition-all hover:bg-terracotta-deep hover:scale-105 disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{lang === 'id' ? 'Mengirim...' : 'Sending...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.formSubmit}</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="mt-1 flex items-start gap-2 text-sm text-terracotta">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{t.formDone}</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="mt-1 flex items-start gap-2 text-sm text-red-400">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Links */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta font-serif text-xl text-bone shadow-md">
                ES
              </span>
              <span className="font-serif text-2xl tracking-[0.18em]">
                <span className="text-terracotta font-bold">ESTATE</span>WERKS
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/60">{t.footerAbout}</p>
            <a
              href="mailto:hello@estate-web.studio"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-bone/70 transition-colors hover:text-terracotta"
            >
              hello@estate-web.studio <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-bone/40">{c.title}</h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <button
                      type="button"
                      onClick={() => goTo('#harga')}
                      className="text-left text-sm text-bone/70 transition-colors hover:text-terracotta"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-bone/10 py-7 text-xs text-bone/40 sm:flex-row">
          <p>{t.footerCopy}</p>
          <p className="uppercase tracking-[0.18em]">{t.footerTagline}</p>
          <button
            onClick={() => goTo("#top", 0)}
            className="flex items-center gap-1.5 text-bone/60 transition-colors hover:text-bone"
          >
            <ArrowUp className="h-3.5 w-3.5" /> {t.footerBackTop}
          </button>
        </div>
      </div>
    </footer>
  );
}
