export function goTo(selector, offset = -84) {
  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(selector, { offset });
    return;
  }
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
