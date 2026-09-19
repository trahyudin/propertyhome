import React, { useEffect, useRef } from 'react';

export const staggerHidden = new WeakSet();

function isReduced() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function canHover() {
  try {
    return window.matchMedia('(hover: hover)').matches;
  } catch {
    return true;
  }
}

// ---- Staggered reveal on scroll ----
export function useStaggerReveal(opts = {}) {
  const {
    distance = 30,
    duration = 700,
    step = 85,
    axis = 'y',
    start = 0,
    threshold = 0.1,
  } = opts;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const kids = Array.from(el.children).filter((c) => c.nodeType === 1);
    if (!kids.length) return;

    const show = () => {
      kids.forEach((k) => {
        staggerHidden.delete(k);
        k.style.opacity = '1';
        k.style.transform = 'none';
        k.style.transition = '';
      });
    };

    if (isReduced() || typeof IntersectionObserver === 'undefined') {
      show();
      return;
    }

    kids.forEach((k) => {
      staggerHidden.add(k);
      k.style.opacity = '0';
      k.style.transform =
        axis === 'x' ? `translateX(${distance}px)` : `translateY(${distance}px)`;
      k.style.transition = `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    });

    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      io.disconnect();

      kids.forEach((k, idx) => {
        const delay = start + idx * step;
        setTimeout(() => {
          k.style.opacity = '1';
          k.style.transform = 'none';
          staggerHidden.delete(k);
        }, delay);
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) run();
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    io.observe(el);

    // Watchdog fallback
    const timer = setTimeout(() => {
      if (!done) run();
    }, 3500);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [distance, duration, step, axis, start, threshold]);

  return ref;
}

export function Stagger({ children, className = '', as: Tag = 'div', ...opts }) {
  const ref = useStaggerReveal(opts);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

// ---- Hover Card with smooth physics ----
export function useBlendHover(opts = {}) {
  const { lift = 6, scale = 1.02 } = opts;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isReduced() || !canHover()) return;

    el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease';

    const onEnter = () => {
      el.style.transform = `translateY(-${lift}px) scale(${scale})`;
    };
    const onLeave = () => {
      el.style.transform = 'translateY(0px) scale(1)';
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [lift, scale]);

  return ref;
}

export function HoverCard({ children, className = '', style, as: Tag = 'div', lift, scale, ...rest }) {
  const ref = useBlendHover({ lift, scale });
  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}

// ---- Ambient floating motion ----
export function useFloat(opts = {}) {
  const { y = 10, duration = 4000 } = opts;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isReduced()) return;

    let start = null;
    let reqId = null;

    const loop = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) % duration;
      const angle = (progress / duration) * Math.PI * 2;
      const currentY = Math.sin(angle) * y;
      el.style.transform = `translateY(${currentY}px)`;
      reqId = requestAnimationFrame(loop);
    };

    reqId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqId);
  }, [y, duration]);

  return ref;
}

// ---- Magnetic button effect ----
export function useMagnetic(opts = {}) {
  const { strength = 0.25, radius = 150 } = opts;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isReduced() || !canHover()) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      } else {
        el.style.transform = 'translate(0px, 0px)';
      }
    };

    const onLeave = () => {
      el.style.transform = 'translate(0px, 0px)';
    };

    el.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, radius]);

  return ref;
}
