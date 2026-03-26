/* ========================================
   I18n Module - Real Internationalization
   ======================================== */

const I18n = (() => {
  const supportedLanguages = new Set(['pt-BR', 'en', 'es']);
  const defaultLanguage = 'pt-BR';
  const fallbackLanguage = 'en';
  const storageKey = 'helen-santos-language';

  let translations = {};
  let currentLanguage = defaultLanguage;
  let initialized = false;
  let initPromise;
  let languageSwitcherBound = false;

  const normalizeLanguage = (languageCode) => {
    if (!languageCode) return null;

    const normalized = languageCode.toLowerCase();
    if (normalized === 'pt-br' || normalized === 'pt') return 'pt-BR';
    if (normalized.startsWith('en')) return 'en';
    if (normalized.startsWith('es')) return 'es';

    return null;
  };

  const resolveInitialLanguage = () => {
    const searchParams = new URLSearchParams(globalThis.location.search);
    const urlLanguage = normalizeLanguage(searchParams.get('lang'));
    if (urlLanguage && supportedLanguages.has(urlLanguage)) {
      return urlLanguage;
    }

    return defaultLanguage;
  };

  const withAssetVersion = (path) => {
    const version = document.querySelector('meta[name="asset-version"]')?.getAttribute('content')?.trim();
    if (!version) return path;

    const separator = path.includes('?') ? '&' : '?';
    return `${path}${separator}v=${encodeURIComponent(version)}`;
  };

  const getNestedValue = (source, keyPath) => {
    if (!source) return undefined;

    return keyPath.split('.').reduce((current, key) => {
      if (current && Object.hasOwn(current, key)) {
        return current[key];
      }

      return undefined;
    }, source);
  };

  const t = (key, params = {}) => {
    const current = getNestedValue(translations[currentLanguage], key);
    const fallback = getNestedValue(translations[fallbackLanguage], key);
    const defaultValue = getNestedValue(translations[defaultLanguage], key);

    const rawValue = current ?? fallback ?? defaultValue;
    if (typeof rawValue !== 'string') {
      return key;
    }

    return Object.entries(params).reduce((accumulator, [paramKey, paramValue]) => {
      return accumulator.replaceAll(`{${paramKey}}`, String(paramValue));
    }, rawValue);
  };

  const resolveLocalizedValue = (value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return value;
    }

    return value[currentLanguage]
      ?? value[fallbackLanguage]
      ?? value[defaultLanguage]
      ?? Object.values(value)[0]
      ?? '';
  };

  const setText = (selector, key, params = {}) => {
    const element = document.querySelector(selector);
    if (!element) return;
    element.textContent = t(key, params);
  };

  const setHTML = (selector, key, params = {}) => {
    const element = document.querySelector(selector);
    if (!element) return;
    element.innerHTML = t(key, params);
  };

  const setAttribute = (selector, attributeName, key, params = {}) => {
    const element = document.querySelector(selector);
    if (!element) return;
    element.setAttribute(attributeName, t(key, params));
  };

  const applyStaticTranslations = () => {
    document.documentElement.lang = t('htmlLang');
    setAttribute('#meta-og-locale', 'content', 'ogLocale');

    setText('#skip-main-link', 'skipToMain');
    setAttribute('#main-nav', 'aria-label', 'navLabel');
    setAttribute('#nav-brand', 'aria-label', 'navBrandAria');
    setAttribute('#nav-toggle', 'aria-label', 'navToggleAria');

    setText('#nav-about', 'navAbout');
    setText('#nav-skills', 'navSkills');
    setText('#nav-education', 'navEducation');
    setText('#nav-projects', 'navProjects');

    setText('#language-switcher-label', 'languageSelectorLabel');

    setAttribute('#navbar-contacts', 'aria-label', 'contactsLabel');
    setAttribute('#footer-contacts', 'aria-label', 'footerContactsLabel');

    setText('#hero-role', 'heroRole');
    setText('#hero-eyebrow', 'heroEyebrow');
    setHTML('#hero-description-1', 'heroDescription1');
    setText('#hero-description-2', 'heroDescription2');
    setText('#hero-stack-title', 'heroStackTitle');
    setAttribute('#hero-tech-icons', 'aria-label', 'heroTechAria');
    setAttribute('#hero-highlights', 'aria-label', 'heroHighlightsAria');
    setText('#hero-highlights-title', 'heroHighlightsTitle');
    setText('#hero-visual-note', 'heroVisualNote');

    setText('#skills-title', 'skillsTitle');
    setText('#skills-description', 'skillsDescription');
    setAttribute('#skills-container', 'aria-label', 'skillsListAria');

    setText('#education-title', 'educationTitle');
    setText('#education-description', 'educationDescription');

    setText('#projects-title', 'projectsTitle');
    setText('#projects-description', 'projectsDescription');
    setAttribute('#projects-container', 'aria-label', 'projectsListAria');

    setText('#opportunities-title', 'opportunitiesTitle');
    setText('#opportunities-text', 'opportunitiesText');
    setAttribute('#opportunities-actions', 'aria-label', 'opportunitiesActionsAria');

    setText('#footer-rights-text', 'footerRights');

    const contentLanguage = t('htmlLang');
    ['#hero-eyebrow', '#hero-role', '#hero-description-1', '#hero-description-2', '#hero-highlights-title', '#hero-visual-note', '#skills-title', '#skills-description', '#education-title', '#education-description', '#projects-title', '#projects-description', '#opportunities-title', '#opportunities-text'].forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute('lang', contentLanguage);
      }
    });

    updateLanguageSwitcherUI();
  };

  const updateLanguageSwitcherUI = () => {
    const select = document.querySelector('#language-switcher');
    if (select instanceof HTMLSelectElement) {
      select.value = currentLanguage;
    }
  };

  const updateLanguageInUrl = (languageCode) => {
    const url = new URL(globalThis.location.href);

    if (languageCode === defaultLanguage) {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', languageCode);
    }

    globalThis.history.replaceState({}, '', url);
  };

  const applyLanguage = (languageCode) => {
    currentLanguage = supportedLanguages.has(languageCode) ? languageCode : defaultLanguage;
    localStorage.setItem(storageKey, currentLanguage);

    applyStaticTranslations();

    globalThis.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: currentLanguage },
    }));
  };

  const setLanguage = (languageCode) => {
    const normalized = normalizeLanguage(languageCode) ?? fallbackLanguage;
    applyLanguage(normalized);
    updateLanguageInUrl(normalized);
  };

  const setupLanguageSwitcher = () => {
    if (languageSwitcherBound) return;

    const switcher = document.querySelector('#language-switcher');
    if (!(switcher instanceof HTMLSelectElement)) return;

    switcher.addEventListener('change', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLSelectElement)) return;
      if (target.name !== 'language-switch') return;

      setLanguage(target.value);
    });

    languageSwitcherBound = true;
  };

  const loadTranslations = async () => {
    const response = await fetch(withAssetVersion('data/i18n.json'), { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to load i18n data');
    }

    translations = await response.json();
  };

  const init = async () => {
    if (initialized) return;

    if (!initPromise) {
      initPromise = (async () => {
        try {
          await loadTranslations();
          applyLanguage(resolveInitialLanguage());
          setupLanguageSwitcher();
          initialized = true;
        } catch (error) {
          console.error('Error initializing i18n:', error);
        }
      })();
    }

    await initPromise;
  };

  return {
    init,
    t,
    setLanguage,
    getLanguage: () => currentLanguage,
    resolveLocalizedValue,
    getFallbackLanguage: () => fallbackLanguage,
    getDefaultLanguage: () => defaultLanguage,
  };
})();
