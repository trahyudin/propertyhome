import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Pillars from './components/Pillars.jsx';
import Solutions from './components/Solutions.jsx';
import Widgets from './components/Widgets.jsx';
import CaseStudies from './components/CaseStudies.jsx';
import Portfolio from './components/Portfolio.jsx';
import Faq from './components/Faq.jsx';
import Pricing from './components/Pricing.jsx';
import WhatsAppBar from './components/WhatsAppBar.jsx';
import Footer from './components/Footer.jsx';
import LangProvider from './i18n.jsx';
import { staggerHidden } from './animeFx.jsx';

function MainLayout() {
  useEffect(() => {
    const forceReveal = () => {
      document.querySelectorAll('[style*="opacity"]').forEach((el) => {
        if (staggerHidden.has(el)) return;
        if (getComputedStyle(el).opacity === '0' && el.style.transform) {
          el.style.opacity = '1';
          el.style.transform = '';
        }
      });
    };
    const pass1 = setTimeout(forceReveal, 2500);
    const pass2 = setTimeout(forceReveal, 6000);
    return () => {
      clearTimeout(pass1);
      clearTimeout(pass2);
    };
  }, []);

  useEffect(() => {
    let lenis = null;
    let raf = 0;
    try {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      const loop = (t) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      window.__lenis = lenis;
    } catch (err) {
      console.warn('Lenis smooth scroll error', err);
    }
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-sand font-sans text-charcoal transition-colors duration-300 dark:bg-[#141414] dark:text-bone">
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <Solutions />
        <Widgets />
        <CaseStudies />
        <Portfolio />
        <Pricing />
        <Faq />
      </main>
      <Footer />
      <WhatsAppBar />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <MainLayout />
    </LangProvider>
  );
}
