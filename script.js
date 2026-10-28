/* ================================================================
   WALTER BENÍTEZ — script.js
   Sin dependencias. Todo el contenido es visible sin JavaScript.
   ================================================================ */

'use strict';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.getElementById('site-header');
const nav = document.getElementById('site-nav');
const toggle = document.getElementById('menu-toggle');
const mobileQuery = window.matchMedia('(max-width: 900px)');

/* ─── HEADER: fondo al hacer scroll y ocultar al bajar ─── */
let lastY = window.scrollY;
let ticking = false;

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 24);
  if (!header.classList.contains('is-open')) {
    const goingDown = y > lastY && y > 320;
    header.classList.toggle('is-hidden', goingDown);
  }
  lastY = Math.max(0, y);
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });
onScroll();

// Si el foco entra al header oculto (navegación con teclado), volver a mostrarlo
header.addEventListener('focusin', () => header.classList.remove('is-hidden'));

/* ─── MENÚ MÓVIL ─── */
function setMenu(open, { returnFocus = true } = {}) {
  header.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('.menu-toggle-label').textContent = open ? 'Cerrar' : 'Menú';
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    nav.querySelector('a')?.focus();
  } else if (returnFocus) {
    toggle.focus();
  }
}

toggle.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (header.classList.contains('is-open')) setMenu(false, { returnFocus: false });
  });
});

document.addEventListener('keydown', e => {
  if (!header.classList.contains('is-open')) return;

  if (e.key === 'Escape') {
    setMenu(false);
    return;
  }

  // Mantener el foco dentro del menú abierto
  if (e.key === 'Tab') {
    // Orden del DOM: logo → links del menú → botón de cierre
    const focusables = [header.querySelector('.brand'), ...nav.querySelectorAll('a'), toggle];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

mobileQuery.addEventListener('change', e => {
  if (!e.matches && header.classList.contains('is-open')) setMenu(false, { returnFocus: false });
});

/* ─── LINK ACTIVO SEGÚN LA SECCIÓN VISIBLE ─── */
const navLinks = [...nav.querySelectorAll('.nav-link')];
const sections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = '#' + entry.target.id;
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ─── APARICIÓN AL ENTRAR EN PANTALLA ─── */
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !reduceMotion.matches) {
  // Escalonar elementos hermanos que aparecen juntos
  revealEls.forEach(el => {
    const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    const idx = siblings.indexOf(el);
    if (idx > 0) el.style.setProperty('--reveal-delay', Math.min(idx, 5) * 0.08 + 's');
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-in'));
}

/* ─── PARALLAX SUAVE DEL TELÉFONO EN EL CASO WALLFOOD ─── */
const phone = document.querySelector('[data-parallax]');

if (phone && !reduceMotion.matches) {
  let phoneTicking = false;

  const updatePhone = () => {
    const rect = phone.parentElement.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom > 0 && rect.top < vh) {
      // -1 (entrando por abajo) → 1 (saliendo por arriba)
      const progress = 1 - (rect.top + rect.height / 2) / (vh / 2 + rect.height / 2);
      phone.style.transform = `translate3d(0, ${(-progress * 36).toFixed(1)}px, 0)`;
    }
    phoneTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!phoneTicking) {
      requestAnimationFrame(updatePhone);
      phoneTicking = true;
    }
  }, { passive: true });
  updatePhone();
}

/* ─── HORA LOCAL Y AÑO ─── */
const timeEl = document.getElementById('local-time');

if (timeEl) {
  const fmt = new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit', minute: '2-digit', hour12: false,
    timeZone: 'America/Argentina/Buenos_Aires',
  });
  const tick = () => {
    const now = new Date();
    timeEl.textContent = fmt.format(now) + ' (GMT-3)';
    timeEl.dateTime = now.toISOString();
  };
  tick();
  setInterval(tick, 30000);
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
