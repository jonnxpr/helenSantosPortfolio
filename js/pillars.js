/* ========================================
   Pillars Module - Dynamic Rendering
   ======================================== */

const Pillars = (() => {
  let pillarsData = [];
  let languageListenerBound = false;

  const withAssetVersion = (path) => {
    const version = document.querySelector('meta[name="asset-version"]')?.getAttribute('content')?.trim();
    if (!version) return path;

    const separator = path.includes('?') ? '&' : '?';
    return `${path}${separator}v=${encodeURIComponent(version)}`;
  };

  const init = async () => {
    await loadPillarsData();
    renderPillars();
    setupLazyLoading();
    setupLanguageListener();
  };

  const loadPillarsData = async () => {
    try {
      const response = await fetch(withAssetVersion('data/pillars.json'), { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to load pillars');
      }
      pillarsData = await response.json();
    } catch (error) {
      console.error('Error loading pillars:', error);
      pillarsData = [];
    }
  };

  const renderPillars = () => {
    const container = document.getElementById('pillars-container');
    if (!container) return;

    container.innerHTML = '';

    if (pillarsData.length === 0) {
      const emptyState = document.createElement('p');
      emptyState.className = 'section-empty-state';
      emptyState.textContent = I18n.t('pillarsEmpty');
      container.appendChild(emptyState);
      return;
    }

    pillarsData.forEach((pillar, index) => {
      const pillarCard = createPillarCard(pillar, index);
      container.appendChild(pillarCard);
    });
  };

  const createPillarCard = (pillar, index) => {
    const card = document.createElement('li');
    card.className = 'section-panel pillar-card fade-in-scroll';
    card.style.animationDelay = `${index * 0.1}s`;

    const icon = document.createElement('div');
    icon.className = 'pillar-card__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.appendChild(createPillarIcon(pillar.icon));

    const title = document.createElement('h3');
    title.className = 'pillar-card__title text-balance';
    title.setAttribute('lang', I18n.t('htmlLang'));
    title.textContent = I18n.resolveLocalizedValue(pillar.title);

    const description = document.createElement('p');
    description.className = 'pillar-card__description';
    description.setAttribute('lang', I18n.t('htmlLang'));
    description.textContent = I18n.resolveLocalizedValue(pillar.description);

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(description);

    return card;
  };

  const createPillarIcon = (iconMarkup) => {
    const icon = document.createElement('i');
    icon.setAttribute('aria-hidden', 'true');

    const fallbackClass = 'fas fa-compass';
    const classRegex = /class=['"]([^'"]+)['"]/i;
    const classMatch = typeof iconMarkup === 'string'
      ? classRegex.exec(iconMarkup)
      : null;

    icon.className = classMatch?.[1] || fallbackClass;
    return icon;
  };

  const setupLazyLoading = () => {
    AnimationUtils.observeFadeInSelector('#pillars-container .fade-in-scroll');
  };

  const setupLanguageListener = () => {
    if (languageListenerBound) return;

    globalThis.addEventListener('languageChanged', () => {
      renderPillars();
      setupLazyLoading();
    });

    languageListenerBound = true;
  };

  return {
    init,
  };
})();
