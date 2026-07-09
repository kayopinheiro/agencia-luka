// ============================================
// AGÊNCIA LUKA — Main JS
// ============================================

// Loading screen — exibida apenas no primeiro carregamento da sessão
(function () {
  const loadingScreen = document.getElementById('loading-screen');

  // Dispara quando a tela de loading libera a view — o reveal do hero
  // (js/scroll-reveal.js) escuta esse evento em vez de usar ScrollTrigger,
  // já que o hero está sempre visível no load e não depende de scroll.
  if (!loadingScreen) {
    document.dispatchEvent(new CustomEvent('luka:loaded'));
    return;
  }

  if (sessionStorage.getItem('lukaLoaded')) {
    loadingScreen.remove();
    document.dispatchEvent(new CustomEvent('luka:loaded'));
    return;
  }

  requestAnimationFrame(() => {
    loadingScreen.classList.add('is-loading');
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('is-hidden');
      sessionStorage.setItem('lukaLoaded', '1');
      loadingScreen.addEventListener('transitionend', () => {
        loadingScreen.remove();
        document.dispatchEvent(new CustomEvent('luka:loaded'));
      }, { once: true });
    }, 1700);
  });
})();

// Ano atual no copyright
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
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
