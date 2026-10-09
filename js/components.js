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
        <div class="dest-card" onclick="TG_COMPONENTS.onSelectDestination('${d.name}')">
          <img src="${d.image}" alt="${d.name}" loading="lazy" />
          <div class="dest-card-overlay">
            <span class="dest-card-title">${d.name}</span>
            <span class="dest-card-country">${d.country} • ★ ${d.rating}</span>
          </div>
        </div>
      `).join('');
    }

    // Render Popular Hotels
    const hotelContainer = document.getElementById('home-popular-hotels');
    if (hotelContainer) {
      hotelContainer.innerHTML = TG_DATA.hotels.slice(0, 4).map(hotel => {
        const isFav = tgState.isFavorite(hotel.id);
        return `
          <div class="hotel-card" onclick="TG_COMPONENTS.onSelectHotel('${hotel.id}')">
            <div class="hotel-card-media">
              <img src="${hotel.images[0]}" alt="${hotel.name}" loading="lazy" />
              <span class="badge badge-primary hotel-card-badge">${hotel.badge}</span>
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
    }
  },

  // 04: Explore Screen
  renderExplore() {
    const queryEl = document.getElementById('explore-search-input');
    if (queryEl) {
      queryEl.value = tgState.search.destination || '';
    }
  },

  // 05: Search Results Screen
  renderSearchResults() {
    const listEl = document.getElementById('search-results-list');
    const countEl = document.getElementById('results-count-text');
    if (countEl) {
      countEl.textContent = `${TG_DATA.hotels.length} luxury properties found`;
    }

    if (listEl) {
      listEl.innerHTML = TG_DATA.hotels.map(hotel => {
        const isFav = tgState.isFavorite(hotel.id);
        return `
          <div class="hotel-card" onclick="TG_COMPONENTS.onSelectHotel('${hotel.id}')">
            <div class="hotel-card-media">
              <img src="${hotel.images[0]}" alt="${hotel.name}" loading="lazy" />
              <span class="badge badge-primary hotel-card-badge">${hotel.badge}</span>
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
    }
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

    if (fName && !fName.value) fName.value = tgState.traveler.firstName;
    if (lName && !lName.value) lName.value = tgState.traveler.lastName;
    if (email && !email.value) email.value = tgState.traveler.email;
    if (phone && !phone.value) phone.value = tgState.traveler.phone;
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
    if (guestEl) guestEl.textContent = booking.travelerName || "Alex Morgan";
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
              <button type="button" class="btn btn-sm btn-primary" style="flex: 1;" onclick="tgRouter.navigateTo('screen-review-rating')">
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
    const u = tgState.user;
    const nameEl = document.getElementById('profile-name');
    const emailEl = document.getElementById('profile-email');
    const tierEl = document.getElementById('profile-tier-badge');
    const pointsEl = document.getElementById('profile-points-display');
    const tripsCountEl = document.getElementById('profile-trips-count');
    const revCountEl = document.getElementById('profile-reviews-count');
    const favCountEl = document.getElementById('profile-favs-count');

    if (nameEl) nameEl.textContent = u.name;
    if (emailEl) emailEl.textContent = u.email;
    if (tierEl) tierEl.textContent = u.tier;
    if (pointsEl) pointsEl.textContent = `${u.points} Points`;
    if (tripsCountEl) tripsCountEl.textContent = u.totalTrips;
    if (revCountEl) revCountEl.textContent = u.totalReviews;
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
