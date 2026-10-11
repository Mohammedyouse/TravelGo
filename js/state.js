/* ==========================================================================
   TravelGo - Frontend Application State & LocalStorage Management
   ========================================================================== */

const STORAGE_KEYS = {
  ACCOUNTS: 'tg_demo_accounts',
  FAVORITES: 'tg_demo_favorites',
  TRIPS: 'tg_demo_trips',
  CURRENT_BOOKING: 'tg_demo_current_booking',
  USER: 'tg_demo_user',
  NOTIFICATIONS: 'tg_demo_notifications',
  SEARCH: 'tg_demo_search',
  THEME: 'tg_demo_theme',
  REVIEWS: 'tg_demo_reviews'
};

class StateManager {
  constructor() {
    this.initDefaultState();
  }

  initDefaultState() {
    // Registered Accounts Database (stored safely with cryptographic salts and hashes, never plaintext)
    this.accounts = this.loadStorage(STORAGE_KEYS.ACCOUNTS, [
      {
        name: "Alex Morgan",
        email: "alex.morgan@travelgo.com",
        salt: "salt_demo_alex",
        passwordHash: "4f8ad3107dfbd8fa1e5989d4138b1b34ed4c9f0258456cef7952064774bfba9a",
        tier: "Gold Explorer 🌟",
        points: 4250,
        totalTrips: 12,
        totalReviews: 8
      }
    ]);

    // Current Active Hotel & Room selection
    this.selectedHotel = TG_DATA.hotels[0]; // Astra Suites Santorini
    this.selectedRoom = this.selectedHotel.rooms[0]; // Deluxe Caldera Suite

    // Search Query State
    this.search = this.loadStorage(STORAGE_KEYS.SEARCH, {
      destination: "Santorini, Greece",
      checkIn: "Oct 18, 2026",
      checkOut: "Oct 23, 2026",
      nights: 5,
      guests: 2,
      rooms: 1,
      minPrice: 150,
      maxPrice: 900
    });

    // Traveler Contact Info (populated upon authentication or checkout)
    this.traveler = {
      title: "Mr",
      firstName: "",
      lastName: "",
      email: "",
      phone: "+1 (555) 382-9104",
      specialRequests: ["Late check-in requested", "Quiet caldera-facing room"]
    };

    // User Profile (unauthenticated guest by default)
    this.user = this.loadStorage(STORAGE_KEYS.USER, {
      name: "",
      email: "",
      phone: "",
      avatar: "assets/images/avatar_user.jpg",
      tier: "Guest Explorer",
      points: 0,
      totalTrips: 0,
      totalReviews: 0,
      currency: "USD ($)",
      language: "English (US)",
      isLoggedIn: false
    });

    // Favorites (hotel IDs)
    this.favorites = this.loadStorage(STORAGE_KEYS.FAVORITES, [
      "hotel-astra",
      "hotel-canaves",
      "hotel-grace"
    ]);

    // Demo Initial Trips
    this.trips = this.loadStorage(STORAGE_KEYS.TRIPS, [
      {
        id: "TG-729104",
        hotelName: "The Kayon Jungle Resort",
        destination: "Ubud, Bali",
        image: "assets/images/hotel_bali.jpg",
        checkIn: "Jun 12, 2026",
        checkOut: "Jun 18, 2026",
        nights: 6,
        guests: 2,
        roomName: "Kayon Royal Pool Villa",
        totalPrice: 2280,
        status: "Completed",
        isPast: true
      },
      {
        id: "TG-510928",
        hotelName: "Amalfi Cliffside Grand Hotel",
        destination: "Amalfi Coast, Italy",
        image: "assets/images/hotel_amalfi.jpg",
        checkIn: "Sep 04, 2026",
        checkOut: "Sep 09, 2026",
        nights: 5,
        guests: 2,
        roomName: "Panoramic Ocean Suite",
        totalPrice: 2850,
        status: "Completed",
        isPast: true
      }
    ]);

    // Current Active / Most Recent Booking
    this.currentBooking = this.loadStorage(STORAGE_KEYS.CURRENT_BOOKING, {
      id: "TG-849201",
      hotelId: "hotel-astra",
      hotelName: "Astra Suites Santorini",
      destination: "Santorini, Greece",
      image: "assets/images/hotel_astra.jpg",
      checkIn: "Oct 18, 2026",
      checkOut: "Oct 23, 2026",
      nights: 5,
      guests: 2,
      roomName: "Deluxe Caldera View Suite",
      roomPricePerNight: 380,
      subtotal: 1900,
      taxes: 228,
      discount: 0,
      totalPrice: 2128,
      status: "Confirmed",
      isPast: false,
      travelerName: (this.user && this.user.name) ? this.user.name : "Valued Explorer",
      travelerEmail: (this.user && this.user.email) ? this.user.email : "explorer@travelgo.com",
      bookingDate: "Oct 09, 2026"
    });

    // Notifications
    this.notifications = this.loadStorage(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: "notif-1",
        title: "Booking Confirmed! 🎉",
        message: "Your stay at Astra Suites Santorini is confirmed. Reference #TG-849201",
        time: "10m ago",
        read: false,
        type: "booking",
        icon: "check-circle",
        color: "var(--color-success)"
      },
      {
        id: "notif-2",
        title: "Upcoming Trip Reminder ✈️",
        message: "Your journey to Santorini begins in 9 days. View your daily itinerary.",
        time: "1h ago",
        read: false,
        type: "reminder",
        icon: "calendar",
        color: "var(--color-primary-blue)"
      },
      {
        id: "notif-3",
        title: "Exclusive 20% OFF Deal ✨",
        message: "Special autumn savings on luxury villas in Amalfi Coast. Code: AUTUMN20",
        time: "1d ago",
        read: true,
        type: "deal",
        icon: "tag",
        color: "var(--color-coral)"
      },
      {
        id: "notif-4",
        title: "Price Drop Alert 📉",
        message: "Canaves Oia Epitome rates dropped by $45/night for your travel dates.",
        time: "3d ago",
        read: true,
        type: "deal",
        icon: "trending-down",
        color: "var(--color-turquoise)"
      }
    ]);

    // Reviews list
    this.reviews = this.loadStorage(STORAGE_KEYS.REVIEWS, [...TG_DATA.reviews]);

    // Theme (light / dark)
    this.theme = this.loadStorage(STORAGE_KEYS.THEME, 'light');
  }

  loadStorage(key, defaultVal) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  saveStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  }

  // Favorite toggle
  toggleFavorite(hotelId) {
    const idx = this.favorites.indexOf(hotelId);
    let isAdded = false;
    if (idx > -1) {
      this.favorites.splice(idx, 1);
      isAdded = false;
    } else {
      this.favorites.push(hotelId);
      isAdded = true;
    }
    this.saveStorage(STORAGE_KEYS.FAVORITES, this.favorites);
    return isAdded;
  }

  isFavorite(hotelId) {
    return this.favorites.includes(hotelId);
  }

  // Select Hotel
  setSelectedHotel(hotelId) {
    const found = TG_DATA.hotels.find(h => h.id === hotelId);
    if (found) {
      this.selectedHotel = found;
      this.selectedRoom = found.rooms[0] || null;
    }
  }

  // Select Room
  setSelectedRoom(roomId) {
    if (!this.selectedHotel) return;
    const found = this.selectedHotel.rooms.find(r => r.id === roomId);
    if (found) {
      this.selectedRoom = found;
    }
  }

  // Update Traveler info
  updateTraveler(info) {
    this.traveler = { ...this.traveler, ...info };
  }

  // Create demo booking after payment
  createBooking(paymentInfo = {}) {
    const nights = this.search.nights || 5;
    const pricePerNight = this.selectedRoom ? this.selectedRoom.price : (this.selectedHotel ? this.selectedHotel.pricePerNight : 380);
    const subtotal = pricePerNight * nights;
    const taxes = Math.round(subtotal * 0.12);
    const discount = paymentInfo.discount || 0;
    const total = subtotal + taxes - discount;
    const bookingRef = 'TG-' + Math.floor(100000 + Math.random() * 900000);

    const newBooking = {
      id: bookingRef,
      hotelId: this.selectedHotel.id,
      hotelName: this.selectedHotel.name,
      destination: this.selectedHotel.destination,
      image: this.selectedHotel.images[0],
      checkIn: this.search.checkIn,
      checkOut: this.search.checkOut,
      nights: nights,
      guests: this.search.guests,
      roomName: this.selectedRoom ? this.selectedRoom.name : "Deluxe Suite",
      roomPricePerNight: pricePerNight,
      subtotal: subtotal,
      taxes: taxes,
      discount: discount,
      totalPrice: total,
      status: "Confirmed",
      isPast: false,
      travelerName: `${this.traveler.firstName || ''} ${this.traveler.lastName || ''}`.trim() || (this.user && this.user.name) || "Valued Explorer",
      travelerEmail: this.traveler.email || (this.user && this.user.email) || "explorer@travelgo.com",
      bookingDate: "Today"
    };

    this.currentBooking = newBooking;
    this.saveStorage(STORAGE_KEYS.CURRENT_BOOKING, newBooking);

    // Add to upcoming trips
    this.trips.unshift(newBooking);
    this.saveStorage(STORAGE_KEYS.TRIPS, this.trips);

    // Add notification
    this.addNotification({
      title: "Booking Confirmed! 🎉",
      message: `Your reservation at ${newBooking.hotelName} is locked in! Ref: #${newBooking.id}`,
      type: "booking",
      icon: "check-circle",
      color: "var(--color-success)"
    });

    return newBooking;
  }

  addNotification(notif) {
    const item = {
      id: "notif-" + Date.now(),
      time: "Just now",
      read: false,
      ...notif
    };
    this.notifications.unshift(item);
    this.saveStorage(STORAGE_KEYS.NOTIFICATIONS, this.notifications);
  }

  markAllNotificationsRead() {
    this.notifications.forEach(n => n.read = true);
    this.saveStorage(STORAGE_KEYS.NOTIFICATIONS, this.notifications);
  }

  addReview(reviewData) {
    const newRev = {
      id: "rev-" + Date.now(),
      author: this.user.name,
      avatar: this.user.avatar,
      date: "Just now",
      ...reviewData
    };
    this.reviews.unshift(newRev);
    this.saveStorage(STORAGE_KEYS.REVIEWS, this.reviews);
    // Award demo loyalty points
    this.user.points += 200;
    this.user.totalReviews += 1;
    this.saveStorage(STORAGE_KEYS.USER, this.user);
    return newRev;
  }

  // Cryptographic password hashing (non-plaintext)
  async hashPassword(password, salt) {
    const str = (salt || '') + ':' + (password || '');
    if (window.crypto && window.crypto.subtle) {
      try {
        const enc = new TextEncoder();
        const data = enc.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (e) {
        // Fallback
      }
    }
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return 'fnv_' + (h >>> 0).toString(16);
  }

  // User Registration
  async registerUser(name, email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();

    if (!cleanName) {
      return { success: false, message: 'Please enter your full name.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    const existing = this.accounts.find(a => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please sign in.' };
    }

    const salt = 'salt_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    const passwordHash = await this.hashPassword(password, salt);

    const newAccount = {
      name: cleanName,
      email: cleanEmail,
      salt: salt,
      passwordHash: passwordHash,
      tier: "Explorer Member ✨",
      points: 500,
      totalTrips: 0,
      totalReviews: 0,
      createdAt: new Date().toISOString()
    };

    this.accounts.push(newAccount);
    this.saveStorage(STORAGE_KEYS.ACCOUNTS, this.accounts);

    this.setCurrentUser(newAccount);
    return { success: true, user: newAccount, isNew: true };
  }

  // User Login
  async loginUser(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!password) {
      return { success: false, message: 'Please enter your password.' };
    }

    const account = this.accounts.find(a => a.email.toLowerCase() === cleanEmail);
    if (!account) {
      return { success: false, message: 'Account not found. Please create an account or verify your email.' };
    }

    const hash = await this.hashPassword(password, account.salt);
    if (hash !== account.passwordHash) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    this.setCurrentUser(account);
    return { success: true, user: account, isNew: false };
  }

  // Update authenticated active user session
  setCurrentUser(account) {
    this.user = {
      name: account.name || '',
      email: account.email || '',
      phone: account.phone || '+1 (555) 382-9104',
      avatar: account.avatar || 'assets/images/avatar_user.jpg',
      tier: account.tier || 'Explorer Member ✨',
      points: account.points !== undefined ? account.points : 500,
      totalTrips: account.totalTrips || 0,
      totalReviews: account.totalReviews || 0,
      currency: 'USD ($)',
      language: 'English (US)',
      isLoggedIn: true
    };
    this.saveStorage(STORAGE_KEYS.USER, this.user);

    // Sync traveler details
    const nameParts = (account.name || '').trim().split(/\s+/);
    this.traveler = {
      ...this.traveler,
      firstName: nameParts[0] || (account.name || 'Traveler'),
      lastName: nameParts.slice(1).join(' ') || '',
      email: account.email
    };
  }

  // Sign out user session
  logoutUser() {
    this.user = {
      name: '',
      email: '',
      phone: '',
      avatar: 'assets/images/avatar_user.jpg',
      tier: 'Guest Explorer',
      points: 0,
      totalTrips: 0,
      totalReviews: 0,
      currency: 'USD ($)',
      language: 'English (US)',
      isLoggedIn: false
    };
    this.traveler = {
      title: 'Mr',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: []
    };
    this.saveStorage(STORAGE_KEYS.USER, this.user);
  }

  // Personalized greeting generator with neutral fallback
  getWelcomeMessage(isNew = false) {
    const rawName = (this.user && this.user.name) ? this.user.name.trim() : '';
    if (!rawName) {
      return 'Welcome back!';
    }
    const firstName = rawName.split(/\s+/)[0];
    if (!firstName) {
      return 'Welcome back!';
    }
    if (isNew) {
      return `Welcome, ${firstName}!`;
    }
    return `Welcome back, ${firstName}!`;
  }

  resetDemoData() {
    localStorage.clear();
    this.initDefaultState();
  }
}

// Global state instance
const tgState = new StateManager();
