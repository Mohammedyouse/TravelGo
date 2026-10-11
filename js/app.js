/* ==========================================================================
   TravelGo - Main Application Orchestrator & Event Listeners
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize router
  tgRouter.init();

  // Status bar real-time clock
  TG_UTILS.updateStatusTime();
  setInterval(() => TG_UTILS.updateStatusTime(), 30000);

  // Initial icon setup
  TG_UTILS.refreshIcons();

  // Setup Dev Toolbar Listeners
  setupDevToolbar();

  // Setup Global Nav & Back Buttons
  setupGlobalNavigation();

  // Setup Screen-Specific Event Listeners
  setupScreenListeners();

  // Check initial theme
  if (tgState.theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});

// Dev Toolbar
function setupDevToolbar() {
  const select = document.getElementById('dev-screen-select');
  if (select) {
    select.addEventListener('change', (e) => {
      tgRouter.navigateTo(e.target.value);
    });
  }

  // Viewport mode switcher
  const btnMobile = document.getElementById('dev-btn-mobile');
  const btnTablet = document.getElementById('dev-btn-tablet');
  const btnFluid = document.getElementById('dev-btn-fluid');

  if (btnMobile) {
    btnMobile.addEventListener('click', () => {
      document.body.classList.remove('mode-tablet', 'mode-fluid');
      btnMobile.classList.add('dev-btn-primary');
      if (btnTablet) btnTablet.classList.remove('dev-btn-primary');
      if (btnFluid) btnFluid.classList.remove('dev-btn-primary');
    });
  }

  if (btnTablet) {
    btnTablet.addEventListener('click', () => {
      document.body.classList.remove('mode-fluid');
      document.body.classList.add('mode-tablet');
      btnTablet.classList.add('dev-btn-primary');
      if (btnMobile) btnMobile.classList.remove('dev-btn-primary');
      if (btnFluid) btnFluid.classList.remove('dev-btn-primary');
    });
  }

  if (btnFluid) {
    btnFluid.addEventListener('click', () => {
      document.body.classList.remove('mode-tablet');
      document.body.classList.add('mode-fluid');
      btnFluid.classList.add('dev-btn-primary');
      if (btnMobile) btnMobile.classList.remove('dev-btn-primary');
      if (btnTablet) btnTablet.classList.remove('dev-btn-primary');
    });
  }

  // Reset demo data
  const btnReset = document.getElementById('dev-btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Reset all demo bookings, favorites, and profile data to original defaults?')) {
        tgState.resetDemoData();
        tgRouter.navigateTo('screen-home');
        TG_UTILS.showToast('Demo data reset successfully!', 'info');
      }
    });
  }
}

// Global Nav & Back Buttons
function setupGlobalNavigation() {
  // Bottom Navigation Items
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) {
        tgRouter.navigateTo(target);
      }
    });
  });

  // Generic Back Buttons
  document.querySelectorAll('[data-action="go-back"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tgRouter.goBack();
    });
  });
}

// Screen Specific Listeners
function setupScreenListeners() {
  // Screen 01: Welcome
  const btnWelcomeStart = document.getElementById('btn-welcome-start');
  if (btnWelcomeStart) {
    btnWelcomeStart.addEventListener('click', () => {
      tgRouter.navigateTo('screen-login');
    });
  }

  const linkWelcomeLogin = document.getElementById('link-welcome-login');
  if (linkWelcomeLogin) {
    linkWelcomeLogin.addEventListener('click', (e) => {
      e.preventDefault();
      tgRouter.navigateTo('screen-login');
    });
  }

  // Screen 02: Login / Sign Up
  const tabSignIn = document.getElementById('tab-auth-signin');
  const tabSignUp = document.getElementById('tab-auth-signup');
  const authTitle = document.getElementById('auth-title-text');
  const authSubmitBtn = document.getElementById('btn-auth-submit');
  const authNameGroup = document.getElementById('auth-name-group');
  const authConfirmGroup = document.getElementById('auth-confirm-password-group');
  const forgotPasswordLink = document.getElementById('auth-forgot-password-link');

  let currentAuthMode = 'signin';

  if (tabSignIn && tabSignUp) {
    tabSignIn.addEventListener('click', () => {
      currentAuthMode = 'signin';
      tabSignIn.classList.add('active');
      tabSignUp.classList.remove('active');
      if (authTitle) authTitle.textContent = 'Welcome Back 👋';
      if (authSubmitBtn) authSubmitBtn.textContent = 'Sign In';
      if (authNameGroup) authNameGroup.style.display = 'none';
      if (authConfirmGroup) authConfirmGroup.style.display = 'none';
      if (forgotPasswordLink) forgotPasswordLink.style.display = 'block';
      const autofillBanner = document.querySelector('.demo-autofill-banner');
      if (autofillBanner) autofillBanner.style.display = 'flex';
    });

    tabSignUp.addEventListener('click', () => {
      currentAuthMode = 'signup';
      tabSignUp.classList.add('active');
      tabSignIn.classList.remove('active');
      if (authTitle) authTitle.textContent = 'Create Account 🚀';
      if (authSubmitBtn) authSubmitBtn.textContent = 'Create Account';
      if (authNameGroup) {
        authNameGroup.style.display = 'block';
        const nameIn = document.getElementById('auth-name-input');
        if (nameIn) nameIn.focus();
      }
      if (authConfirmGroup) authConfirmGroup.style.display = 'block';
      if (forgotPasswordLink) forgotPasswordLink.style.display = 'none';
      const autofillBanner = document.querySelector('.demo-autofill-banner');
      if (autofillBanner) autofillBanner.style.display = 'none';
      TG_UTILS.refreshIcons();
    });
  }

  // Password visibility toggle (Password)
  const togglePassBtn = document.getElementById('toggle-password-visibility');
  const passInput = document.getElementById('auth-password-input');
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePassBtn.innerHTML = isPass ? '<i data-lucide="eye-off"></i>' : '<i data-lucide="eye"></i>';
      TG_UTILS.refreshIcons();
    });
  }

  // Password visibility toggle (Confirm Password)
  const toggleConfirmPassBtn = document.getElementById('toggle-confirm-password-visibility');
  const confirmPassInput = document.getElementById('auth-confirm-password-input');
  if (toggleConfirmPassBtn && confirmPassInput) {
    toggleConfirmPassBtn.addEventListener('click', () => {
      const isPass = confirmPassInput.type === 'password';
      confirmPassInput.type = isPass ? 'text' : 'password';
      toggleConfirmPassBtn.innerHTML = isPass ? '<i data-lucide="eye-off"></i>' : '<i data-lucide="eye"></i>';
      TG_UTILS.refreshIcons();
    });
  }

  // Forgot Password handler
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      TG_UTILS.showToast('Password recovery is disabled in offline prototype mode.', 'info');
    });
  }

  // Autofill demo login
  const btnAutofillLogin = document.getElementById('btn-autofill-login');
  if (btnAutofillLogin) {
    btnAutofillLogin.addEventListener('click', () => {
      const emailIn = document.getElementById('auth-email-input');
      const passIn = document.getElementById('auth-password-input');
      const nameIn = document.getElementById('auth-name-input');
      if (emailIn) emailIn.value = 'alex.morgan@travelgo.com';
      if (passIn) passIn.value = 'DemoPass2026!';
      if (nameIn) nameIn.value = 'Alex Morgan';
      TG_UTILS.showToast('Demo credentials filled! Click Sign In to continue.', 'info');
    });
  }

  // Submit Login or Create Account
  const authForm = document.getElementById('auth-login-form');
  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailIn = document.getElementById('auth-email-input');
      const passIn = document.getElementById('auth-password-input');
      const nameIn = document.getElementById('auth-name-input');
      const confirmIn = document.getElementById('auth-confirm-password-input');

      const email = emailIn ? emailIn.value.trim() : '';
      const pass = passIn ? passIn.value : '';
      const name = nameIn ? nameIn.value.trim() : '';
      const confirmPass = confirmIn ? confirmIn.value : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (currentAuthMode === 'signup') {
        if (!name) {
          TG_UTILS.showToast('Please enter your full name', 'error');
          if (nameIn) nameIn.focus();
          return;
        }
        if (!email || !emailRegex.test(email)) {
          TG_UTILS.showToast('Please enter a valid email address', 'error');
          if (emailIn) emailIn.focus();
          return;
        }
        if (!pass || pass.length < 6) {
          TG_UTILS.showToast('Password must be at least 6 characters', 'error');
          if (passIn) passIn.focus();
          return;
        }
        if (!confirmPass) {
          TG_UTILS.showToast('Please confirm your password', 'error');
          if (confirmIn) confirmIn.focus();
          return;
        }
        if (pass !== confirmPass) {
          TG_UTILS.showToast('Passwords do not match. Please re-enter.', 'error');
          if (confirmIn) confirmIn.focus();
          return;
        }

        const res = await tgState.registerUser(name, email, pass);
        if (!res.success) {
          TG_UTILS.showToast(res.message, 'error');
          return;
        }

        const firstName = name.split(/\s+/)[0];
        TG_UTILS.showToast(`Account created! Welcome, ${firstName}!`, 'success');
        tgRouter.navigateTo('screen-home');
      } else {
        // Sign In mode
        if (!email || !emailRegex.test(email)) {
          TG_UTILS.showToast('Please enter a valid email address', 'error');
          if (emailIn) emailIn.focus();
          return;
        }
        if (!pass) {
          TG_UTILS.showToast('Please enter your password', 'error');
          if (passIn) passIn.focus();
          return;
        }

        const res = await tgState.loginUser(email, pass);
        if (!res.success) {
          TG_UTILS.showToast(res.message, 'error');
          return;
        }

        const savedName = (tgState.user && tgState.user.name) ? tgState.user.name.trim() : '';
        const firstName = savedName ? savedName.split(/\s+/)[0] : '';
        const welcomeMsg = firstName ? `Welcome back, ${firstName}!` : 'Welcome back!';
        TG_UTILS.showToast(welcomeMsg, 'success');
        tgRouter.navigateTo('screen-home');
      }
    });
  }

  // Social Login buttons — honestly report prototype status
  document.querySelectorAll('.auth-social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      TG_UTILS.showToast('Social OAuth is disabled in prototype mode. Please sign in with email.', 'info');
    });
  });

  // Screen 03: Home
  const homeSearchTrigger = document.getElementById('home-search-trigger');
  if (homeSearchTrigger) {
    homeSearchTrigger.addEventListener('click', () => {
      tgRouter.navigateTo('screen-explore');
    });
  }

  const homeAvatarBtn = document.getElementById('home-avatar-btn');
  if (homeAvatarBtn) {
    homeAvatarBtn.addEventListener('click', () => {
      tgRouter.navigateTo('screen-profile');
    });
  }

  const homeUserInfoBtn = document.getElementById('home-user-info-btn');
  if (homeUserInfoBtn) {
    homeUserInfoBtn.addEventListener('click', () => {
      tgRouter.navigateTo('screen-profile');
    });
  }

  const homeNotifBtn = document.getElementById('home-notif-btn');
  if (homeNotifBtn) {
    homeNotifBtn.addEventListener('click', () => {
      tgRouter.navigateTo('screen-notifications');
    });
  }

  const homePromoBanner = document.getElementById('home-promo-banner');
  if (homePromoBanner) {
    homePromoBanner.addEventListener('click', () => {
      tgState.setSelectedHotel('hotel-astra');
      tgRouter.navigateTo('screen-hotel-details');
    });
  }

  // Working Category Pills filter on Home Screen
  document.querySelectorAll('#home-category-pills .category-pill').forEach(pill => {
    const handleCategorySelect = () => {
      const category = pill.getAttribute('data-cat') || 'all';
      TG_COMPONENTS.setHomeCategory(category);
    };

    pill.addEventListener('click', handleCategorySelect);
    pill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCategorySelect();
      }
    });
  });

  // Screen 04: Explore
  const exploreSearchBtn = document.getElementById('btn-explore-search');
  if (exploreSearchBtn) {
    exploreSearchBtn.addEventListener('click', () => {
      const destInput = document.getElementById('explore-search-input');
      if (destInput && destInput.value.trim()) {
        tgState.search.destination = destInput.value.trim();
      }
      tgRouter.navigateTo('screen-search-results');
    });
  }

  // Trending tag chips in Explore
  document.querySelectorAll('.tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const tag = chip.getAttribute('data-tag');
      const input = document.getElementById('explore-search-input');
      if (input) input.value = tag;
      tgState.search.destination = tag;
      TG_UTILS.showToast(`Selected destination: ${tag}`, 'info');
    });
  });

  // Screen 05: Search Results Filter Chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const sortType = chip.getAttribute('data-sort');
      TG_COMPONENTS.renderSearchResults(sortType);
      TG_UTILS.showToast(`Sorted by: ${chip.textContent.trim()}`, 'info');
    });
  });

  // Screen 06: Hotel Details
  const btnSelectRoom = document.getElementById('btn-hotel-select-room');
  if (btnSelectRoom) {
    btnSelectRoom.addEventListener('click', () => {
      tgRouter.navigateTo('screen-room-selection');
    });
  }

  const hotelFavBtn = document.getElementById('hotel-detail-fav-btn');
  if (hotelFavBtn) {
    hotelFavBtn.addEventListener('click', () => {
      if (tgState.selectedHotel) {
        TG_COMPONENTS.toggleFavorite(tgState.selectedHotel.id, hotelFavBtn);
      }
    });
  }

  // Screen 07: Room Selection Continue CTA
  const btnContinueToTraveler = document.getElementById('btn-room-continue');
  if (btnContinueToTraveler) {
    btnContinueToTraveler.addEventListener('click', () => {
      tgRouter.navigateTo('screen-traveler-info');
    });
  }

  // Screen 08: Traveler Information Form Submit
  const travelerForm = document.getElementById('traveler-info-form');
  if (travelerForm) {
    travelerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fName = document.getElementById('input-traveler-first-name');
      const lName = document.getElementById('input-traveler-last-name');
      const email = document.getElementById('input-traveler-email');
      const phone = document.getElementById('input-traveler-phone');

      if (!fName.value.trim()) {
        TG_UTILS.showToast('Please enter your first name', 'error');
        fName.focus();
        return;
      }
      if (!lName.value.trim()) {
        TG_UTILS.showToast('Please enter your last name', 'error');
        lName.focus();
        return;
      }
      if (!email.value.trim() || !email.value.includes('@')) {
        TG_UTILS.showToast('Please enter a valid email for confirmation', 'error');
        email.focus();
        return;
      }

      tgState.updateTraveler({
        firstName: fName.value.trim(),
        lastName: lName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim()
      });

      tgRouter.navigateTo('screen-payment');
    });
  }

  // Screen 09: Payment
  setupPaymentScreen();

  // Screen 10: Confirmation
  const btnConfirmMyTrips = document.getElementById('btn-confirm-my-trips');
  if (btnConfirmMyTrips) {
    btnConfirmMyTrips.addEventListener('click', () => {
      tgRouter.navigateTo('screen-my-trips');
    });
  }

  const btnConfirmItinerary = document.getElementById('btn-confirm-itinerary');
  if (btnConfirmItinerary) {
    btnConfirmItinerary.addEventListener('click', () => {
      tgRouter.navigateTo('screen-trip-details');
    });
  }

  const btnConfirmHome = document.getElementById('btn-confirm-home');
  if (btnConfirmHome) {
    btnConfirmHome.addEventListener('click', () => {
      tgRouter.navigateTo('screen-home');
    });
  }

  const btnCopyRef = document.getElementById('btn-copy-ref');
  if (btnCopyRef) {
    btnCopyRef.addEventListener('click', () => {
      const code = document.getElementById('confirm-ref-code').textContent;
      TG_UTILS.copyToClipboard(code, 'Booking reference copied!');
    });
  }

  // Screen 11: My Trips Tabs
  const tabUpcoming = document.getElementById('tab-trips-upcoming');
  const tabCompleted = document.getElementById('tab-trips-completed');
  if (tabUpcoming && tabCompleted) {
    tabUpcoming.addEventListener('click', () => {
      tabUpcoming.classList.add('active');
      tabCompleted.classList.remove('active');
      window.currentTripTab = 'upcoming';
      TG_COMPONENTS.renderMyTrips();
      TG_UTILS.refreshIcons();
    });

    tabCompleted.addEventListener('click', () => {
      tabCompleted.classList.add('active');
      tabUpcoming.classList.remove('active');
      window.currentTripTab = 'completed';
      TG_COMPONENTS.renderMyTrips();
      TG_UTILS.refreshIcons();
    });
  }

  // Screen 13: Profile actions
  const btnSignOut = document.getElementById('btn-profile-signout');
  if (btnSignOut) {
    btnSignOut.addEventListener('click', () => {
      if (confirm('Are you sure you want to sign out of TravelGo?')) {
        tgState.logoutUser();
        TG_UTILS.showToast('You have signed out', 'info');
        tgRouter.navigateTo('screen-welcome');
      }
    });
  }

  const darkToggle = document.getElementById('profile-dark-toggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const isDark = current === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        tgState.theme = 'light';
        tgState.saveStorage(STORAGE_KEYS.THEME, 'light');
        TG_UTILS.showToast('Switched to Light Mode ☀️', 'info');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        tgState.theme = 'dark';
        tgState.saveStorage(STORAGE_KEYS.THEME, 'dark');
        TG_UTILS.showToast('Switched to Dark Mode 🌙', 'info');
      }
    });
  }

  // Screen 15: Notifications Mark All Read
  const btnMarkRead = document.getElementById('btn-notifications-mark-read');
  if (btnMarkRead) {
    btnMarkRead.addEventListener('click', () => {
      tgState.markAllNotificationsRead();
      TG_COMPONENTS.renderNotifications();
      TG_UTILS.refreshIcons();
      TG_UTILS.showToast('All notifications marked as read', 'success');
    });
  }

  // Screen 16: Review & Rating
  setupReviewScreen();
}

// Payment interactions setup
function setupPaymentScreen() {
  // Method selection tabs
  document.querySelectorAll('.payment-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const method = tab.getAttribute('data-method');
      const cardForm = document.getElementById('card-payment-form-section');
      if (cardForm) {
        cardForm.style.display = method === 'card' ? 'block' : 'none';
      }
      TG_UTILS.showToast(`Selected ${tab.textContent.trim()} payment`, 'info');
    });
  });

  // Autofill test card button
  const btnAutofillCard = document.getElementById('btn-autofill-card');
  if (btnAutofillCard) {
    btnAutofillCard.addEventListener('click', () => {
      const numIn = document.getElementById('pay-card-number');
      const nameIn = document.getElementById('pay-card-name');
      const expIn = document.getElementById('pay-card-expiry');
      const cvvIn = document.getElementById('pay-card-cvv');

      if (numIn) numIn.value = '4242 4242 4242 4242';
      if (nameIn) {
        const uName = (tgState.user && tgState.user.name && tgState.user.name.trim()) ? tgState.user.name.trim() : '';
        const tName = (tgState.traveler && tgState.traveler.firstName) ? `${tgState.traveler.firstName} ${tgState.traveler.lastName || ''}`.trim() : '';
        nameIn.value = uName || tName || 'Alex Morgan';
      }
      if (expIn) expIn.value = '10/28';
      if (cvvIn) cvvIn.value = '849';

      TG_UTILS.showToast('Demo payment card filled!', 'success');
    });
  }

  // Apply discount voucher
  const btnApplyPromo = document.getElementById('btn-apply-promo');
  const promoInput = document.getElementById('pay-promo-input');
  if (btnApplyPromo && promoInput) {
    btnApplyPromo.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'TRAVELGO10' || code === 'AUTUMN20') {
        const discountVal = code === 'TRAVELGO10' ? 150 : 250;
        window.travelgoDiscount = discountVal;
        TG_COMPONENTS.renderPayment();
        TG_UTILS.showToast(`Promo code applied! Saved ${TG_UTILS.formatPrice(discountVal)} 🎉`, 'success');
      } else {
        TG_UTILS.showToast('Invalid promo code. Try TRAVELGO10', 'error');
      }
    });
  }

  // Pay Submit button
  const payForm = document.getElementById('payment-checkout-form');
  if (payForm) {
    payForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const numIn = document.getElementById('pay-card-number');
      if (!numIn.value) {
        TG_UTILS.showToast('Please enter card details or click Autofill', 'error');
        return;
      }

      const payBtn = document.getElementById('btn-pay-submit');
      if (payBtn) {
        payBtn.disabled = true;
        payBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Processing Secure Payment...`;
        TG_UTILS.refreshIcons();
      }

      setTimeout(() => {
        // Create demo booking in state
        const newBooking = tgState.createBooking({ discount: window.travelgoDiscount || 0 });
        if (payBtn) {
          payBtn.disabled = false;
        }
        TG_UTILS.showToast('Payment successful! Booking confirmed 🎉', 'success');
        tgRouter.navigateTo('screen-confirmation');
      }, 1200);
    });
  }
}

// Review Screen Setup
function setupReviewScreen() {
  let selectedRating = 5;
  const starsContainer = document.getElementById('review-star-selector');
  const moodLabel = document.getElementById('review-rating-mood');

  const moods = {
    1: 'Needs Improvement (1.0)',
    2: 'Fair Experience (2.0)',
    3: 'Good Stay (3.0)',
    4: 'Wonderful! (4.0)',
    5: 'Exceptional Luxury! (5.0)'
  };

  if (starsContainer) {
    starsContainer.querySelectorAll('.star-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-val'));
        selectedRating = val;
        starsContainer.querySelectorAll('.star-btn').forEach(b => {
          const bVal = parseInt(b.getAttribute('data-val'));
          if (bVal <= val) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
        if (moodLabel) moodLabel.textContent = moods[val];
      });
    });
  }

  // Submit Review Form
  const reviewForm = document.getElementById('review-submission-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleIn = document.getElementById('review-title-input');
      const textIn = document.getElementById('review-comment-input');

      if (!titleIn.value.trim()) {
        TG_UTILS.showToast('Please enter a review headline', 'error');
        titleIn.focus();
        return;
      }
      if (!textIn.value.trim() || textIn.value.length < 10) {
        TG_UTILS.showToast('Please write at least a few sentences about your stay', 'error');
        textIn.focus();
        return;
      }

      tgState.addReview({
        rating: selectedRating,
        title: titleIn.value.trim(),
        comment: textIn.value.trim()
      });

      // Show Thank You modal
      const modal = document.getElementById('review-thank-you-modal');
      if (modal) {
        modal.style.display = 'flex';
      } else {
        TG_UTILS.showToast('Thank you! Review published & +200 points awarded! 🎉', 'success');
        tgRouter.navigateTo('screen-my-trips');
      }
    });
  }

  // Close Thank you modal
  const btnCloseModal = document.getElementById('btn-close-review-modal');
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      const modal = document.getElementById('review-thank-you-modal');
      if (modal) modal.style.display = 'none';
      tgRouter.navigateTo('screen-my-trips');
    });
  }
}
