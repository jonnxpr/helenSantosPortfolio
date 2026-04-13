/* ========================================
   Navigation Module - Smooth Scroll & Menu
   ======================================== */

const Navigation = (() => {
  const init = () => {
    setupMenuAutoClose();
    setupActiveSectionTracking();
  };

  const setupMenuAutoClose = () => {
    const navbarToggler = document.querySelector('.navbar__toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar__link');

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
  };

  const setupActiveSectionTracking = () => {
    const navLinks = Array.from(document.querySelectorAll('.navbar__link[href^="#"]'));
    if (navLinks.length === 0) return;

    const sections = navLinks
      .map((link) => {
        const targetId = link.getAttribute('href');
        if (!targetId) return null;

        const section = document.querySelector(targetId);
        if (!section) return null;

        return { link, section };
      })
      .filter(Boolean);

    if (sections.length === 0) return;

    const sectionIds = new Set(sections.map(({ section }) => section.id));

    let activeIndex = 0;
    let lastScrollY = globalThis.scrollY;
    const hysteresisOffset = 48;
    let manualLock = null;

    const setActiveLink = (activeId) => {
      const resolvedId = sectionIds.has(activeId) ? activeId : sections[0].section.id;

      sections.forEach(({ link, section }) => {
        const isActive = section.id === resolvedId;
        link.classList.toggle('active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const resolveActiveIndexByReference = (referenceY) => {
      let index = 0;

      sections.forEach(({ section }, sectionIndex) => {
        if (section.offsetTop <= referenceY) {
          index = sectionIndex;
        }
      });

      return index;
    };

    const resolveActiveSectionByScroll = () => {
      const navbarHeight = document.querySelector('.navbar--fixed')?.offsetHeight ?? 0;
      const referenceY = globalThis.scrollY + navbarHeight + 24;

      if (manualLock) {
        const targetSection = sections[manualLock.index]?.section;
        const targetReached = targetSection
          ? Math.abs(referenceY - targetSection.offsetTop) <= 36
          : true;

        setActiveLink(manualLock.id);

        if (targetReached || Date.now() >= manualLock.expiresAt) {
          manualLock = null;
        }

        return;
      }

      const scrollingDown = globalThis.scrollY >= lastScrollY;
      lastScrollY = globalThis.scrollY;

      const adjustedReferenceY = scrollingDown
        ? referenceY + hysteresisOffset
        : referenceY - hysteresisOffset;

      activeIndex = resolveActiveIndexByReference(adjustedReferenceY);

      setActiveLink(sections[activeIndex].section.id);
    };

    const handleScroll = () => {
      resolveActiveSectionByScroll();
    };

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const targetId = link.getAttribute('href')?.slice(1);
        if (!targetId) return;

        const nextIndex = sections.findIndex(({ section }) => section.id === targetId);
        if (nextIndex >= 0) {
          activeIndex = nextIndex;
          manualLock = {
            id: targetId,
            index: nextIndex,
            expiresAt: Date.now() + 1600,
          };
        }

        setActiveLink(targetId);
      });
    });

    globalThis.addEventListener('scroll', handleScroll, { passive: true });
    globalThis.addEventListener('resize', handleScroll);
    globalThis.addEventListener('hashchange', handleScroll);
    globalThis.addEventListener('wheel', () => {
      manualLock = null;
    }, { passive: true });
    globalThis.addEventListener('touchstart', () => {
      manualLock = null;
    }, { passive: true });
    globalThis.addEventListener('keydown', () => {
      manualLock = null;
    });

    handleScroll();
  };

  return {
    init,
  };
})();
