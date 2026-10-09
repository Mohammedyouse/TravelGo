/* ==========================================================================
   TravelGo - Router & Screen Navigation Controller
   ========================================================================== */

class AppRouter {
  constructor() {
    this.historyStack = [];
    this.currentScreen = null;
    this.screens = [
      'screen-welcome',
      'screen-login',
      'screen-home',
      'screen-explore',
      'screen-search-results',
      'screen-hotel-details',
      'screen-room-selection',
      'screen-traveler-info',
      'screen-payment',
      'screen-confirmation',
      'screen-my-trips',
      'screen-trip-details',
      'screen-profile',
      'screen-favorites',
      'screen-notifications',
      'screen-review-rating'
    ];
  }

  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (this.screens.includes(hash)) {
        this.navigateTo(hash, false);
      }
    });

    // Handle initial route
    const initialHash = window.location.hash.replace('#', '');
    if (this.screens.includes(initialHash)) {
      this.navigateTo(initialHash, false);
    } else {
      this.navigateTo('screen-welcome', false);
    }
  }

  navigateTo(screenId, pushToHistory = true) {
    if (!this.screens.includes(screenId)) return;

    if (pushToHistory && this.currentScreen && this.currentScreen !== screenId) {
      this.historyStack.push(this.currentScreen);
    }

    const previousScreen = this.currentScreen;
    this.currentScreen = screenId;

    // Hide all screens
    document.querySelectorAll('.screen-view').forEach(view => {
      view.classList.remove('active');
    });

    // Show target screen
    const targetEl = document.getElementById(screenId);
    if (targetEl) {
      targetEl.classList.add('active');
      
      // Scroll app viewport to top
      const viewport = document.getElementById('app-viewport');
      if (viewport) {
        viewport.scrollTop = 0;
      }
    }

    // Update URL hash
    window.location.hash = screenId;

    // Update Dev screen dropdown if present
    const devSelect = document.getElementById('dev-screen-select');
    if (devSelect) {
      devSelect.value = screenId;
    }

    // Update status bar styling & welcome screen classes
    const statusBar = document.getElementById('device-status-bar');
    const deviceFrame = document.getElementById('device-frame');
    if (screenId === 'screen-welcome') {
      if (statusBar) statusBar.classList.add('dark-mode-status');
      document.body.classList.add('is-welcome-screen');
      if (deviceFrame) deviceFrame.classList.add('is-welcome-screen');
    } else {
      if (statusBar) statusBar.classList.remove('dark-mode-status');
      document.body.classList.remove('is-welcome-screen');
      if (deviceFrame) deviceFrame.classList.remove('is-welcome-screen');
    }

    // Update Bottom Nav active indicator
    this.updateBottomNav(screenId);

    // Call screen-specific render logic
    if (window.TG_COMPONENTS && typeof window.TG_COMPONENTS.renderScreen === 'function') {
      window.TG_COMPONENTS.renderScreen(screenId);
    }

    // Refresh icons
    TG_UTILS.refreshIcons();
  }

  goBack() {
    if (this.historyStack.length > 0) {
      const prev = this.historyStack.pop();
      this.navigateTo(prev, false);
    } else {
      // Default fallback
      if (this.currentScreen === 'screen-hotel-details') {
        this.navigateTo('screen-search-results', false);
      } else if (this.currentScreen === 'screen-search-results') {
        this.navigateTo('screen-explore', false);
      } else {
        this.navigateTo('screen-home', false);
      }
    }
  }

  updateBottomNav(screenId) {
    // Screens with bottom nav
    const bottomNav = document.getElementById('global-bottom-nav');
    if (!bottomNav) return;

    const navScreens = ['screen-home', 'screen-explore', 'screen-my-trips', 'screen-favorites', 'screen-profile'];
    if (navScreens.includes(screenId)) {
      bottomNav.style.display = 'flex';
      
      // Update active nav button
      bottomNav.querySelectorAll('.nav-item').forEach(btn => {
        const target = btn.getAttribute('data-target');
        if (target === screenId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    } else {
      bottomNav.style.display = 'none';
    }
  }
}

const tgRouter = new AppRouter();
