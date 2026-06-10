// ============================================
// AGÊNCIA LUKA — Main JS
// ============================================

// Loading screen — exibida apenas no primeiro carregamento da sessão
(function () {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  if (sessionStorage.getItem('lukaLoaded')) {
    loadingScreen.remove();
    return;
  }

  requestAnimationFrame(() => {
    loadingScreen.classList.add('is-loading');
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('is-hidden');
      sessionStorage.setItem('lukaLoaded', '1');
      loadingScreen.addEventListener('transitionend', () => loadingScreen.remove(), { once: true });
    }, 1700);
  });
})();

// Ano atual no copyright
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});

// Menu overlay
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('.menu-overlay');

if (menuToggle && menuOverlay) {
  menuToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuOverlay.setAttribute('aria-hidden', String(!isOpen));
  });

  menuOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuOverlay.setAttribute('aria-hidden', 'true');
    });
  });
}
