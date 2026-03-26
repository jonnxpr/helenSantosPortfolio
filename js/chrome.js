/* ========================================
   Chrome Module - Language Picker and Contacts
   ======================================== */

const ChromeUI = (() => {
  let chromeData = {
    profile: null,
    languageOptions: [],
    contactLinks: [],
  };
  let languageListenerBound = false;
  let viewportListenerBound = false;
  let languageDropdownListenerBound = false;
  let compactViewportQuery = null;
  const languageMenuCloseTimers = new WeakMap();
  const languageMenuTransitionMs = 220;

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
    await loadChromeData();
    renderChrome();
    setupLanguageListener();
    setupViewportListener();
    setupLanguageDropdownListener();
  };

  const loadChromeData = async () => {
    try {
      const response = await fetch(withAssetVersion('data/chrome.json'), { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to load chrome data');
      }

      const data = await response.json();
      chromeData = {
        profile: data.profile && typeof data.profile === 'object' ? data.profile : null,
        languageOptions: Array.isArray(data.languageOptions) ? data.languageOptions : [],
        contactLinks: Array.isArray(data.contactLinks) ? data.contactLinks : [],
      };
    } catch (error) {
      console.error('Error loading chrome data:', error);
      chromeData = {
        profile: null,
        languageOptions: [],
        contactLinks: [],
      };
    }
  };

  const renderChrome = () => {
    syncDocumentMetadata();
    renderLanguageSwitcher();
    renderContactGroup('navbar-contacts', 'navbar__contact-link');
    renderContactGroup('footer-contacts', 'footer__link');
  };

  const isCompactViewport = () => {
    if (typeof globalThis.matchMedia !== 'function') {
      return false;
    }

    compactViewportQuery ??= globalThis.matchMedia('(max-width: 767px)');
    return compactViewportQuery.matches;
  };

  const renderLanguageSwitcher = () => {
    const select = document.getElementById('language-switcher');
    if (!(select instanceof HTMLSelectElement)) return;

    const fragment = document.createDocumentFragment();

    chromeData.languageOptions.forEach((optionData) => {
      if (!optionData || typeof optionData.code !== 'string') {
        return;
      }

      const option = document.createElement('option');
      const label = I18n.resolveLocalizedValue(optionData.label);
      const compactLabel = typeof optionData.shortLabel === 'string' && optionData.shortLabel.length > 0
        ? optionData.shortLabel
        : optionData.code;
      option.value = optionData.code;
      option.textContent = isCompactViewport() && typeof compactLabel === 'string'
        ? compactLabel
        : (typeof label === 'string' && label.length > 0 ? label : compactLabel);

      if (typeof label === 'string' && label.length > 0) {
        option.label = label;
      }

      fragment.appendChild(option);
    });

    select.replaceChildren(fragment);
    select.value = I18n.getLanguage();
    select.dataset.viewport = isCompactViewport() ? 'mobile' : 'desktop';
    renderLanguageDropdown(select);
    updateLanguageSwitcherTitle(select);
  };

  const renderLanguageDropdown = (select) => {
    const wrapper = select.closest('.navbar__language-select-wrap');
    if (!wrapper) return;

    let trigger = wrapper.querySelector('.navbar__language-trigger');
    if (!(trigger instanceof HTMLButtonElement)) {
      trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'navbar__language-trigger';
      trigger.setAttribute('aria-haspopup', 'listbox');
      wrapper.appendChild(trigger);
    }

    let menu = wrapper.querySelector('.navbar__language-menu');
    if (!(menu instanceof HTMLDivElement)) {
      menu = document.createElement('div');
      menu.className = 'navbar__language-menu';
      menu.id = 'language-switcher-menu';
      menu.setAttribute('role', 'listbox');
      menu.hidden = true;
      wrapper.appendChild(menu);
    }

    trigger.dataset.viewport = select.dataset.viewport ?? 'desktop';
    trigger.setAttribute('aria-controls', menu.id);
    trigger.setAttribute('aria-expanded', wrapper.dataset.languageOpen === 'true' ? 'true' : 'false');

    const selectedOption = chromeData.languageOptions.find((option) => option?.code === select.value) ?? chromeData.languageOptions[0] ?? null;
    const selectedLabel = getTriggerLanguageLabel(selectedOption);

    let triggerLabel = trigger.querySelector('.navbar__language-trigger-label');
    if (!(triggerLabel instanceof HTMLSpanElement)) {
      triggerLabel = document.createElement('span');
      triggerLabel.className = 'navbar__language-trigger-label';
      const existingText = trigger.textContent?.trim();
      trigger.replaceChildren(triggerLabel);
      if (existingText && existingText.length > 0) {
        triggerLabel.textContent = existingText;
      }
    }

    triggerLabel.textContent = selectedLabel;

    const fragment = document.createDocumentFragment();
    chromeData.languageOptions.forEach((optionData, index) => {
      if (!optionData || typeof optionData.code !== 'string') {
        return;
      }

      const optionButton = document.createElement('button');
      optionButton.type = 'button';
      optionButton.className = 'navbar__language-option';
      optionButton.dataset.languageCode = optionData.code;
      optionButton.setAttribute('role', 'option');
      optionButton.setAttribute('aria-selected', optionData.code === select.value ? 'true' : 'false');
      optionButton.textContent = getMenuLanguageLabel(optionData);

      if (optionData.code === select.value) {
        optionButton.classList.add('navbar__language-option--selected');
      }

      optionButton.addEventListener('click', () => {
        select.value = optionData.code;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        closeLanguageDropdown(wrapper, trigger, menu);
      });

      optionButton.addEventListener('keydown', (event) => {
        handleLanguageOptionKeydown(event, wrapper, trigger, menu, index);
      });

      fragment.appendChild(optionButton);
    });

    menu.replaceChildren(fragment);

    trigger.onclick = () => {
      if (wrapper.dataset.languageOpen === 'true') {
        closeLanguageDropdown(wrapper, trigger, menu);
        return;
      }

      openLanguageDropdown(wrapper, trigger, menu);
    };

    trigger.onkeydown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLanguageDropdown(wrapper, trigger, menu);
        focusLanguageOption(menu, event.key === 'ArrowUp' ? 'last' : 'first');
      }
    };

    if (wrapper.dataset.languageOpen === 'true') {
      menu.hidden = false;
      menu.classList.add('navbar__language-menu--open');
    } else {
      menu.classList.remove('navbar__language-menu--open');
    }
  };

  const getTriggerLanguageLabel = (optionData) => {
    if (!optionData) {
      return '';
    }

    const fullLabel = I18n.resolveLocalizedValue(optionData.label);
    if (!isCompactViewport() && typeof fullLabel === 'string' && fullLabel.length > 0) {
      return fullLabel;
    }

    if (typeof optionData.shortLabel === 'string' && optionData.shortLabel.length > 0) {
      return optionData.shortLabel;
    }

    return typeof fullLabel === 'string' ? fullLabel : optionData.code;
  };

  const getMenuLanguageLabel = (optionData) => {
    const label = I18n.resolveLocalizedValue(optionData?.label);
    if (typeof label === 'string' && label.length > 0) {
      return label;
    }

    return typeof optionData?.code === 'string' ? optionData.code : '';
  };

  const clearPendingLanguageMenuClose = (menu) => {
    const pendingTimer = languageMenuCloseTimers.get(menu);
    if (typeof pendingTimer === 'number') {
      globalThis.clearTimeout(pendingTimer);
      languageMenuCloseTimers.delete(menu);
    }
  };

  const openLanguageDropdown = (wrapper, trigger, menu) => {
    clearPendingLanguageMenuClose(menu);
    menu.hidden = false;
    menu.classList.add('navbar__language-menu--open');
    trigger.setAttribute('aria-expanded', 'true');

    globalThis.requestAnimationFrame(() => {
      wrapper.dataset.languageOpen = 'true';
    });
  };

  const closeLanguageDropdown = (wrapper, trigger, menu) => {
    clearPendingLanguageMenuClose(menu);
    wrapper.dataset.languageOpen = 'false';
    trigger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('navbar__language-menu--open');

    const closeTimer = globalThis.setTimeout(() => {
      if (wrapper.dataset.languageOpen === 'true') {
        return;
      }

      menu.hidden = true;
      languageMenuCloseTimers.delete(menu);
    }, languageMenuTransitionMs);

    languageMenuCloseTimers.set(menu, closeTimer);
  };

  const focusLanguageOption = (menu, target) => {
    const options = Array.from(menu.querySelectorAll('.navbar__language-option'));
    if (options.length === 0) {
      return;
    }

    const index = target === 'last' ? options.length - 1 : 0;
    options[index]?.focus();
  };

  const handleLanguageOptionKeydown = (event, wrapper, trigger, menu, index) => {
    const options = Array.from(menu.querySelectorAll('.navbar__language-option'));
    if (options.length === 0) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeLanguageDropdown(wrapper, trigger, menu);
      trigger.focus();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      options[(index + 1) % options.length]?.focus();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      options[(index - 1 + options.length) % options.length]?.focus();
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      options[0]?.focus();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      options[options.length - 1]?.focus();
    }
  };

  const syncDocumentMetadata = () => {
    const profile = chromeData.profile;
    if (!profile) return;
    const seoParams = {
      fullName: typeof profile.fullName === 'string' ? profile.fullName : '',
      jobTitle: I18n.resolveLocalizedValue(profile.jobTitle) ?? '',
    };

    document.title = I18n.t('pageTitle', seoParams);

    const descriptionMeta = document.getElementById('meta-description');
    if (descriptionMeta instanceof HTMLMetaElement) {
      descriptionMeta.content = I18n.t('metaDescription', seoParams);
    }

    const ogTitleMeta = document.getElementById('meta-og-title');
    if (ogTitleMeta instanceof HTMLMetaElement) {
      ogTitleMeta.content = I18n.t('metaOgTitle', seoParams);
    }

    const ogDescriptionMeta = document.getElementById('meta-og-description');
    if (ogDescriptionMeta instanceof HTMLMetaElement) {
      ogDescriptionMeta.content = I18n.t('metaOgDescription', seoParams);
    }

    const twitterTitleMeta = document.getElementById('meta-twitter-title');
    if (twitterTitleMeta instanceof HTMLMetaElement) {
      twitterTitleMeta.content = I18n.t('metaTwitterTitle', seoParams);
    }

    const twitterDescriptionMeta = document.getElementById('meta-twitter-description');
    if (twitterDescriptionMeta instanceof HTMLMetaElement) {
      twitterDescriptionMeta.content = I18n.t('metaTwitterDescription', seoParams);
    }

    const canonicalLink = document.getElementById('canonical-link');
    if (canonicalLink instanceof HTMLLinkElement && typeof profile.siteUrl === 'string' && profile.siteUrl.length > 0) {
      canonicalLink.href = profile.siteUrl;
    }

    const ogUrlMeta = document.getElementById('meta-og-url');
    if (ogUrlMeta instanceof HTMLMetaElement && typeof profile.siteUrl === 'string' && profile.siteUrl.length > 0) {
      ogUrlMeta.content = profile.siteUrl;
    }

    const ogImageMeta = document.getElementById('meta-og-image');
    if (ogImageMeta instanceof HTMLMetaElement && typeof profile.ogImage === 'string' && profile.ogImage.length > 0) {
      ogImageMeta.content = profile.ogImage;
    }

    const twitterImageMeta = document.getElementById('meta-twitter-image');
    if (twitterImageMeta instanceof HTMLMetaElement && typeof profile.ogImage === 'string' && profile.ogImage.length > 0) {
      twitterImageMeta.content = profile.ogImage;
    }

    const authorMeta = document.getElementById('meta-author');
    if (authorMeta instanceof HTMLMetaElement && typeof profile.fullName === 'string' && profile.fullName.length > 0) {
      authorMeta.content = profile.fullName;
    }

    const schemaElement = document.getElementById('person-schema');
    if (!(schemaElement instanceof HTMLScriptElement)) return;

    const email = typeof profile.emailKey === 'string' ? resolveContactHref(profile.emailKey) : null;
    const sameAs = Array.isArray(profile.sameAsKeys)
      ? profile.sameAsKeys
        .map((key) => resolveContactHref(key))
        .filter((href) => typeof href === 'string' && href.startsWith('http'))
      : [];
    const contactPoint = chromeData.contactLinks
      .map((item) => {
        const href = sanitizeActionHref(item?.href);
        if (typeof href !== 'string' || href.length === 0) {
          return null;
        }

        const label = I18n.resolveLocalizedValue(item?.label);
        const isEmail = href.startsWith('mailto:');
        return {
          '@type': 'ContactPoint',
          contactType: typeof label === 'string' && label.length > 0 ? label : item?.key,
          ...(isEmail ? { email: href.replace(/^mailto:/, '') } : { url: href }),
        };
      })
      .filter(Boolean);

    const schemaPayload = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: typeof profile.fullName === 'string' ? profile.fullName : undefined,
      url: typeof profile.siteUrl === 'string' ? profile.siteUrl : undefined,
      mainEntityOfPage: typeof profile.siteUrl === 'string' ? profile.siteUrl : undefined,
      email: email ?? undefined,
      jobTitle: I18n.resolveLocalizedValue(profile.jobTitle),
      image: typeof profile.image === 'string' ? profile.image : undefined,
      sameAs,
      contactPoint: contactPoint.length > 0 ? contactPoint : undefined,
      knowsAbout: Array.isArray(profile.knowsAbout) ? profile.knowsAbout : undefined,
      worksFor: profile.worksFor && typeof profile.worksFor === 'object' ? profile.worksFor : undefined,
    };

    schemaElement.textContent = JSON.stringify(schemaPayload, null, 2);
  };

  const getContactLink = (contactKey) => {
    if (typeof contactKey !== 'string' || contactKey.length === 0) {
      return null;
    }

    return chromeData.contactLinks.find((item) => item?.key === contactKey) ?? null;
  };

  const resolveContactHref = (contactKey) => {
    const link = getContactLink(contactKey);
    return link ? sanitizeActionHref(link.href) : null;
  };

  const updateLanguageSwitcherTitle = (select) => {
    if (!(select instanceof HTMLSelectElement)) return;

    const selectedData = chromeData.languageOptions.find((option) => option?.code === select.value);
    const label = I18n.resolveLocalizedValue(selectedData?.label);
    if (typeof label === 'string' && label.length > 0) {
      select.title = label;
      select.setAttribute('aria-label', `${I18n.t('languageSelectorLabel')}: ${label}`);

      const trigger = select.closest('.navbar__language-select-wrap')?.querySelector('.navbar__language-trigger');
      if (trigger instanceof HTMLButtonElement) {
        trigger.title = label;
        trigger.setAttribute('aria-label', `${I18n.t('languageSelectorLabel')}: ${label}`);
      }
      return;
    }

    select.removeAttribute('title');
    select.setAttribute('aria-label', I18n.t('languageSelectorLabel'));

    const trigger = select.closest('.navbar__language-select-wrap')?.querySelector('.navbar__language-trigger');
    if (trigger instanceof HTMLButtonElement) {
      trigger.removeAttribute('title');
      trigger.setAttribute('aria-label', I18n.t('languageSelectorLabel'));
    }
  };

  const renderContactGroup = (containerId, linkClassName) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const fragment = document.createDocumentFragment();

    chromeData.contactLinks.forEach((item) => {
      const link = createContactLink(item, linkClassName, containerId);
      if (link) {
        fragment.appendChild(link);
      }
    });

    container.replaceChildren(fragment);
  };

  const createContactLink = (item, linkClassName, containerId) => {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const href = sanitizeActionHref(item.href);
    const label = I18n.resolveLocalizedValue(item.label);
    if (!href || typeof label !== 'string' || label.length === 0) {
      return null;
    }

    const link = document.createElement('a');
    link.href = href;
    link.className = linkClassName;
    link.title = label;
    link.setAttribute('aria-label', label);

    if (typeof item.key === 'string' && item.key.length > 0) {
      link.dataset.contactKey = item.key;
      link.id = `${containerId === 'navbar-contacts' ? 'nav' : 'footer'}-contact-${item.key}`;
    }

    if (item.openInNewTab && !href.startsWith('#')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    const icon = document.createElement('i');
    icon.className = typeof item.iconClass === 'string' && item.iconClass.trim().length > 0 ? item.iconClass : 'fas fa-link';
    icon.setAttribute('aria-hidden', 'true');
    link.appendChild(icon);

    return link;
  };

  const setupLanguageListener = () => {
    if (languageListenerBound) return;

    globalThis.addEventListener('languageChanged', () => {
      renderChrome();
    });

    languageListenerBound = true;
  };

  const setupViewportListener = () => {
    if (viewportListenerBound || typeof globalThis.matchMedia !== 'function') return;

    compactViewportQuery ??= globalThis.matchMedia('(max-width: 767px)');
    compactViewportQuery.addEventListener('change', () => {
      renderLanguageSwitcher();
    });
    viewportListenerBound = true;
  };

  const setupLanguageDropdownListener = () => {
    if (languageDropdownListenerBound) return;

    document.addEventListener('click', (event) => {
      const wrappers = document.querySelectorAll('.navbar__language-select-wrap[data-language-open="true"]');
      wrappers.forEach((wrapper) => {
        if (!(wrapper instanceof HTMLElement) || wrapper.contains(event.target)) {
          return;
        }

        const trigger = wrapper.querySelector('.navbar__language-trigger');
        const menu = wrapper.querySelector('.navbar__language-menu');
        if (trigger instanceof HTMLButtonElement && menu instanceof HTMLDivElement) {
          closeLanguageDropdown(wrapper, trigger, menu);
        }
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      const wrapper = document.querySelector('.navbar__language-select-wrap[data-language-open="true"]');
      if (!(wrapper instanceof HTMLElement)) {
        return;
      }

      const trigger = wrapper.querySelector('.navbar__language-trigger');
      const menu = wrapper.querySelector('.navbar__language-menu');
      if (trigger instanceof HTMLButtonElement && menu instanceof HTMLDivElement) {
        closeLanguageDropdown(wrapper, trigger, menu);
        trigger.focus();
      }
    });

    languageDropdownListenerBound = true;
  };

  return {
    init,
    getContactLink,
    resolveContactHref,
  };
})();