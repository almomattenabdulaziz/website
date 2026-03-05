// script.js

// Smooth scroll for nav links
document.querySelectorAll('a[data-scroll]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || !id.startsWith('#')) return;
    const el = document.querySelector(id);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', id);
  });
});

// Intersection reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    for (const ent of entries) {
      if (ent.isIntersecting) ent.target.classList.add('show');
    }
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// Tiny hover tilt (subtle)
document.querySelectorAll('.card').forEach((card) => {
  let raf = null;

  function onMove(e) {
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width;
    const dy = (e.clientY - cy) / r.height;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      card.style.transform = `translateY(-4px) rotateX(${(-dy * 2).toFixed(
        2
      )}deg) rotateY(${(dx * 3).toFixed(2)}deg)`;
    });
  }

  function onLeave() {
    if (raf) cancelAnimationFrame(raf);
    card.style.transform = '';
  }

  // Only tilt on devices with fine pointer (mouse)
  const fine = window.matchMedia('(pointer:fine)').matches;
  if (fine) {
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  }
});