// ============================================
// AGÊNCIA LUKA — Scroll Reveal (GSAP + ScrollTrigger)
//
// Uso:
//   data-reveal="fade-up|fade-left|fade-right|zoom"   → elemento único
//   data-reveal="stagger" [data-reveal-variant="..."] → anima os filhos diretos em sequência
//   data-reveal="parallax" [data-reveal-speed="0.2"]  → deslocamento contínuo ligado ao scroll
//
// O estado inicial (escondido) de cada variante vive em css/components.css.
// Este arquivo só decide QUANDO e COMO animar até o estado neutro.
//
// Elementos dentro do .hero são exceção: como já estão visíveis no load
// (sem scroll pra disparar o ScrollTrigger), eles tocam quando o evento
// 'luka:loaded' dispara — emitido por js/main.js junto com a saída da
// loading-screen — em vez de reagir à posição de scroll.
// ============================================
(function () {
  const revealEls = [...document.querySelectorAll('[data-reveal]')];
  if (!revealEls.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsapReady = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  // Reduced motion, ou GSAP indisponível (ex: CDN bloqueado): mostra tudo
  // direto, sem animação — nunca deixa conteúdo preso em opacity:0.
  if (prefersReducedMotion || !gsapReady) {
    revealEls.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      if (el.dataset.reveal === 'stagger') {
        [...el.children].forEach(child => {
          child.style.opacity = '1';
          child.style.transform = 'none';
        });
      }
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const EASE = 'power2.out';
  const DURATION = 0.9;
  const STAGGER_STEP = 0.1;

  // will-change só durante a transição ativa — evita manter camadas de
  // composição na GPU depois que o elemento já assentou.
  function withWillChange(targets, tween) {
    gsap.set(targets, { willChange: 'transform, opacity' });
    tween.eventCallback('onComplete', () => gsap.set(targets, { willChange: 'auto' }));
    return tween;
  }

  const heroTweens = [];

  revealEls.forEach(el => {
    const variant = el.dataset.reveal;
    const isHero = !!el.closest('.hero');

    if (variant === 'parallax') {
      const speed = parseFloat(el.dataset.revealSpeed) || 0.15;
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      return;
    }

    if (variant === 'stagger') {
      const children = [...el.children];
      if (!children.length) return;
      const tween = gsap.to(children, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: DURATION,
        ease: EASE,
        stagger: STAGGER_STEP,
        paused: isHero,
        scrollTrigger: isHero ? undefined : {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
      withWillChange(children, tween);
      if (isHero) heroTweens.push(tween);
      return;
    }

    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: DURATION,
      ease: EASE,
      paused: isHero,
      scrollTrigger: isHero ? undefined : {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
    withWillChange(el, tween);
    if (isHero) heroTweens.push(tween);
  });

  if (heroTweens.length) {
    document.addEventListener('luka:loaded', () => {
      heroTweens.forEach(t => t.play());
    }, { once: true });
  }
})();
