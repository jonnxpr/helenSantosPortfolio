/* ========================================
   Hero Module - Dynamic Tech Stack and CTAs
   ======================================== */

const Hero = (() => {
  let heroData = {
    techStack: [],
    ctaButtons: [],
  };
  let languageListenerBound = false;

  const withAssetVersion = (path) => {
    const version = document.querySelector('meta[name="asset-version"]')?.getAttribute('content')?.trim();
    if (!version) return path;

    const separator = path.includes('?') ? '&' : '?';
    return `${path}${separator}v=${encodeURIComponent(version)}`;
  };

  const sanitizeActionHref = (rawHref) => {
    if (typeof rawHref !== 'string' || rawHref.trim().length === 0) {
      return null;
    }

    if (rawHref.startsWith('#')) {
      return rawHref;
    }

    try {
      const parsed = new URL(rawHref, globalThis.location.origin);
      const allowedProtocols = new Set(['https:', 'http:', 'mailto:']);
      if (!allowedProtocols.has(parsed.protocol)) {
        return null;
      }

      return parsed.href;
    } catch {
      return null;
    }
  };

  const init = async () => {
    await loadHeroData();
    renderHeroSections();
    setupLanguageListener();
  };

  const loadHeroData = async () => {
    try {
      const response = await fetch(withAssetVersion('data/hero.json'), { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to load hero data');
      }

      const data = await response.json();
      heroData = {
        techStack: Array.isArray(data.techStack) ? data.techStack : [],
        ctaButtons: Array.isArray(data.ctaButtons) ? data.ctaButtons : [],
      };
    } catch (error) {
      console.error('Error loading hero data:', error);
      heroData = {
        techStack: [],
        ctaButtons: [],
      };
    }
  };

  const renderHeroSections = () => {
    renderTechStack();
    renderCtaButtons();
  };

  const renderTechStack = () => {
    const container = document.getElementById('hero-tech-icons');
    if (!container) return;

    container.innerHTML = '';

    heroData.techStack.forEach((item) => {
      const techIcon = createTechIcon(item);
      if (techIcon) {
        container.appendChild(techIcon);
      }
    });
  };

  const createTechIcon = (item) => {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const localizedLabel = I18n.resolveLocalizedValue(item.label);
    if (typeof localizedLabel !== 'string' || localizedLabel.trim().length === 0) {
      return null;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'tech-icon';
    wrapper.title = localizedLabel;
    wrapper.setAttribute('aria-label', localizedLabel);
    wrapper.setAttribute('role', 'img');

    if (item.type === 'image') {
      if (typeof item.src !== 'string' || item.src.trim().length === 0) {
        return null;
      }

      const image = document.createElement('img');
      image.src = item.src;
      image.className = 'tech-icon__image';
      image.alt = typeof item.alt === 'string' && item.alt.length > 0 ? item.alt : localizedLabel;
      image.loading = 'lazy';
      image.decoding = 'async';
      wrapper.appendChild(image);
      return wrapper;
    }

    if (typeof item.iconClass !== 'string' || item.iconClass.trim().length === 0) {
      return null;
    }

    const icon = document.createElement('i');
    icon.className = item.iconClass;
    icon.setAttribute('aria-hidden', 'true');
    wrapper.appendChild(icon);

    return wrapper;
  };

  const renderCtaButtons = () => {
    const container = document.querySelector('.hero__cta-buttons');
    if (!container) return;

    container.innerHTML = '';

    heroData.ctaButtons.forEach((item) => {
      const button = createCtaButton(item);
      if (button) {
        container.appendChild(button);
      }
    });
  };

  const createCtaButton = (item) => {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const href = typeof item.contactKey === 'string'
      ? ChromeUI.resolveContactHref(item.contactKey)
      : sanitizeActionHref(item.href);
    if (!href) {
      return null;
    }

    const button = document.createElement('a');
    const variant = item.variant === 'secondary' ? 'secondary' : 'primary';
    const label = I18n.resolveLocalizedValue(item.label);

    button.href = href;
    button.className = `btn hero__btn hero__btn--${variant}`;
    button.textContent = typeof label === 'string' && label.length > 0 ? label : href;

    if (typeof item.id === 'string' && item.id.length > 0) {
      button.id = item.id;
    }

    button.setAttribute('lang', I18n.t('htmlLang'));

    if (item.useSmoothScroll && href.startsWith('#')) {
      button.setAttribute('data-scroll', '');
    }

    if (item.openInNewTab && !href.startsWith('#')) {
      button.target = '_blank';
      button.rel = 'noopener noreferrer';
    }

    return button;
  };

  const updateCtaLabels = () => {
    heroData.ctaButtons.forEach((item) => {
      if (!item || typeof item.id !== 'string' || item.id.length === 0) {
        return;
      }

      const button = document.getElementById(item.id);
      if (!button) {
        return;
      }

      const label = I18n.resolveLocalizedValue(item.label);
      if (typeof label === 'string' && label.length > 0) {
        button.textContent = label;
      }

      button.setAttribute('lang', I18n.t('htmlLang'));
    });
  };

  const setupLanguageListener = () => {
    if (languageListenerBound) return;

    globalThis.addEventListener('languageChanged', () => {
      updateCtaLabels();
    });

    languageListenerBound = true;
  };

  return {
    init,
  };
})();
