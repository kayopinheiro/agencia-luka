(function () {
  const section = document.querySelector('.cases');
  const card = document.querySelector('.cases__card');
  const list = document.querySelector('.cases__list');

  if (!section || !card || !list) return;

  const desktopQuery = window.matchMedia('(min-width: 1025px)');
  let scrollDistance = 0;

  function setup() {
    if (!desktopQuery.matches) {
      section.style.height = '';
      list.style.transform = '';
      scrollDistance = 0;
      return;
    }

    const cardStyle = getComputedStyle(card);
    const paddingY = parseFloat(cardStyle.paddingTop) + parseFloat(cardStyle.paddingBottom);
    const windowHeight = card.clientHeight - paddingY;
    const listHeight = list.scrollHeight;

    scrollDistance = Math.max(0, listHeight - windowHeight);
    section.style.height = `${card.offsetHeight + scrollDistance}px`;
  }

  function onScroll() {
    if (!desktopQuery.matches || scrollDistance === 0) {
      return;
    }

    const rect = section.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top, 0), scrollDistance) / scrollDistance;

    list.style.transform = `translateY(-${progress * scrollDistance}px)`;
  }

  window.addEventListener('resize', setup);
  window.addEventListener('scroll', onScroll, { passive: true });

  setup();
  onScroll();

  /* ── Mobile: carrossel 1 card por vez, autoplay + barra de progresso ── */
  const mobileQuery = window.matchMedia('(max-width: 768px)');
  const slides = [...list.querySelectorAll('.card-service')];
  const progressBar = document.querySelector('.cases__progress-bar');

  const AUTOPLAY_DELAY = 4000;
  const RESUME_DELAY = 3000;
  let autoplayTimer = null;
  let resumeTimer = null;

  function getCurrentIndex() {
    if (!list.clientWidth) return 0;
    return Math.round(list.scrollLeft / list.clientWidth);
  }

  function setProgress(index) {
    if (!progressBar || !slides.length) return;
    progressBar.style.transform = `scaleX(${(index + 1) / slides.length})`;
  }

  function goToSlide(index) {
    const total = slides.length;
    const target = ((index % total) + total) % total;
    list.scrollTo({ left: target * list.clientWidth, behavior: 'smooth' });
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    if (!mobileQuery.matches) return;
    autoplayTimer = setInterval(() => goToSlide(getCurrentIndex() + 1), AUTOPLAY_DELAY);
  }

  function pauseAutoplay() {
    if (!mobileQuery.matches) return;
    stopAutoplay();
    if (resumeTimer) clearTimeout(resumeTimer);
  }

  function scheduleResume() {
    if (!mobileQuery.matches) return;
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(startAutoplay, RESUME_DELAY);
  }

  function onListScroll() {
    if (!mobileQuery.matches) return;
    setProgress(getCurrentIndex());
  }

  function setupMobile() {
    if (mobileQuery.matches) {
      setProgress(getCurrentIndex());
      startAutoplay();
    } else {
      stopAutoplay();
      if (resumeTimer) clearTimeout(resumeTimer);
      if (progressBar) progressBar.style.transform = '';
    }
  }

  list.addEventListener('scroll', onListScroll, { passive: true });
  list.addEventListener('pointerdown', pauseAutoplay);
  list.addEventListener('touchstart', pauseAutoplay, { passive: true });
  list.addEventListener('pointerup', scheduleResume);
  list.addEventListener('touchend', scheduleResume);
  mobileQuery.addEventListener('change', setupMobile);

  setupMobile();
})();
