/* ========================================
   Experience Flow Module - Dynamic Lists
   ======================================== */

const ExperienceFlow = (() => {
  let experienceFlowData = {
    experienceSummaryPoints: [],
    journeySteps: [],
    bookingActions: [],
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
    await loadExperienceFlowData();
    renderExperienceFlow();
    setupLanguageListener();
  };

  const loadExperienceFlowData = async () => {
    try {
      const response = await fetch(withAssetVersion('data/experience-flow.json'), { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to load experience flow data');
      }

      const data = await response.json();
      experienceFlowData = {
        experienceSummaryPoints: Array.isArray(data.experienceSummaryPoints) ? data.experienceSummaryPoints : [],
        journeySteps: Array.isArray(data.journeySteps) ? data.journeySteps : [],
        bookingActions: Array.isArray(data.bookingActions) ? data.bookingActions : [],
      };
    } catch (error) {
      console.error('Error loading experience flow data:', error);
      experienceFlowData = {
        experienceSummaryPoints: [],
        journeySteps: [],
        bookingActions: [],
      };
    }
  };

  const renderExperienceFlow = () => {
    renderExperienceSummaryPoints();
    renderJourneySteps();
    renderBookingActions();
  };

  const renderExperienceSummaryPoints = () => {
    const container = document.getElementById('experience-summary-list');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    experienceFlowData.experienceSummaryPoints.forEach((item) => {
      const text = I18n.resolveLocalizedValue(item?.text);
      if (typeof text !== 'string' || text.length === 0) {
        return;
      }

      const listItem = document.createElement('li');
      listItem.className = 'experience-summary__item';
      listItem.textContent = text;
      listItem.setAttribute('lang', I18n.t('htmlLang'));
      fragment.appendChild(listItem);
    });

    container.replaceChildren(fragment);
  };

  const renderJourneySteps = () => {
    const container = document.getElementById('journey-steps');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    experienceFlowData.journeySteps.forEach((item, index) => {
      const journeyStep = createJourneyStep(item, index);
      if (journeyStep) {
        fragment.appendChild(journeyStep);
      }
    });

    container.replaceChildren(fragment);
    AnimationUtils.observeFadeInSelector('#journey-steps .fade-in-scroll');
  };

  const createJourneyStep = (item, index) => {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const titleText = I18n.resolveLocalizedValue(item.title);
    const momentText = I18n.resolveLocalizedValue(item.moment);
    const descriptionText = I18n.resolveLocalizedValue(item.description);

    if (typeof titleText !== 'string' || titleText.length === 0) {
      return null;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'section-panel journey-step fade-in-scroll';
    wrapper.style.animationDelay = `${index * 0.1}s`;

    const header = document.createElement('div');
    header.className = 'journey-step__header';

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'journey-step__icon';
    iconWrapper.setAttribute('aria-hidden', 'true');
    iconWrapper.appendChild(createIconElement(item.iconClass, 'fas fa-compass'));

    const info = document.createElement('div');
    info.className = 'journey-step__info';

    const title = document.createElement('h3');
    title.className = 'journey-step__title text-balance';
    title.textContent = titleText;
    title.setAttribute('lang', I18n.t('htmlLang'));

    const stepIndex = document.createElement('p');
    stepIndex.className = 'journey-step__index';
    stepIndex.textContent = typeof item.stepIndex === 'string' && item.stepIndex.length > 0 ? item.stepIndex : '';

    const moment = document.createElement('p');
    moment.className = 'journey-step__moment';
    moment.textContent = typeof momentText === 'string' ? momentText : '';
    moment.setAttribute('lang', I18n.t('htmlLang'));

    info.appendChild(title);
    info.appendChild(stepIndex);
    info.appendChild(moment);

    header.appendChild(iconWrapper);
    header.appendChild(info);

    wrapper.appendChild(header);

    if (typeof descriptionText === 'string' && descriptionText.length > 0) {
      const description = document.createElement('p');
      description.className = 'journey-step__description';
      description.textContent = descriptionText;
      description.setAttribute('lang', I18n.t('htmlLang'));
      wrapper.appendChild(description);
    }

    return wrapper;
  };

  const renderBookingActions = () => {
    const container = document.getElementById('booking-actions');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    experienceFlowData.bookingActions.forEach((item) => {
      const action = createBookingAction(item);
      if (action) {
        fragment.appendChild(action);
      }
    });

    container.replaceChildren(fragment);
  };

  const createBookingAction = (item) => {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const href = typeof item.contactKey === 'string'
      ? SiteShell.resolveContactHref(item.contactKey)
      : sanitizeActionHref(item.href);
    const label = I18n.resolveLocalizedValue(item.label);
    if (!href || typeof label !== 'string' || label.length === 0) {
      return null;
    }

    const action = document.createElement('a');
    const variant = item.variant === 'secondary' ? 'secondary' : 'primary';

    action.href = href;
    action.className = `booking__action booking__action--${variant}`;
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
      renderExperienceFlow();
    });

    languageListenerBound = true;
  };

  return {
    init,
  };
})();
