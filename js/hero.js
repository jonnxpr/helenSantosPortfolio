/* ========================================
   Hero Module - Dynamic Atmospheres and Actions
   ======================================== */

const Hero = (() => {
  let heroData = {
    atmospheres: [],
    heroActions: [],
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
        atmospheres: Array.isArray(data.atmospheres) ? data.atmospheres : [],
        heroActions: Array.isArray(data.heroActions) ? data.heroActions : [],
      };
    } catch (error) {
      console.error('Error loading hero data:', error);
      heroData = {
        atmospheres: [],
        heroActions: [],
      };
    }
  };

  const renderHeroSections = () => {
    renderAtmospheres();
    renderHeroActions();
  };

  const renderAtmospheres = () => {
    const container = document.getElementById('hero-atmospheres-grid');
    if (!container) return;

    container.innerHTML = '';

    heroData.atmospheres.forEach((item) => {
      const atmosphereChip = createAtmosphereChip(item);
      if (atmosphereChip) {
        container.appendChild(atmosphereChip);
      }
    });
  };

  const createAtmosphereChip = (item) => {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const localizedLabel = I18n.resolveLocalizedValue(item.label);
    if (typeof localizedLabel !== 'string' || localizedLabel.trim().length === 0) {
      return null;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'atmosphere-chip';
    wrapper.title = localizedLabel;
    wrapper.setAttribute('aria-label', localizedLabel);
    wrapper.setAttribute('role', 'img');

    if (item.type === 'image') {
      if (typeof item.src !== 'string' || item.src.trim().length === 0) {
        return null;
      }

      const image = document.createElement('img');
      image.src = item.src;
      image.className = 'atmosphere-chip__image';
      image.alt = typeof item.alt === 'string' && item.alt.length > 0 ? item.alt : localizedLabel;
      image.loading = 'lazy';
      image.decoding = 'async';
      wrapper.appendChild(image);
      const label = document.createElement('span');
      label.className = 'atmosphere-chip__label';
      label.textContent = localizedLabel;
      wrapper.appendChild(label);
      return wrapper;
    }

    if (typeof item.iconClass !== 'string' || item.iconClass.trim().length === 0) {
      return null;
    }

    const icon = document.createElement('i');
    icon.className = item.iconClass;
    icon.setAttribute('aria-hidden', 'true');
    wrapper.appendChild(icon);

    const label = document.createElement('span');
    label.className = 'atmosphere-chip__label';
    label.textContent = localizedLabel;
    wrapper.appendChild(label);

    return wrapper;
  };

  const renderHeroActions = () => {
    const container = document.querySelector('.hero__actions');
    if (!container) return;

    container.innerHTML = '';

    heroData.heroActions.forEach((item) => {
      const action = createHeroAction(item);
      if (action) {
        container.appendChild(action);
      }
    });
  };

  const createHeroAction = (item) => {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const href = typeof item.contactKey === 'string'
      ? SiteShell.resolveContactHref(item.contactKey)
      : sanitizeActionHref(item.href);
    if (!href) {
      return null;
    }

    const action = document.createElement('a');
    const variant = item.variant === 'secondary' ? 'secondary' : 'primary';
    const label = I18n.resolveLocalizedValue(item.label);

    action.href = href;
    action.className = `btn hero__action hero__action--${variant}`;
    action.textContent = typeof label === 'string' && label.length > 0 ? label : href;

    if (typeof item.id === 'string' && item.id.length > 0) {
      action.id = item.id;
    }

    action.setAttribute('lang', I18n.t('htmlLang'));

    if (item.useSmoothScroll && href.startsWith('#')) {
      action.setAttribute('data-scroll', '');
    }

    if (item.openInNewTab && !href.startsWith('#')) {
      action.target = '_blank';
      action.rel = 'noopener noreferrer';
    }

    return action;
  };

  const updateHeroActionLabels = () => {
    heroData.heroActions.forEach((item) => {
      if (!item || typeof item.id !== 'string' || item.id.length === 0) {
        return;
      }

      const action = document.getElementById(item.id);
      if (!action) {
        return;
      }

      const label = I18n.resolveLocalizedValue(item.label);
      if (typeof label === 'string' && label.length > 0) {
        action.textContent = label;
      }

      action.setAttribute('lang', I18n.t('htmlLang'));
    });
  };

  const setupLanguageListener = () => {
    if (languageListenerBound) return;

    globalThis.addEventListener('languageChanged', () => {
      renderHeroSections();
    });

    languageListenerBound = true;
  };

  return {
    init,
  };
})();
