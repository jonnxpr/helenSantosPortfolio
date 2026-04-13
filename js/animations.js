/* ========================================
   Animation Utilities - Shared Scroll Effects
   ======================================== */

const AnimationUtils = (() => {
  const observeFadeInSelector = (selector, options = {}) => {
    const elements = Array.from(document.querySelectorAll(selector));
    if (elements.length === 0) return;

    const pendingElements = new Set(elements);
    let animationFrameId = 0;

    const cleanup = () => {
      observer.disconnect();
      globalThis.removeEventListener('scroll', requestVisibilityCheck);
      globalThis.removeEventListener('resize', requestVisibilityCheck);

      if (animationFrameId) {
        globalThis.cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const revealElement = (element) => {
      if (!pendingElements.has(element)) {
        return;
      }

      element.style.animation = 'fadeInOnScroll 0.6s ease-out forwards';
      pendingElements.delete(element);
      observer.unobserve(element);

      if (pendingElements.size === 0) {
        cleanup();
      }
    };

    const revealVisibleElements = () => {
      const viewportHeight = globalThis.innerHeight || document.documentElement.clientHeight;

      pendingElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const reachedViewport = rect.top <= viewportHeight - 40;
        const passedViewport = rect.bottom < 0;

        if (reachedViewport || passedViewport) {
          revealElement(element);
        }
      });
    };

    const requestVisibilityCheck = () => {
      if (animationFrameId) {
        return;
      }

      animationFrameId = globalThis.requestAnimationFrame(() => {
        animationFrameId = 0;
        revealVisibleElements();
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options,
    });

    elements.forEach((element) => {
      observer.observe(element);
    });

    globalThis.addEventListener('scroll', requestVisibilityCheck, { passive: true });
    globalThis.addEventListener('resize', requestVisibilityCheck);
    requestVisibilityCheck();
  };

  return {
    observeFadeInSelector,
  };
})();
