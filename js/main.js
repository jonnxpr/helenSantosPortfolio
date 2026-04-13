/* ========================================
   Main Module - Initialize App
   ======================================== */

const App = (() => {
  const init = async () => {
    // Definir ano dinâmico do copyright
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }

    await I18n.init();
    await SiteShell.init();
    await Hero.init();
    await ExperienceFlow.init();
    Navigation.init();
    await Pillars.init();
    await Rituals.init();
  };

  return {
    init,
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}
