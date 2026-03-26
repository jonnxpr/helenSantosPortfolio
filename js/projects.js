/* ========================================
   Projects Module - Dynamic Rendering
   ======================================== */

const Projects = (() => {
  let projectsData = [];
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

  const init = async () => {
    await loadProjectsData();
    renderProjects();
    setupLazyLoading();
    setupLanguageListener();
  };

  const loadProjectsData = async () => {
    try {
      const response = await fetch(withAssetVersion('data/projects.json'), { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to load projects');
      }
      projectsData = await response.json();
    } catch (error) {
      console.error('Error loading projects:', error);
      projectsData = [];
    }
  };

  const renderProjects = () => {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = '';

    if (projectsData.length === 0) {
      const emptyState = document.createElement('p');
      emptyState.className = 'section-empty-state';
      emptyState.textContent = I18n.t('projectsEmpty');
      container.appendChild(emptyState);
      return;
    }

    projectsData.forEach((project, index) => {
      const projectCard = createProjectCard(project, index);
      container.appendChild(projectCard);
    });
  };

  const createProjectCard = (project, index) => {
    const card = document.createElement('li');
    card.className = 'section-panel project-card fade-in-scroll';
    card.style.animationDelay = `${index * 0.1}s`;

    // Badge de projeto atual
    if (project.current) {
      const currentBadge = document.createElement('div');
      currentBadge.className = 'project-card__current-badge';
      currentBadge.setAttribute('aria-label', I18n.t('projectCurrentAria'));
      currentBadge.innerHTML = `<i class="fas fa-star" aria-hidden="true"></i> ${I18n.t('projectCurrentText')}`;
      card.appendChild(currentBadge);
    }

    const image = document.createElement('div');
    image.className = 'project-card__image';
    image.setAttribute('aria-hidden', 'true');
    image.appendChild(createProjectIcon(project.icon));

    const content = document.createElement('div');
    content.className = 'project-card__content';

    const title = document.createElement('h3');
    title.className = 'project-card__title text-balance';
    title.textContent = I18n.resolveLocalizedValue(project.title);
    title.setAttribute('lang', I18n.t('htmlLang'));

    const description = document.createElement('p');
    description.className = 'project-card__description';
    description.textContent = I18n.resolveLocalizedValue(project.description);
    description.setAttribute('lang', I18n.t('htmlLang'));

    const techContainer = document.createElement('div');
    techContainer.className = 'project-card__technologies';
    techContainer.setAttribute('aria-label', I18n.t('projectTechAria'));

    const localizedTechnologies = I18n.resolveLocalizedValue(project.technologies) || [];

    localizedTechnologies.forEach((tech) => {
      const badge = document.createElement('span');
      badge.className = 'tech-badge';
      badge.textContent = tech;
      badge.setAttribute('role', 'doc-biblioentry');
      techContainer.appendChild(badge);
    });

    const linksContainer = document.createElement('div');
    linksContainer.className = 'project-card__links';
    linksContainer.setAttribute('role', 'navigation');
    linksContainer.setAttribute('aria-label', I18n.t('projectLinksAria'));

    // Renderizar links personalizados dinamicamente
    if (project.links) {
      Object.entries(project.links).forEach(([linkName, linkUrl]) => {
        const safeUrl = sanitizeLinkUrl(linkUrl);
        if (!safeUrl) return;

        const link = document.createElement('a');
        link.href = safeUrl;
        link.className = 'project-link';

        if (safeUrl.startsWith('http://') || safeUrl.startsWith('https://')) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        
        const iconClass = resolveLinkIconClass(linkName, safeUrl);
        
        link.setAttribute('aria-label', I18n.t('projectOpenLink', { name: linkName }));

        const icon = document.createElement('i');
        icon.className = iconClass;
        icon.setAttribute('aria-hidden', 'true');

        link.appendChild(icon);
        link.appendChild(document.createTextNode(` ${linkName}`));
        linksContainer.appendChild(link);
      });
    }

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(techContainer);
    content.appendChild(linksContainer);

    card.appendChild(image);
    card.appendChild(content);

    return card;
  };

  const createProjectIcon = (iconMarkup) => {
    const icon = document.createElement('i');
    icon.setAttribute('aria-hidden', 'true');

    const fallbackClass = 'fas fa-code';
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
    AnimationUtils.observeFadeInSelector('#projects-container .fade-in-scroll');
  };

  const setupLanguageListener = () => {
    if (languageListenerBound) return;

    globalThis.addEventListener('languageChanged', () => {
      renderProjects();
      setupLazyLoading();
    });

    languageListenerBound = true;
  };

  return {
    init,
  };
})();
