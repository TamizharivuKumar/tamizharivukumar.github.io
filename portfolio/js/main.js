/* =========================================
   PORTFOLIO — MAIN JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- ACTIVE NAV LINK ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- MOBILE MENU ---- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---- SCROLL ANIMATIONS ---- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- PROJECT FILTER ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      projectCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ---- CONTACT FORM ---- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate send (replace with real endpoint / Formspree / EmailJS)
      setTimeout(() => {
        form.style.display = 'none';
        const success = document.querySelector('.form-success');
        if (success) success.style.display = 'block';
      }, 1500);
    });
  }

  /* ---- SMOOTH NAV HIGHLIGHT ON SCROLL (single page) ---- */
  const sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
      });
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) a.classList.add('active');
      });
    }, { passive: true });
  }

  /* ---- TYPEWRITER EFFECT (home hero) ---- */
  const typeEl = document.querySelector('.hero-type');
  if (typeEl) {
    const words = ['API References', 'User Guides', 'Release Notes', 'Knowledge Bases', 'Dev Docs'];
    let wIdx = 0, cIdx = 0, deleting = false;
    const type = () => {
      const word = words[wIdx];
      if (!deleting) {
        typeEl.textContent = word.slice(0, ++cIdx);
        if (cIdx === word.length) {
          deleting = true;
          return setTimeout(type, 2000);
        }
      } else {
        typeEl.textContent = word.slice(0, --cIdx);
        if (cIdx === 0) {
          deleting = false;
          wIdx = (wIdx + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 60 : 100);
    };
    setTimeout(type, 800);
  }

});

/* ---- FADE-IN KEYFRAME (injected once) ---- */
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }`;
document.head.appendChild(style);
