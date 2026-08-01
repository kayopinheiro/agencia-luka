// ============================================
// AGÊNCIA LUKA — Custom Cursor
// ============================================

(function () {
  const canHover = window.matchMedia('(pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!canHover || reducedMotion) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');
  dot.innerHTML = '<svg class="cursor-dot__arrow" viewBox="0 0 24 24"><path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z"/></svg>';
  document.body.appendChild(dot);
  document.documentElement.classList.add('has-custom-cursor');

  const hoverSelector = 'a, button, .btn, input, textarea, select, [role="button"], label';
  const NORMAL_SCALE = 0.35;
  const HOVER_SCALE = 1;

  // GSAP compõe translate + scale num único transform inline por elemento,
  // então as duas tweens (posição e escala) não brigam entre si.
  let moveX, moveY, setHover;
  if (window.gsap) {
    gsap.set(dot, { scale: NORMAL_SCALE, force3D: true });
    moveX = gsap.quickTo(dot, 'x', { duration: 0.5, ease: 'power3', force3D: true });
    moveY = gsap.quickTo(dot, 'y', { duration: 0.5, ease: 'power3', force3D: true });
    setHover = (isHover) => {
      gsap.to(dot, { scale: isHover ? HOVER_SCALE : NORMAL_SCALE, duration: 0.25, ease: 'power2.out', force3D: true });
    };
  } else {
    // Fallback lerp caso o GSAP não esteja carregado na página.
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let targetScale = NORMAL_SCALE, currentScale = NORMAL_SCALE;
    const lerp = (a, b, n) => a + (b - a) * n;
    const tick = () => {
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);
      currentScale = lerp(currentScale, targetScale, 0.2);
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale})`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    moveX = (x) => { targetX = x; };
    moveY = (y) => { targetY = y; };
    setHover = (isHover) => { targetScale = isHover ? HOVER_SCALE : NORMAL_SCALE; };
  }

  document.addEventListener('mousemove', (e) => {
    dot.classList.add('is-visible');
    moveX(e.clientX);
    moveY(e.clientY);
  });

  document.addEventListener('mouseleave', () => {
    dot.classList.remove('is-visible');
  });

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelector)) {
      dot.classList.add('is-hover');
      setHover(true);
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelector)) {
      dot.classList.remove('is-hover');
      setHover(false);
    }
  });
})();
