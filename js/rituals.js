/* ========================================
   Rituals Module - Dynamic Rendering
   ======================================== */

const Rituals = (() => {
  let ritualsData = [];
  let languageListenerBound = false;

  const withAssetVersion = (path) => {
    const version = document.querySelector('meta[name="asset-version"]')?.getAttribute('content')?.trim();
    if (!version) return path;

    const separator = path.includes('?') ? '&' : '?';
    return `${path}${separator}v=${encodeURIComponent(version)}`;
  };

  const sanitizeLinkUrl = (rawUrl) => {
    if (typeof rawUrl !== 'string' || rawUrl.trim().length === 0) {
      return null;
    }

    try {
      const parsed = new URL(rawUrl, globalThis.location.origin);
      const allowedProtocols = new Set(['https:', 'http:', 'mailto:']);
      if (!allowedProtocols.has(parsed.protocol)) {
        return null;
      }

      return parsed.href;
    } catch {
      return null;
    }
  };

  const resolveLocalizedLinkLabel = (linkName) => {
    const normalizedName = String(linkName || '').trim().toLowerCase();
    const supportedKey = ['email', 'whatsapp', 'instagram', 'telegram'].includes(normalizedName)
      ? normalizedName
      : null;

    return supportedKey ? I18n.t(supportedKey) : linkName;
  };

  const init = async () => {
    await loadRitualsData();
    renderRituals();
    setupLazyLoading();
    setupLanguageListener();
  };

  const loadRitualsData = async () => {
    try {
      const response = await fetch(withAssetVersion('data/rituals.json'), { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to load rituals');
      }
      ritualsData = await response.json();
    } catch (error) {
      console.error('Error loading rituals:', error);
      ritualsData = [];
    }
  };

  const renderRituals = () => {
    const container = document.getElementById('rituals-container');
    if (!container) return;

    container.innerHTML = '';

    if (ritualsData.length === 0) {
      const emptyState = document.createElement('p');
      emptyState.className = 'section-empty-state';
      emptyState.textContent = I18n.t('ritualsEmpty');
      container.appendChild(emptyState);
      return;
    }

    ritualsData.forEach((ritual, index) => {
      const ritualCard = createRitualCard(ritual, index);
      container.appendChild(ritualCard);
    });
  };

  const createRitualCard = (ritual, index) => {
    const card = document.createElement('li');
    card.className = 'section-panel ritual-card fade-in-scroll';
    card.style.animationDelay = `${index * 0.1}s`;

    if (ritual.featured) {
      const featuredBadge = document.createElement('div');
      featuredBadge.className = 'ritual-card__featured-badge';
      featuredBadge.setAttribute('aria-label', I18n.t('featuredRitualAria'));
      featuredBadge.innerHTML = `<i class="fas fa-star" aria-hidden="true"></i> ${I18n.t('featuredRitualText')}`;
      card.appendChild(featuredBadge);
    }

    const symbol = document.createElement('div');
    symbol.className = 'ritual-card__symbol';
    symbol.setAttribute('aria-hidden', 'true');
    symbol.appendChild(createRitualSymbol(ritual.icon));

    const content = document.createElement('div');
    content.className = 'ritual-card__content';

    const title = document.createElement('h3');
    title.className = 'ritual-card__title text-balance';
    title.textContent = I18n.resolveLocalizedValue(ritual.title);
    title.setAttribute('lang', I18n.t('htmlLang'));

    const description = document.createElement('p');
    description.className = 'ritual-card__description';
    description.textContent = I18n.resolveLocalizedValue(ritual.description);
    description.setAttribute('lang', I18n.t('htmlLang'));

    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'ritual-card__details';
    detailsContainer.setAttribute('aria-label', I18n.t('ritualDetailsAria'));

    const localizedDetails = I18n.resolveLocalizedValue(ritual.details) || [];
    localizedDetails.forEach((detail) => {
      const badge = document.createElement('span');
      badge.className = 'ritual-badge';
      badge.textContent = detail;
      badge.setAttribute('role', 'doc-biblioentry');
      detailsContainer.appendChild(badge);
    });

    const linksContainer = document.createElement('div');
    linksContainer.className = 'ritual-card__links';
    linksContainer.setAttribute('role', 'navigation');
    linksContainer.setAttribute('aria-label', I18n.t('ritualLinksAria'));

    if (ritual.links) {
      Object.entries(ritual.links).forEach(([linkName, linkUrl]) => {
        const resolvedUrl = I18n.resolveLocalizedValue(linkUrl);
        const safeUrl = sanitizeLinkUrl(resolvedUrl);
        if (!safeUrl) return;

        const localizedLinkLabel = resolveLocalizedLinkLabel(linkName);

        const link = document.createElement('a');
        link.href = safeUrl;
        link.className = 'ritual-link';

        if (safeUrl.startsWith('http://') || safeUrl.startsWith('https://')) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }

        const iconClass = resolveLinkIconClass(linkName, safeUrl);
        link.setAttribute('aria-label', I18n.t('openRitualLink', { name: localizedLinkLabel }));

        const icon = document.createElement('i');
        icon.className = iconClass;
        icon.setAttribute('aria-hidden', 'true');

        link.appendChild(icon);
        link.appendChild(document.createTextNode(` ${localizedLinkLabel}`));
        linksContainer.appendChild(link);
      });
    }

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(detailsContainer);
    content.appendChild(linksContainer);

    card.appendChild(symbol);
    card.appendChild(content);

    return card;
  };

  const createRitualSymbol = (iconMarkup) => {
    const icon = document.createElement('i');
    icon.setAttribute('aria-hidden', 'true');

    const fallbackClass = 'fas fa-star-and-crescent';
    const classRegex = /class=['"]([^'"]+)['"]/i;
    const classMatch = typeof iconMarkup === 'string'
      ? classRegex.exec(iconMarkup)
      : null;

    icon.className = classMatch?.[1] || fallbackClass;
    return icon;
  };

  const resolveLinkIconClass = (linkName, safeUrl) => {
    const normalizedName = String(linkName || '').trim().toLowerCase();

    if (normalizedName === 'github') return 'fab fa-github';
    if (normalizedName === 'whatsapp') return 'fab fa-whatsapp';
    if (normalizedName === 'instagram') return 'fab fa-instagram';
    if (normalizedName === 'telegram') return 'fab fa-telegram-plane';
    if (normalizedName === 'email' || safeUrl.startsWith('mailto:')) return 'fas fa-envelope';

    return 'fas fa-external-link-alt';
  };

  const setupLazyLoading = () => {
    AnimationUtils.observeFadeInSelector('#rituals-container .fade-in-scroll');
  };

  const setupLanguageListener = () => {
    if (languageListenerBound) return;

    globalThis.addEventListener('languageChanged', () => {
      renderRituals();
      setupLazyLoading();
    });

    languageListenerBound = true;
  };

  return {
    init,
  };
})();
