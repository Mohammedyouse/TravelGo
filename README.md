# TravelGo — Travel and Tourism Booking Web Application

[![Netlify Status](https://api.netlify.com/api/v1/badges/ec186785-6183-4eea-9d49-472fceb82744/deploy-status)](https://app.netlify.com/projects/travelgo-booking-demo/deploys)
[![Version](https://img.shields.io/badge/Version-v1.2.0-blue.svg)](README.md#release-notes)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Explore. Book. Experience.**  
> A high-fidelity, 16-screen luxury travel and tourism booking mobile web application built with pure HTML5, CSS3, and Vanilla JavaScript.

---

## 🌐 Live Demo & Repository

> 🚀 **Live Production Demo (Netlify):** [https://travelgo-booking-demo.netlify.app](https://travelgo-booking-demo.netlify.app/)  
> 🔗 **GitHub Repository:** [https://github.com/Mohammedyouse/TravelGo](https://github.com/Mohammedyouse/TravelGo)  
> 🌐 **Alternate Mirror (GitHub Pages):** [https://mohammedyouse.github.io/TravelGo/](https://mohammedyouse.github.io/TravelGo/)

---

## 📖 Project Overview

**TravelGo** is a responsive, pixel-perfect travel and tourism booking frontend inspired by modern luxury travel platforms. It delivers a complete, cohesive end-to-end booking journey across 16 interconnected screens. Users can explore trending destinations, search luxury hotels, filter by amenities and pricing, select tailored suites, input traveler details, simulate card checkout with promo vouchers, generate verifiable booking references, explore day-by-day itineraries, manage upcoming/past trips, bookmark favorites, and submit verified reviews.

The application is engineered as a single-page application (SPA) using standard vanilla web technologies without heavyweight frameworks or external build toolchains, ensuring lightning-fast load times and seamless local execution.

---

## ✨ Features Implemented

1. **Welcome / Onboarding Screen (`#screen-welcome`)**:
   - Hero photography of Santorini caldera sunsets with luxury typography and branding.
   - Fluid transitions to authentication or direct guest discovery.
2. **Authentication Demonstration (`#screen-login`)**:
   - Dual-mode tabs (Sign In & Create Account).
   - Password visibility toggling, input validation, and 1-click **⚡ Quick Demo Autofill**.
   - Fictional social authentication buttons (Google, Apple).
3. **Home & Destination Discovery (`#screen-home`)**:
   - Personalized user header with avatar, live unread notification counter, and greeting.
   - Interactive search trigger, category filter pills (*Hotels, Villas, Resorts, Cruises*).
   - Featured 25% OFF promotional discount banner for Santorini caldera suites.
   - Horizontal destination carousel (*Santorini, Bali, Amalfi Coast, Kyoto, Maldives, Zermatt*).
   - Handpicked luxury stay cards with pricing, ratings, and instant favorite toggles.
4. **Explore & Trip Customizer (`#screen-explore`)**:
   - Destination search bar with instant clear action.
   - Travel configuration cards (Check-in/Check-out dates, nights counter, adult & room counter).
   - Trending search chips (*Oia Caldera, Imerovigli Sunsets, Private Cave Pool*).
   - Amenity filter checkboxes (*Infinity Pool, Free Breakfast, Free Cancellation*).
5. **Search Results & Smart Filtering (`#screen-search-results`)**:
   - Results counter and criteria summary pills.
   - Sorting chips (*Top Rated, Price: Low to High, 5 Stars Only, Free Cancellation*).
   - Rich hotel cards featuring high-resolution galleries, location distances, and booking CTAs.
6. **Hotel Property Details (`#screen-hotel-details`)**:
   - Hero image gallery with photo pagination counter.
   - Comprehensive property description with expand/collapse support.
   - 8-item property amenities grid with Lucide icons.
   - Stylized interactive location card with pulsing radar pin.
   - Verified guest review highlights and write-review access.
   - Sticky bottom action bar with live price per night and suite selection button.
7. **Room & Package Selection (`#screen-room-selection`)**:
   - Progress Stepper (Step 1 of 3: Suite).
   - 3 distinct suite tiers (*Deluxe Caldera View Suite, Honeymoon Cave Suite with Plunge Pool, Presidential Villa*).
   - Room size, bed configuration, guest capacity, and inclusive perks list.
   - Dynamic total cost calculator across stay duration.
8. **Traveler Information Form (`#screen-traveler-info`)**:
   - Progress Stepper (Step 2 of 3: Traveler).
   - Reservation summary snippet with selected suite and dates.
   - Salutation buttons, first/last name, email, and phone fields with required field validation.
   - Special request toggles (*Late check-in, Quiet caldera room, Airport limousine shuttle*).
9. **Secure Payment Checkout (`#screen-payment`)**:
   - Progress Stepper (Step 3 of 3: Payment).
   - Itemized cost breakdown (Subtotal, 12% VAT/Tourism tax, Promo deduction).
   - Promo voucher coupon field (Applying `TRAVELGO10` grants an instant discount).
   - Payment method switcher (*Credit/Debit Card, Apple Pay, PayPal*).
   - Live stylized credit card graphic with auto-formatting.
   - **⚡ Autofill Test Card** button and simulated processing loading animation.
10. **Booking Confirmation (`#screen-confirmation`)**:
    - Animated green celebration checkmark circle.
    - Unique generated booking reference code (e.g., `#TG-849201`) with copy-to-clipboard.
    - Comprehensive stay confirmation card.
    - Direct actions: View in My Trips, View Detailed Itinerary, and Download E-Ticket.
11. **My Trips & Bookings Management (`#screen-my-trips`)**:
    - Segmented tabs (*Upcoming* vs *Completed*).
    - Real-time display of newly confirmed bookings alongside realistic past completed trips (*Bali & Amalfi Coast*).
    - Voucher download and review creation triggers.
12. **Trip Details & Day-by-Day Itinerary (`#screen-trip-details`)**:
    - Confirmed booking header with reference badge.
    - Quick actions: E-Voucher, Directions, Call Hotel Concierge, Message Host.
    - Check-in and check-out time indicators.
    - Interactive 6-day itinerary schedule with timestamps, titles, and activity descriptions.
13. **User Profile & Account Center (`#screen-profile`)**:
    - User avatar, name, email, Gold Explorer tier badge, and 4,250 loyalty points.
    - Statistics counter (Trips, Reviews, Saved).
    - Interactive Dark Mode / Light Mode appearance toggle.
    - Menu for preferences, payment methods, security, and sign-out.
14. **Favorites / Saved Stays (`#screen-favorites`)**:
    - Synchronized saved properties list reacting to heart buttons across the app.
    - Instant removal with undo toast notification.
    - Empty state view when no properties are bookmarked.
15. **Notifications Center (`#screen-notifications`)**:
    - Categorized notifications (*Bookings, Reminders, Deals*).
    - Read/unread visual state indicators and timestamp badges.
    - 1-click "Mark All as Read" action.
16. **Review & Rating Submission (`#screen-review-rating`)**:
    - Hotel summary card and stay date indicator.
    - Interactive 5-star rating selector with dynamic sentiment mood.
    - Individual category rating bars (*Cleanliness, Service, Location, Value*).
    - Review headline, multiline feedback textarea, and photo attachment preview simulator.
    - Celebratory thank-you modal awarding `+200 TravelGo Explorer Points 🎉`.
17. **Desktop Showcase & Reviewer Tools**:
    - Centered iPhone 15 Pro device frame (390 × 844 px) on desktop viewports.
    - Top Dev Toolbar featuring instant 16-screen selector, viewport mode toggles (Mobile 390px, Tablet 768px, Fluid Full-Width), and demo data reset.
    - Full responsiveness on mobile devices (320px–480px).

---

## 🛠️ Technology Stack

- **Markup:** HTML5 (Semantic elements, accessible labels, ARIA landmarks)
- **Styling:** CSS3 (Vanilla design tokens, CSS variables, flexbox, grid, glassmorphism, keyframe animations)
- **Programming Language:** Vanilla JavaScript (ES6+ modular architecture, hash-based SPA routing)
- **Iconography:** Lucide Icons (Standalone bundled local script `lucide.min.js`)
- **Hosting & Deployment:** Netlify (Global CDN & edge routing) and GitHub Pages
- **Version Control:** Git & GitHub

---

## 📁 Project Structure

```
HCI/
├── index.html                  # Main SPA entrypoint containing all 16 screen views
├── netlify.toml                # Netlify deployment configuration & redirect rules
├── README.md                   # Comprehensive project documentation
├── .gitignore                  # Git exclusion rules
├── css/
│   ├── variables.css           # Design tokens, color palette, gradients, radii, shadows
│   ├── reset.css               # Box-sizing & reset styles
│   ├── layout.css              # Desktop device shell, status bar, screen containers
│   ├── components.css          # Buttons, hotel/room cards, badges, inputs, stepper, toasts
│   ├── global.css              # Global typography and screen-specific styling
│   └── responsive.css          # Mobile (320–480px), tablet, and desktop media queries
├── js/
│   ├── data.js                 # Reusable travel dataset (Hotels, suites, itineraries, reviews)
│   ├── state.js                # Application state management with localStorage persistence
│   ├── utils.js                # UI helpers, toast notifications, currency & date formatters
│   ├── router.js               # Hash-based SPA client router with history navigation
│   ├── components.js           # Dynamic screen renderers and UI event handlers
│   ├── app.js                  # App initializer, event bindings, real-time clock
│   └── lucide.min.js           # Local offline Lucide icons library
└── assets/
    ├── images/                 # 25 high-resolution travel photos (Hotels, rooms, destinations, avatars)
    ├── logo/                   # TravelGo brand SVG logos (Color & white variations)
    └── icons/                  # Application icons
```

---

## 💻 Running Locally

This project requires no build steps, Node.js installations, or external dependencies.

### Option 1: VS Code Live Server (Recommended)
1. Open this repository folder in **Visual Studio Code**.
2. Install the **Live Server** extension if not already installed.
3. Right-click [`index.html`](index.html) and select **Open with Live Server**.
4. The application will launch automatically at `http://localhost:5500`.

### Option 2: Python Static Server
Run the following command from the project root directory:
```bash
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

### Option 3: Node.js (npx)
```bash
npx serve .
```

---

## 🚀 Deployment & Continuous Integration

- **Netlify Hosting:** Configured with [`netlify.toml`](netlify.toml) with root publishing (`publish = "."`) and single-page application URL rewriting (`/* -> /index.html 200`). Future updates can be deployed by pushing to the `main` branch or running `netlify deploy --prod`.
- **GitHub Pages:** Enabled on the `main` branch under the root directory (`/`).

---

## 🚀 Release Notes & Changelog

### Version 1.2.0 — End-to-End User Journeys, Authentication, and Personalization Updates
*Release Date: October 2026*

#### 🎯 Key Features & Usability Enhancements
- **16-Screen Discrete Navigation & Zero Layout Shifts:**
  - Resolved screen stacking and vertical underflow issues with strict `display: none` / `display: flex` rules and automatic `scrollTop: 0` resetting across all screen transitions.
  - Seamless screen router with responsive URL hash updates and hardware back button support.
- **Client-Side Account Registration & Authentication:**
  - Dual-mode authentication (Sign In & Create Account) with real-time field validation.
  - Safe client-side password hashing using salted SHA-256 (`crypto.subtle`) ensuring credentials are never stored in plaintext.
  - Session isolation and multi-account switching between registered users.
- **Dynamic Personalized Greetings & User Header:**
  - Personalized greetings on the Home screen (*"Good morning, 👋 [User Name]"* or *"Welcome back, [First Name]!"*).
  - Synchronized user profile avatar with direct 1-click navigation to the Profile Center.
- **Interactive Home Accommodation Category Filters:**
  - Fully functional accommodation category pills (*All, Hotels, Villas, Resorts*).
  - Instant live filtering of properties with active filter badges and accessible ARIA attributes.
- **End-to-End Booking Sequence & Confirmation:**
  - Suite selection with real-time capacity and price calculation.
  - Traveler details form with automated session prefill.
  - Secure payment simulation with promo code verification (`TRAVELGO10` saves $150) and test card autofill.
  - Confirmation screen with unique reference codes (`#TG-XXXXXX`), 1-click clipboard copy, and personalized traveler acknowledgment.
- **My Trips, Saved Stays, and Review Feedback:**
  - Segmented trips view (*Upcoming* vs *Completed* stays) with voucher download simulation and detailed 6-day itinerary timeline.
  - Wishlist reactivity synchronized across all hotel cards.
  - Interactive 5-star review submission system with dynamic sentiment moods, category ratings, and celebratory +200 loyalty points award modal.

### Version 1.1.0 — Frontend UI Fix — Welcome Screen and Responsive Layout
*Release Date: October 2026*

#### 🐛 Bug Diagnosis & Root Cause
- **Issue:** On the initial welcome screen, the lower ~254px portion of the phone viewport rendered as an empty, stark white rectangle beneath the Log In link.
- **Root Cause:**
  1. **Flex Height Collapse:** In `css/layout.css`, `.screen-container` had only `min-height: 100%` without explicit flex expansion (`flex: 1; height: 100%`), and `.screen-view` lacked `flex: 1 0 auto; height: 100%`. Under standard CSS flexbox rules, children with percentage heights (`height: 60%` on `.welcome-hero-container` and `height: 40%` on `.welcome-body`) inside an indefinite height container collapsed to `auto` content sizing (~590px instead of the 844px device frame).
  2. **Unpainted Viewport Underflow:** The unallocated 254px exposed `.app-viewport`'s default light background (`--color-bg: #F7F9FC`), appearing as an unstyled white gap.

#### 🛠️ Solutions Implemented
- **Full Viewport Flex Architecture (`css/layout.css`):**
  - Updated `.app-viewport` with `display: flex; flex-direction: column;` ensuring consistent vertical filling.
  - Set `.screen-container` and `.screen-view` to `min-height: 100%; height: 100%; flex: 1;` so all screen containers expand to fill the available viewport.
  - Added `.is-welcome-screen` state styling locking `.device-frame`, `.app-viewport`, and `.screen-container` backgrounds to `var(--color-deep-navy)` (`#0B1F3A`).
  - Styled the iOS home indicator bar (`.device-home-indicator`) to clean translucent white (`rgba(255, 255, 255, 0.65)`) on the welcome screen.
- **Dynamic Flex Layout for Welcome Screen (`css/global.css`):**
  - Refactored `#screen-welcome` to flex column with explicit `background: var(--color-deep-navy)`.
  - Replaced rigid percentage heights with flexible ratios: `.welcome-hero-container` uses `flex: 1 1 54%; min-height: 360px; max-height: 58%;` and `.welcome-body` uses `flex: 1 1 46%; min-height: 330px;`.
  - Configured `.welcome-actions` with `margin-top: auto;` to anchor the CTA buttons cleanly above the bottom safe area.
- **Responsive & Safe-Area Synchronization (`css/responsive.css`):**
  - Expanded mobile media queries to `max-width: 640px` covering all modern mobile viewports (iPhone SE, 13/14/15/16 Pro, Pro Max, Pixel, Galaxy).
  - Synchronized `body.is-welcome-screen` background to `#0B1F3A` on mobile.
  - Added `@media screen and (max-height: 720px)` compact viewport handling with optimized typography and spacing.
- **Zero-Flash State Management (`js/router.js` & `index.html`):**
  - Initialized `index.html` with `is-welcome-screen` class on `body` and `device-frame` for instant dark rendering on load.
  - Updated client router `navigateTo()` to dynamically toggle `is-welcome-screen` on entering/leaving `#screen-welcome`.

#### 📱 Verification Across Viewports & All 16 Screens
- Tested across standard mobile viewports: `320 × 700`, `375 × 812`, `390 × 844`, `430 × 932`, and Desktop browser mode.
- Confirmed complete deep navy coverage (`#0B1F3A`), smooth gradient blend into the Santorini photography, intact CTA positioning, and flawless navigation across all 16 booking screens.

---

## ⚠️ Project Scope & Demonstration Notice

**TravelGo is a frontend-only demonstration project.**
- Authentication, payment transactions, booking reference generation, favorites, and reviews are simulated purely on the client side using JavaScript and browser `localStorage`.
- No real financial transactions are executed, and no sensitive payment card data is persisted or transmitted to third-party services.
- Realistic mock data is used for luxury properties, rooms, destinations, and pricing.
