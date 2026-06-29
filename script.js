/* =====================================================================
   CASA DEL SOL  —  site script
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Mobile slide-out menu ---------- */
  const toggle  = document.querySelector(".menu-toggle");
  const menu    = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  const closeMenu = () => {
    menu?.classList.remove("open");
    overlay?.classList.remove("open");
    toggle?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  const openMenu = () => {
    menu?.classList.add("open");
    overlay?.classList.add("open");
    toggle?.classList.add("open");
    toggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  toggle?.addEventListener("click", () => {
    menu?.classList.contains("open") ? closeMenu() : openMenu();
  });
  overlay?.addEventListener("click", closeMenu);
  menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

  /* ---------- Slideshow ---------- */
  const show = document.querySelector(".slideshow");
  if (show) {
    const slides = [...show.querySelectorAll(".slide")];
    const dotsBox = document.querySelector(".dots");
    let idx = 0, timer = null;
    const DELAY = 2000;

    // build dots
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", "Go to slide " + (i + 1));
      b.addEventListener("click", () => { go(i); restart(); });
      dotsBox?.appendChild(b);
    });
    const dots = dotsBox ? [...dotsBox.children] : [];

    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("active", i === idx));
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    }
    const next = () => go(idx + 1);
    const prev = () => go(idx - 1);

    function start() { timer = setInterval(next, DELAY); }
    function restart() { clearInterval(timer); start(); }

    document.querySelector(".slide-arrow.next")?.addEventListener("click", () => { next(); restart(); });
    document.querySelector(".slide-arrow.prev")?.addEventListener("click", () => { prev(); restart(); });

    // pause on hover (desktop nicety)
    show.addEventListener("mouseenter", () => clearInterval(timer));
    show.addEventListener("mouseleave", start);

    go(0);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("in"));
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
