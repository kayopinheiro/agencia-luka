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
  const setMenuOpen = (isOpen) => {
    document.documentElement.classList.toggle('menu-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuOverlay.setAttribute('aria-hidden', String(!isOpen));
  };

  menuToggle.addEventListener('click', () => {
    setMenuOpen(!document.body.classList.contains('menu-open'));
  });

  menuOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('click', (event) => {
    const isOpen = document.body.classList.contains('menu-open');
    const clickedInsideMenu = menuOverlay.contains(event.target) || menuToggle.contains(event.target);

    if (isOpen && !clickedInsideMenu) {
      setMenuOpen(false);
    }
  });
}
