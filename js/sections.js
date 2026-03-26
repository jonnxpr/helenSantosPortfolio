/* ========================================
   Content Sections Module - Dynamic Lists
   ======================================== */

const ContentSections = (() => {
  let sectionsData = {
    heroHighlights: [],
    educationItems: [],
    opportunityActions: [],
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
    await loadSectionsData();
    renderSections();
    setupLanguageListener();
  };

  const loadSectionsData = async () => {
    try {
      const response = await fetch(withAssetVersion('data/sections.json'), { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to load sections data');
      }

      const data = await response.json();
      sectionsData = {
        heroHighlights: Array.isArray(data.heroHighlights) ? data.heroHighlights : [],
        educationItems: Array.isArray(data.educationItems) ? data.educationItems : [],
        opportunityActions: Array.isArray(data.opportunityActions) ? data.opportunityActions : [],
      };
    } catch (error) {
      console.error('Error loading sections data:', error);
      sectionsData = {
        heroHighlights: [],
        educationItems: [],
        opportunityActions: [],
      };
    }
  };

  const renderSections = () => {
    renderHeroHighlights();
    renderEducationItems();
    renderOpportunityActions();
  };

  const renderHeroHighlights = () => {
    const container = document.getElementById('hero-highlights-list');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    sectionsData.heroHighlights.forEach((item) => {
      const text = I18n.resolveLocalizedValue(item?.text);
      if (typeof text !== 'string' || text.length === 0) {
        return;
      }

      const listItem = document.createElement('li');
      listItem.className = 'hero__highlights-item';
      listItem.textContent = text;
      listItem.setAttribute('lang', I18n.t('htmlLang'));
      fragment.appendChild(listItem);
    });

    container.replaceChildren(fragment);
  };

  const renderEducationItems = () => {
    const container = document.getElementById('education-timeline');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    sectionsData.educationItems.forEach((item, index) => {
      const educationItem = createEducationItem(item, index);
      if (educationItem) {
        fragment.appendChild(educationItem);
      }
    });

    container.replaceChildren(fragment);
    AnimationUtils.observeFadeInSelector('#education-timeline .fade-in-scroll');
  };

  const createEducationItem = (item, index) => {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const titleText = I18n.resolveLocalizedValue(item.title);
    const periodText = I18n.resolveLocalizedValue(item.period);
    const descriptionText = I18n.resolveLocalizedValue(item.description);

    if (typeof titleText !== 'string' || titleText.length === 0) {
      return null;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'section-panel education__item fade-in-scroll';
    wrapper.style.animationDelay = `${index * 0.1}s`;

    const header = document.createElement('div');
    header.className = 'education__item-header';

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'education__icon';
    iconWrapper.setAttribute('aria-hidden', 'true');
    iconWrapper.appendChild(createIconElement(item.iconClass, 'fas fa-graduation-cap'));

    const info = document.createElement('div');
    info.className = 'education__info';

    const title = document.createElement('h3');
    title.className = 'education__title text-balance';
    title.textContent = titleText;
    title.setAttribute('lang', I18n.t('htmlLang'));

    const institution = document.createElement('p');
    institution.className = 'education__institution';
    institution.textContent = typeof item.institution === 'string' && item.institution.length > 0 ? item.institution : '';

    const period = document.createElement('p');
    period.className = 'education__period';
    period.textContent = typeof periodText === 'string' ? periodText : '';
    period.setAttribute('lang', I18n.t('htmlLang'));

    info.appendChild(title);
    info.appendChild(institution);
    info.appendChild(period);

    header.appendChild(iconWrapper);
    header.appendChild(info);

    wrapper.appendChild(header);

    if (typeof descriptionText === 'string' && descriptionText.length > 0) {
      const description = document.createElement('p');
      description.className = 'education__description';
      description.textContent = descriptionText;
      description.setAttribute('lang', I18n.t('htmlLang'));
      wrapper.appendChild(description);
    }

    return wrapper;
  };

  const renderOpportunityActions = () => {
    const container = document.getElementById('opportunities-actions');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    sectionsData.opportunityActions.forEach((item) => {
      const action = createOpportunityAction(item);
      if (action) {
        fragment.appendChild(action);
      }
    });

    container.replaceChildren(fragment);
  };

  const createOpportunityAction = (item) => {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const href = typeof item.contactKey === 'string'
      ? ChromeUI.resolveContactHref(item.contactKey)
      : sanitizeActionHref(item.href);
    const label = I18n.resolveLocalizedValue(item.label);
    if (!href || typeof label !== 'string' || label.length === 0) {
      return null;
    }

    const action = document.createElement('a');
    const variant = item.variant === 'secondary' ? 'secondary' : 'primary';

    action.href = href;
    action.className = `opportunities__action opportunities__action--${variant}`;
    action.textContent = label;
    action.setAttribute('lang', I18n.t('htmlLang'));

    if (typeof item.id === 'string' && item.id.length > 0) {
      action.id = item.id;
    }

    if (item.openInNewTab && !href.startsWith('#')) {
      action.target = '_blank';
      action.rel = 'noopener noreferrer';
    }

    return action;
  };

  const createIconElement = (iconClass, fallbackClass) => {
    const icon = document.createElement('i');
    icon.className = typeof iconClass === 'string' && iconClass.trim().length > 0 ? iconClass : fallbackClass;
    icon.setAttribute('aria-hidden', 'true');
    return icon;
  };

  const setupLanguageListener = () => {
    if (languageListenerBound) return;

    globalThis.addEventListener('languageChanged', () => {
      renderSections();
    });

    languageListenerBound = true;
  };

  return {
    init,
  };
})();