/* ==========================================================================
   TravelGo - Screen Renderers & Component Logic
   ========================================================================== */

const TG_COMPONENTS = {
  renderScreen(screenId) {
    switch (screenId) {
      case 'screen-home':
        this.renderHome();
        break;
      case 'screen-explore':
        this.renderExplore();
        break;
      case 'screen-search-results':
        this.renderSearchResults();
        break;
      case 'screen-hotel-details':
        this.renderHotelDetails();
        break;
      case 'screen-room-selection':
        this.renderRoomSelection();
        break;
      case 'screen-traveler-info':
        this.renderTravelerInfo();
        break;
      case 'screen-payment':
        this.renderPayment();
        break;
      case 'screen-confirmation':
        this.renderConfirmation();
        break;
      case 'screen-my-trips':
        this.renderMyTrips();
        break;
      case 'screen-trip-details':
        this.renderTripDetails();
        break;
      case 'screen-profile':
        this.renderProfile();
        break;
      case 'screen-favorites':
        this.renderFavorites();
        break;
      case 'screen-notifications':
        this.renderNotifications();
        break;
      case 'screen-review-rating':
        this.renderReviewRating();
        break;
    }
  },

  // 03: Home Screen
  renderHome() {
    // Dynamic Personalized User Greeting
    const u = tgState.user;
    const nameEl = document.getElementById('home-greeting-name') || document.querySelector('.home-greeting-name');
    const subEl = document.getElementById('home-greeting-sub') || document.querySelector('.home-greeting-sub');

    if (nameEl) {
      nameEl.textContent = (u && u.name && u.name.trim()) ? u.name.trim() : 'Explorer';
    }
    if (subEl) {
      if (u && u.name && u.name.trim()) {
        subEl.textContent = 'Good morning, 👋';
      } else {
        subEl.textContent = 'Welcome back! 👋';
      }
    }

    const avatarImg = document.getElementById('home-avatar-img');
    if (avatarImg) {
      avatarImg.src = (u && u.avatar) ? u.avatar : 'assets/images/avatar_user.jpg';
    }

    const unreadCount = tgState.notifications.filter(n => !n.read).length;
    const badgeEl = document.getElementById('home-notif-badge');
    if (badgeEl) {
      badgeEl.textContent = unreadCount;
      badgeEl.style.display = unreadCount > 0 ? 'flex' : 'none';
    }

    // Render Destinations carousel
    const destContainer = document.getElementById('home-destinations-list');
    if (destContainer) {
      destContainer.innerHTML = TG_DATA.destinations.map(d => `
        <div class="dest-card" onclick="TG_COMPONENTS.onSelectDestination('${d.name}')" tabindex="0" role="button" aria-label="Explore ${d.name}, ${d.country}">
          <img src="${d.image}" alt="${d.name}" loading="lazy" />
          <div class="dest-card-overlay">
            <span class="dest-card-title">${d.name}</span>
            <span class="dest-card-country">${d.country} • ★ ${d.rating}</span>
          </div>
        </div>
      `).join('');
    }

    // Render Category-filtered Accommodations
    const activeCat = window.currentHomeCategory || 'all';
    this.renderHomeAccommodations(activeCat);
  },

  // Renders the accommodations list based on active category filter
  renderHomeAccommodations(category = 'all') {
    const hotelContainer = document.getElementById('home-popular-hotels');
    if (!hotelContainer) return;

    let items = TG_DATA.hotels;
    if (category && category !== 'all') {
      items = TG_DATA.hotels.filter(h => h.category === category);
    }

    if (items.length === 0) {
      hotelContainer.innerHTML = `
        <div class="empty-state-box" style="padding: 32px 16px; margin: 12px 0; text-align: center;">
          <div class="empty-state-icon"><i data-lucide="building"></i></div>
          <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">No ${category} found</h4>
          <p style="font-size: 13px; color: var(--color-text-secondary); margin-bottom: 16px;">Try viewing all accommodations or choosing another category.</p>
          <button type="button" class="btn btn-primary btn-sm" onclick="TG_COMPONENTS.setHomeCategory('all')">View All Stays</button>
        </div>
      `;
      TG_UTILS.refreshIcons();
      return;
    }

    hotelContainer.innerHTML = items.map(hotel => {
      const isFav = tgState.isFavorite(hotel.id);
      return `
        <div class="hotel-card" onclick="TG_COMPONENTS.onSelectHotel('${hotel.id}')" tabindex="0" role="button" aria-label="View details for ${hotel.name}">
          <div class="hotel-card-media">
            <img src="${hotel.images[0]}" alt="${hotel.name}" loading="lazy" />
            <span class="badge badge-primary hotel-card-badge">${hotel.badge || hotel.categoryLabel || 'Luxury'}</span>
            <button type="button" class="hotel-card-fav-btn ${isFav ? 'is-favorite' : ''}" 
              onclick="event.stopPropagation(); TG_COMPONENTS.toggleFavorite('${hotel.id}', this)"
              aria-label="Save ${hotel.name}">
              <i data-lucide="heart"></i>
            </button>
          </div>
          <div class="hotel-card-body">
            <div class="hotel-card-header">
              <h4 class="hotel-card-title">${hotel.name}</h4>
              <div class="badge-rating">
                <i data-lucide="star"></i>
                <span>${hotel.rating}</span>
              </div>
            </div>
            <div class="hotel-card-location">
              <i data-lucide="map-pin"></i>
              <span>${hotel.locationDetail}</span>
            </div>
            <div class="hotel-card-amenities">
              ${hotel.amenities.slice(0, 3).map(a => `<span class="amenity-tag">${a.name}</span>`).join('')}
            </div>
            <div class="hotel-card-footer">
              <div class="hotel-card-price-wrap">
                <div class="hotel-card-price">${TG_UTILS.formatPrice(hotel.pricePerNight)} <span>/ night</span></div>
                <div class="hotel-card-taxes">Includes taxes & fees</div>
              </div>
              <button type="button" class="btn btn-sm btn-subtle">View Details</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
    TG_UTILS.refreshIcons();
  },

  // Category switcher with accessible states
  setHomeCategory(category) {
    window.currentHomeCategory = category;
    document.querySelectorAll('#home-category-pills .category-pill').forEach(pill => {
      const isMatch = pill.getAttribute('data-cat') === category;
      pill.classList.toggle('active', isMatch);
      pill.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });
    this.renderHomeAccommodations(category);
  },

  // 04: Explore Screen
  renderExplore() {
    const queryEl = document.getElementById('explore-search-input');
    if (queryEl) {
      queryEl.value = tgState.search.destination || '';
    }
  },

  // 05: Search Results Screen
  renderSearchResults(sortType = 'top-rated') {
    window.currentResultsSort = sortType;
    const listEl = document.getElementById('search-results-list');
    const countEl = document.getElementById('results-count-text');
    const destHeader = document.querySelector('#screen-search-results .header-title');

    const destination = (tgState.search.destination || '').trim();
    if (destHeader && destination) {
      destHeader.textContent = destination;
    }

    // Filter by destination if specified
    let items = [...TG_DATA.hotels];
    if (destination) {
      const q = destination.toLowerCase().split(',')[0].trim();
      const matched = items.filter(h => h.destination.toLowerCase().includes(q) || h.name.toLowerCase().includes(q));
      if (matched.length > 0) {
        items = matched;
      }
    }

    // Apply sort or filter
    if (sortType === 'price-low') {
      items.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortType === '5-stars') {
      items = items.filter(h => h.rating >= 4.9);
    } else if (sortType === 'free-cancel') {
      items = items.filter(h => h.rooms.some(r => r.perks.some(p => p.toLowerCase().includes('cancellation'))));
    } else {
      // top-rated
      items.sort((a, b) => b.rating - a.rating);
    }

    if (countEl) {
      countEl.textContent = `${items.length} luxury properties found`;
    }

    if (!listEl) return;

    if (items.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state-box" style="padding: 36px 16px; text-align: center;">
          <div class="empty-state-icon"><i data-lucide="building"></i></div>
          <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">No properties matched</h4>
          <p style="font-size: 13px; color: var(--color-text-secondary); margin-bottom: 16px;">Try adjusting your destination or sort filter.</p>
          <button type="button" class="btn btn-primary btn-sm" onclick="tgState.search.destination=''; TG_COMPONENTS.renderSearchResults('top-rated')">Show All Properties</button>
        </div>
      `;
      TG_UTILS.refreshIcons();
      return;
    }

    listEl.innerHTML = items.map(hotel => {
      const isFav = tgState.isFavorite(hotel.id);
      return `
        <div class="hotel-card" onclick="TG_COMPONENTS.onSelectHotel('${hotel.id}')" tabindex="0" role="button" aria-label="View ${hotel.name}">
          <div class="hotel-card-media">
            <img src="${hotel.images[0]}" alt="${hotel.name}" loading="lazy" />
            <span class="badge badge-primary hotel-card-badge">${hotel.badge || hotel.categoryLabel}</span>
            <button type="button" class="hotel-card-fav-btn ${isFav ? 'is-favorite' : ''}" 
              onclick="event.stopPropagation(); TG_COMPONENTS.toggleFavorite('${hotel.id}', this)"
              aria-label="Save hotel">
              <i data-lucide="heart"></i>
            </button>
          </div>
          <div class="hotel-card-body">
            <div class="hotel-card-header">
              <h4 class="hotel-card-title">${hotel.name}</h4>
              <div class="badge-rating">
                <i data-lucide="star"></i>
                <span>${hotel.rating} (${hotel.reviewsCount})</span>
              </div>
            </div>
            <div class="hotel-card-location">
              <i data-lucide="map-pin"></i>
              <span>${hotel.locationDetail}</span>
            </div>
            <div class="hotel-card-amenities">
              ${hotel.amenities.slice(0, 3).map(a => `<span class="amenity-tag">${a.name}</span>`).join('')}
            </div>
            <div class="hotel-card-footer">
              <div class="hotel-card-price-wrap">
                <div class="hotel-card-price">${TG_UTILS.formatPrice(hotel.pricePerNight)} <span>/ night</span></div>
                <div class="hotel-card-taxes">Free cancellation</div>
              </div>
              <button type="button" class="btn btn-sm btn-primary">Book Now</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
    TG_UTILS.refreshIcons();
  },

  // 06: Hotel Details Screen
  renderHotelDetails() {
    const hotel = tgState.selectedHotel || TG_DATA.hotels[0];
    const isFav = tgState.isFavorite(hotel.id);

    // Hero image
    const heroImg = document.getElementById('hotel-detail-hero-img');
    if (heroImg) heroImg.src = hotel.images[0];

    // Titles
    const nameEl = document.getElementById('hotel-detail-name');
    if (nameEl) nameEl.textContent = hotel.name;

    const locEl = document.getElementById('hotel-detail-location');
    if (locEl) locEl.textContent = hotel.locationDetail;

    const ratingEl = document.getElementById('hotel-detail-rating');
    if (ratingEl) ratingEl.textContent = `${hotel.rating} (${hotel.reviewsCount} reviews) • Exceptional`;

    const descEl = document.getElementById('hotel-detail-description');
    if (descEl) descEl.textContent = hotel.description;

    const priceEl = document.getElementById('hotel-detail-price');
    if (priceEl) priceEl.innerHTML = `${TG_UTILS.formatPrice(hotel.pricePerNight)} <span>/ night</span>`;

    const favBtn = document.getElementById('hotel-detail-fav-btn');
    if (favBtn) {
      if (isFav) {
        favBtn.classList.add('is-favorite');
      } else {
        favBtn.classList.remove('is-favorite');
      }
    }

    // Amenities
    const amenitiesContainer = document.getElementById('hotel-detail-amenities-grid');
    if (amenitiesContainer) {
      amenitiesContainer.innerHTML = hotel.amenities.map(a => `
        <div class="amenity-card">
          <div class="amenity-card-icon">
            <i data-lucide="${a.icon}"></i>
          </div>
          <span class="amenity-card-name">${a.name}</span>
        </div>
      `).join('');
    }

    // Reviews snippet
    const revContainer = document.getElementById('hotel-detail-reviews-snippet');
    if (revContainer && TG_DATA.reviews.length > 0) {
      const topRev = TG_DATA.reviews[0];
      revContainer.innerHTML = `
        <div style="background: var(--color-surface-subtle); border-radius: var(--radius-md); padding: 14px; margin-top: 10px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="${topRev.avatar}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
              <strong style="font-size: 13px;">${topRev.author}</strong>
            </div>
            <span style="font-size: 11px; color: var(--color-text-secondary);">${topRev.date}</span>
          </div>
          <p style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4;">"${topRev.comment}"</p>
        </div>
      `;
    }
  },

  // 07: Room Selection Screen
  renderRoomSelection() {
    const hotel = tgState.selectedHotel;
    const hotelNameEl = document.getElementById('room-screen-hotel-title');
    if (hotelNameEl) hotelNameEl.textContent = hotel.name;

    const roomsContainer = document.getElementById('rooms-list-container');
    if (roomsContainer) {
      roomsContainer.innerHTML = hotel.rooms.map(room => {
        const isSelected = tgState.selectedRoom && tgState.selectedRoom.id === room.id;
        return `
          <div class="room-card ${isSelected ? 'selected' : ''}" onclick="TG_COMPONENTS.onSelectRoom('${room.id}')">
            <div class="room-card-media">
              <img src="${room.image}" alt="${room.name}" loading="lazy" />
            </div>
            <div class="room-card-body">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h4 style="font-size: 15px; font-weight: 700; color: var(--color-text-primary);">${room.name}</h4>
                  <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">
                    <i data-lucide="maximize" style="width: 12px; height: 12px; display: inline;"></i> ${room.size} • 
                    <i data-lucide="users" style="width: 12px; height: 12px; display: inline;"></i> ${room.capacity}
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 17px; font-weight: 800; color: var(--color-primary-blue);">${TG_UTILS.formatPrice(room.price)}</div>
                  <div style="font-size: 11px; color: var(--color-text-secondary);">/ night</div>
                </div>
              </div>
              <div class="room-perks-list">
                ${room.perks.map(p => `
                  <div class="room-perk-item">
                    <i data-lucide="check-circle" style="width: 14px; height: 14px;"></i>
                    <span>${p}</span>
                  </div>
                `).join('')}
              </div>
              <button type="button" class="btn btn-sm btn-block ${isSelected ? 'btn-primary' : 'btn-secondary'}">
                ${isSelected ? 'Selected ✓' : 'Select Room'}
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    const priceBar = document.getElementById('room-selected-price-display');
    if (priceBar && tgState.selectedRoom) {
      priceBar.textContent = `${TG_UTILS.formatPrice(tgState.selectedRoom.price * tgState.search.nights)} total`;
    }
  },

  // 08: Traveler Information Screen
  renderTravelerInfo() {
    const hotel = tgState.selectedHotel;
    const room = tgState.selectedRoom;
    const search = tgState.search;

    const summaryEl = document.getElementById('traveler-screen-summary');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <img src="${hotel.images[0]}" class="booking-summary-thumb" />
        <div class="booking-summary-info">
          <strong style="font-size: 14px; color: var(--color-text-primary);">${hotel.name}</strong>
          <span style="font-size: 12px; color: var(--color-text-secondary);">${room.name}</span>
          <span style="font-size: 11px; color: var(--color-primary-blue); font-weight: 600; margin-top: 2px;">
            ${search.checkIn} - ${search.checkOut} (${search.nights} Nights)
          </span>
        </div>
      `;
    }

    // Prefill form
    const fName = document.getElementById('input-traveler-first-name');
    const lName = document.getElementById('input-traveler-last-name');
    const email = document.getElementById('input-traveler-email');
    const phone = document.getElementById('input-traveler-phone');

    if (fName) fName.value = tgState.traveler.firstName || '';
    if (lName) lName.value = tgState.traveler.lastName || '';
    if (email) email.value = tgState.traveler.email || '';
    if (phone) phone.value = tgState.traveler.phone || '+1 (555) 382-9104';
  },

  // 09: Payment Screen
  renderPayment() {
    const nights = tgState.search.nights;
    const roomPrice = tgState.selectedRoom ? tgState.selectedRoom.price : 380;
    const subtotal = roomPrice * nights;
    const taxes = Math.round(subtotal * 0.12);
    const discount = window.travelgoDiscount || 0;
    const total = subtotal + taxes - discount;

    const subtotalEl = document.getElementById('payment-subtotal');
    const taxesEl = document.getElementById('payment-taxes');
    const discountEl = document.getElementById('payment-discount');
    const totalEl = document.getElementById('payment-total');
    const ctaPayBtn = document.getElementById('btn-pay-submit');

    if (subtotalEl) subtotalEl.textContent = TG_UTILS.formatPrice(subtotal);
    if (taxesEl) taxesEl.textContent = TG_UTILS.formatPrice(taxes);
    if (discountEl) discountEl.textContent = discount > 0 ? `-${TG_UTILS.formatPrice(discount)}` : '$0';
    if (totalEl) totalEl.textContent = TG_UTILS.formatPrice(total);
    if (ctaPayBtn) ctaPayBtn.textContent = `Pay ${TG_UTILS.formatPrice(total)} & Confirm Booking`;
  },

  // 10: Confirmation Screen
  renderConfirmation() {
    const booking = tgState.currentBooking;
    if (!booking) return;

    const refEl = document.getElementById('confirm-ref-code');
    if (refEl) refEl.textContent = `#${booking.id}`;

    const hotelEl = document.getElementById('confirm-hotel-name');
    if (hotelEl) hotelEl.textContent = booking.hotelName;

    const destEl = document.getElementById('confirm-destination');
    if (destEl) destEl.textContent = booking.destination;

    const roomEl = document.getElementById('confirm-room-name');
    if (roomEl) roomEl.textContent = `${booking.roomName} • ${booking.guests} Guests`;

    const datesEl = document.getElementById('confirm-dates');
    if (datesEl) datesEl.textContent = `${booking.checkIn} – ${booking.checkOut} (${booking.nights} Nights)`;

    const totalEl = document.getElementById('confirm-total-price');
    if (totalEl) totalEl.textContent = TG_UTILS.formatPrice(booking.totalPrice);

    const guestEl = document.getElementById('confirm-traveler-name');
    if (guestEl) guestEl.textContent = booking.travelerName || (tgState.user && tgState.user.name) || "Valued Explorer";

    const heroSubEl = document.getElementById('confirm-hero-sub');
    if (heroSubEl) {
      const displayName = booking.travelerName || (tgState.user && tgState.user.name) || '';
      const firstName = displayName.trim().split(/\s+/)[0];
      const namePart = firstName ? `, ${firstName}` : '';
      heroSubEl.textContent = `Pack your bags${namePart}! Your luxury reservation in ${booking.destination || 'Santorini'} is confirmed.`;
    }
  },

  // 11: My Trips Screen
  renderMyTrips() {
    const container = document.getElementById('my-trips-list-container');
    if (!container) return;

    const upcoming = tgState.trips.filter(t => !t.isPast);
    const past = tgState.trips.filter(t => t.isPast);

    const currentTab = window.currentTripTab || 'upcoming';

    if (currentTab === 'upcoming') {
      if (upcoming.length === 0) {
        container.innerHTML = `
          <div class="empty-state-box">
            <div class="empty-state-icon"><i data-lucide="plane"></i></div>
            <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">No upcoming trips</h4>
            <p style="font-size: 13px; color: var(--color-text-secondary); margin-bottom: 16px;">Ready for your next getaway? Explore dream destinations.</p>
            <button type="button" class="btn btn-primary btn-sm" onclick="tgRouter.navigateTo('screen-explore')">Discover Destinations</button>
          </div>
        `;
      } else {
        container.innerHTML = upcoming.map(trip => `
          <div class="trip-item-card">
            <img src="${trip.image}" class="trip-item-thumb" alt="${trip.hotelName}" />
            <div class="trip-item-body">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <div>
                  <span class="badge badge-success" style="margin-bottom: 4px;">${trip.status}</span>
                  <h4 style="font-size: 15px; font-weight: 700; color: var(--color-text-primary);">${trip.hotelName}</h4>
                  <span style="font-size: 12px; color: var(--color-text-secondary);">${trip.destination}</span>
                </div>
                <span style="font-size: 15px; font-weight: 800; color: var(--color-primary-blue);">${TG_UTILS.formatPrice(trip.totalPrice)}</span>
              </div>
              <div style="font-size: 12px; color: var(--color-text-secondary); margin: 8px 0;">
                <i data-lucide="calendar" style="width: 13px; height: 13px; display: inline;"></i> ${trip.checkIn} – ${trip.checkOut} (${trip.nights} Nights)
              </div>
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <button type="button" class="btn btn-sm btn-subtle" style="flex: 1;" onclick="tgRouter.navigateTo('screen-trip-details')">
                  <i data-lucide="map"></i> View Itinerary
                </button>
                <button type="button" class="btn btn-sm btn-secondary" onclick="TG_UTILS.showToast('Voucher downloaded to device!', 'success')">
                  <i data-lucide="ticket"></i> Voucher
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }
    } else {
      container.innerHTML = past.map(trip => `
        <div class="trip-item-card">
          <img src="${trip.image}" class="trip-item-thumb" alt="${trip.hotelName}" />
          <div class="trip-item-body">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div>
                <span class="badge badge-glass" style="margin-bottom: 4px; color: #fff;">${trip.status}</span>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--color-text-primary);">${trip.hotelName}</h4>
                <span style="font-size: 12px; color: var(--color-text-secondary);">${trip.destination}</span>
              </div>
              <span style="font-size: 15px; font-weight: 800; color: var(--color-text-primary);">${TG_UTILS.formatPrice(trip.totalPrice)}</span>
            </div>
            <div style="font-size: 12px; color: var(--color-text-secondary); margin: 8px 0;">
              <i data-lucide="calendar" style="width: 13px; height: 13px; display: inline;"></i> ${trip.checkIn} – ${trip.checkOut}
            </div>
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button type="button" class="btn btn-sm btn-primary" style="flex: 1;" onclick="TG_COMPONENTS.onReviewTrip('${trip.id}')">
                <i data-lucide="star"></i> Leave Review
              </button>
              <button type="button" class="btn btn-sm btn-secondary" onclick="TG_UTILS.showToast('Booking receipt generated!', 'info')">Receipt</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  },

  // 12: Trip Details / Itinerary Screen
  renderTripDetails() {
    const booking = tgState.currentBooking;
    if (!booking) return;

    const refBadge = document.getElementById('itinerary-ref-badge');
    if (refBadge) refBadge.textContent = `Confirmed • Ref #${booking.id}`;

    const hotelNameEl = document.getElementById('itinerary-hotel-name');
    if (hotelNameEl) hotelNameEl.textContent = booking.hotelName;

    const datesEl = document.getElementById('itinerary-dates');
    if (datesEl) datesEl.textContent = `${booking.checkIn} – ${booking.checkOut} (${booking.nights} Nights)`;

    const timelineContainer = document.getElementById('itinerary-days-container');
    if (timelineContainer) {
      timelineContainer.innerHTML = TG_DATA.itineraryTemplate.map(item => `
        <div class="itinerary-day-card">
          <div class="itinerary-day-dot">${item.day}</div>
          <div class="itinerary-day-title">Day ${item.day}: ${item.title}</div>
          <div style="font-size: 11px; color: var(--color-primary-blue); font-weight: 600; margin-bottom: 4px;">
            <i data-lucide="clock" style="width: 11px; height: 11px; display: inline;"></i> ${item.time}
          </div>
          <p class="itinerary-day-desc">${item.description}</p>
        </div>
      `).join('');
    }
  },

  // 13: Profile Screen
  renderProfile() {
    const u = tgState.user || {};
    const nameEl = document.getElementById('profile-name');
    const emailEl = document.getElementById('profile-email');
    const tierEl = document.getElementById('profile-tier-badge');
    const pointsEl = document.getElementById('profile-points-display');
    const tripsCountEl = document.getElementById('profile-trips-count');
    const revCountEl = document.getElementById('profile-reviews-count');
    const favCountEl = document.getElementById('profile-favs-count');

    if (nameEl) nameEl.textContent = (u.name && u.name.trim()) ? u.name.trim() : 'Guest Explorer';
    if (emailEl) emailEl.textContent = (u.email && u.email.trim()) ? u.email.trim() : 'Not signed in';
    if (tierEl) tierEl.textContent = u.tier || 'Guest Explorer';
    if (pointsEl) pointsEl.textContent = `${u.points !== undefined ? u.points : 0} Points`;
    if (tripsCountEl) tripsCountEl.textContent = u.totalTrips !== undefined ? u.totalTrips : 0;
    if (revCountEl) revCountEl.textContent = u.totalReviews !== undefined ? u.totalReviews : 0;
    if (favCountEl) favCountEl.textContent = tgState.favorites.length;
  },

  // 14: Favorites Screen
  renderFavorites() {
    const countEl = document.getElementById('fav-count-header');
    if (countEl) countEl.textContent = `${tgState.favorites.length} Saved`;

    const container = document.getElementById('favorites-list-container');
    if (!container) return;

    const favHotels = TG_DATA.hotels.filter(h => tgState.favorites.includes(h.id));

    if (favHotels.length === 0) {
      container.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-state-icon"><i data-lucide="heart"></i></div>
          <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">No saved properties</h4>
          <p style="font-size: 13px; color: var(--color-text-secondary); margin-bottom: 16px;">Tap the heart icon on any hotel or destination to keep them here.</p>
          <button type="button" class="btn btn-primary btn-sm" onclick="tgRouter.navigateTo('screen-explore')">Explore Hotels</button>
        </div>
      `;
    } else {
      container.innerHTML = favHotels.map(hotel => `
        <div class="hotel-card" onclick="TG_COMPONENTS.onSelectHotel('${hotel.id}')">
          <div class="hotel-card-media">
            <img src="${hotel.images[0]}" alt="${hotel.name}" loading="lazy" />
            <button type="button" class="hotel-card-fav-btn is-favorite" 
              onclick="event.stopPropagation(); TG_COMPONENTS.toggleFavorite('${hotel.id}', this)"
              aria-label="Remove favorite">
              <i data-lucide="heart"></i>
            </button>
          </div>
          <div class="hotel-card-body">
            <div class="hotel-card-header">
              <h4 class="hotel-card-title">${hotel.name}</h4>
              <div class="badge-rating">
                <i data-lucide="star"></i>
                <span>${hotel.rating}</span>
              </div>
            </div>
            <div class="hotel-card-location">
              <i data-lucide="map-pin"></i>
              <span>${hotel.locationDetail}</span>
            </div>
            <div class="hotel-card-footer">
              <div class="hotel-card-price-wrap">
                <div class="hotel-card-price">${TG_UTILS.formatPrice(hotel.pricePerNight)} <span>/ night</span></div>
              </div>
              <button type="button" class="btn btn-sm btn-primary">Book Now</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  },

  // 15: Notifications Screen
  renderNotifications() {
    const listEl = document.getElementById('notifications-list-container');
    if (!listEl) return;

    if (tgState.notifications.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-state-icon"><i data-lucide="bell"></i></div>
          <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">All caught up!</h4>
          <p style="font-size: 13px; color: var(--color-text-secondary);">You have no unread notifications.</p>
        </div>
      `;
    } else {
      listEl.innerHTML = tgState.notifications.map(n => `
        <div class="notification-item ${n.read ? '' : 'unread'}" onclick="TG_COMPONENTS.onClickNotification('${n.id}')">
          <div class="notification-icon-box" style="background: rgba(23, 105, 255, 0.1); color: ${n.color};">
            <i data-lucide="${n.icon}"></i>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <h5 style="font-size: 13px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 2px;">${n.title}</h5>
              <span style="font-size: 11px; color: var(--color-text-muted);">${n.time}</span>
            </div>
            <p style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4;">${n.message}</p>
          </div>
        </div>
      `).join('');
    }
  },

  // 16: Review & Rating Screen
  renderReviewRating() {
    const hotel = tgState.selectedHotel || TG_DATA.hotels[0];
    const hotelNameEl = document.getElementById('review-hotel-name');
    if (hotelNameEl) hotelNameEl.textContent = hotel.name;

    const locEl = document.getElementById('review-hotel-location');
    if (locEl) locEl.textContent = hotel.destination;

    const thumbEl = document.getElementById('review-hotel-thumb');
    if (thumbEl) thumbEl.src = hotel.images[0];
  },

  // User Actions
  onSelectDestination(destName) {
    tgState.search.destination = destName;
    tgRouter.navigateTo('screen-search-results');
  },

  onReviewTrip(tripId) {
    const trip = tgState.trips.find(t => t.id === tripId);
    if (trip) {
      const hotel = TG_DATA.hotels.find(h => h.name.toLowerCase().includes(trip.hotelName.toLowerCase()) || trip.hotelName.toLowerCase().includes(h.name.toLowerCase())) || TG_DATA.hotels[0];
      tgState.selectedHotel = hotel;
    }
    tgRouter.navigateTo('screen-review-rating');
  },

  onSelectHotel(hotelId) {
    tgState.setSelectedHotel(hotelId);
    tgRouter.navigateTo('screen-hotel-details');
  },

  onSelectRoom(roomId) {
    tgState.setSelectedRoom(roomId);
    this.renderRoomSelection();
    TG_UTILS.refreshIcons();
  },

  toggleFavorite(hotelId, btnElement) {
    const isAdded = tgState.toggleFavorite(hotelId);
    if (btnElement) {
      if (isAdded) {
        btnElement.classList.add('is-favorite');
        TG_UTILS.showToast('Saved to your Favorites! ❤️', 'success');
      } else {
        btnElement.classList.remove('is-favorite');
        TG_UTILS.showToast('Removed from Favorites', 'info');
      }
    }
    TG_UTILS.refreshIcons();
    // If currently on favorites screen, re-render
    if (tgRouter.currentScreen === 'screen-favorites') {
      this.renderFavorites();
      TG_UTILS.refreshIcons();
    }
  },

  onClickNotification(notifId) {
    const item = tgState.notifications.find(n => n.id === notifId);
    if (item) {
      item.read = true;
      tgState.saveStorage(STORAGE_KEYS.NOTIFICATIONS, tgState.notifications);
      this.renderNotifications();
      TG_UTILS.refreshIcons();
      if (item.type === 'booking') {
        tgRouter.navigateTo('screen-my-trips');
      }
    }
  }
};

window.TG_COMPONENTS = TG_COMPONENTS;
