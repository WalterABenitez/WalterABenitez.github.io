/* ================================================================
   WALTER BENITEZ PORTFOLIO — script.js
   ================================================================ */

'use strict';

/* ─── THEME ─── */
(function initTheme() {
  const saved = localStorage.getItem('wb-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
})();

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('wb-theme', next);
  updateThemeIcon(next);
});

/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');

let trailX = 0, trailY = 0, cursorX = 0, cursorY = 0;
let animFrame;

document.addEventListener('mousemove', e => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  if (cursor) { cursor.style.left = cursorX + 'px'; cursor.style.top = cursorY + 'px'; }
});

function animateTrail() {
  trailX += (cursorX - trailX) * 0.12;
  trailY += (cursorY - trailY) * 0.12;
  if (trail) { trail.style.left = trailX + 'px'; trail.style.top = trailY + 'px'; }
  animFrame = requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .project-card, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => { if(cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; if(trail) trail.style.transform = 'translate(-50%,-50%) scale(0.5)'; });
  el.addEventListener('mouseleave', () => { if(cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)'; if(trail) trail.style.transform = 'translate(-50%,-50%) scale(1)'; });
});

/* ─── NAVBAR SCROLL HIDE/SHOW ─── */
const navbar = document.getElementById('navbar');
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 80) {
        navbar?.classList.add('hidden');
      } else {
        navbar?.classList.remove('hidden');
      }
      lastScroll = Math.max(0, currentScroll);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ─── MOBILE BURGER MENU ─── */
const burger   = document.getElementById('nav-burger');
const navLinks = document.getElementById('nav-links');

burger?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close menu on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger?.classList.remove('open');
    burger?.setAttribute('aria-expanded', 'false');
  });
});

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ─── TYPEWRITER ─── */
const typeEl = document.getElementById('typewriter');
const roles = ['Desarrollador Web', 'Desarrollador Fullstack', 'Apasionado por Docker & AWS', 'Solucionador de Problemas'];
let roleIdx = 0, charIdx = 0, deleting = false;

function typeWriter() {
  if (!typeEl) return;
  const current = roles[roleIdx];
  if (deleting) {
    charIdx--;
    typeEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeWriter, 400);
      return;
    }
    setTimeout(typeWriter, 45);
  } else {
    charIdx++;
    typeEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; typeWriter(); }, 2200);
      return;
    }
    setTimeout(typeWriter, 80);
  }
}
setTimeout(typeWriter, 1000);

/* ─── REVEAL ON SCROLL ─── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.1 + 's';
  revealObserver.observe(el);
});

/* ─── SKILL BARS ANIMATION ─── */
const skillBarObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        const w = fill.getAttribute('data-width');
        fill.style.width = w + '%';
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-col').forEach(col => skillBarObserver.observe(col));

/* ─── PROJECT PROGRESS BAR ANIMATION ─── */
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.project-progress-fill');
      const target = fill?.getAttribute('data-target');
      if (fill && target) {
        setTimeout(() => { fill.style.width = target + '%'; }, 300);
      }
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.project-featured').forEach(el => progressObserver.observe(el));

/* ─── SMOOTH SCROLL FOR ANCHOR LINKS ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = navbar?.offsetHeight || 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── HERO PARALLAX SUBTLE ─── */
const heroGlow = document.querySelector('.hero-glow');
window.addEventListener('mousemove', e => {
  if (!heroGlow) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
}, { passive: true });

/* ─── GALLERY KEYBOARD ACCESSIBILITY ─── */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.classList.toggle('focused');
    }
  });
});

/* ─── STAGGER DELAY FOR PROJECT CARDS ─── */
document.querySelectorAll('.projects-grid .project-card').forEach((card, i) => {
  card.style.transitionDelay = i * 0.08 + 's';
});
