# TravelGo — Travel & Tourism Booking Mobile App (Figma-to-Code)

> **Explore. Book. Experience.**  
> A pixel-perfect, 16-screen luxury travel booking mobile frontend built with pure HTML5, CSS3, and Vanilla JavaScript.

---

## 📱 Project Overview

TravelGo is a high-fidelity mobile web application designed to deliver an end-to-end luxury travel booking experience. It strictly reproduces the Figma design specification across **16 connected screens**, featuring realistic micro-interactions, responsive mobile/tablet/desktop containers, persistent client state via `localStorage`, and curated photography.

---

## 🎨 Brand & Design System

### Color Palette
- **Deep Navy:** `#0B1F3A`
- **Primary Blue:** `#1769FF`
- **Sky Blue:** `#4DA3FF`
- **Turquoise:** `#20C9C3`
- **Coral:** `#FF7657`
- **Background:** `#F7F9FC`
- **Surface:** `#FFFFFF`
- **Primary Text:** `#101828`
- **Secondary Text:** `#667085`
- **Success:** `#12B76A`
- **Warning:** `#F79009`
- **Error:** `#F04438`

### Gradients
- **Navy to Blue:** `linear-gradient(135deg, #0B1F3A, #1769FF)`
- **Blue to Turquoise:** `linear-gradient(135deg, #1769FF, #20C9C3)`
- **Coral Gradient:** `linear-gradient(135deg, #FF7657, #FF9A76)`

### Typography
- Primary Font: **Inter** (Google Fonts) with system fallbacks (`-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`).

---

## 📋 The 16 Implemented Screens

| # | Screen Name | Key Features & Interactions |
|---|---|---|
| **01** | **Welcome / Splash** | Full-bleed Santorini caldera hero photography, TravelGo branding mark, headline, subtitle, pagination indicators, and "Get Started" / "Log In" navigation. |
| **02** | **Login / Sign Up** | Dual-mode tabs (Sign In / Create Account), email & password fields with eye visibility toggle, social auth buttons (Google/Apple), and 1-click **⚡ Quick Demo Autofill**. |
| **03** | **Home / Discover** | User avatar header, personalized greeting, live unread notification counter, quick destination search trigger, category pills (Hotels, Villas, Resorts, Cruises), Santorini 25% OFF promo card, horizontal destination cards, and luxury hotel cards. |
| **04** | **Explore / Search** | Destination search input with clear button, interactive travel date & guest picker cards, trending Santorini tags, amenities checkboxes, and "Search Available Stays" CTA. |
| **05** | **Search Results** | Search query summary chips, sorting chips (Top Rated, Price, 5-Stars, Free Cancellation), hotel cards with high-res photos, star ratings, review counts, amenities, and "Book Now" CTA. |
| **06** | **Hotel Details** | Hero image gallery with photo counter, back/favorite/share actions, hotel overview with expandable description, 8-item property amenities grid, location card with radar pin, guest reviews snippet, and sticky bottom price + "Select Room" bar. |
| **07** | **Room Selection** | Progress Stepper (Step 1/3), hotel context, 3 selectable suites (Deluxe Caldera View, Honeymoon Cave Suite, Presidential Villa), included perks, dynamic pricing update, and "Continue to Traveler Info". |
| **08** | **Traveler Info** | Progress Stepper (Step 2/3), stay summary card, salutation selector, first/last name, email, phone, special requests checkboxes, and validation. |
| **09** | **Payment** | Progress Stepper (Step 3/3), order breakdown (nights, tax, promo code `TRAVELGO10` with live discount deduction), payment method tabs (Card, Apple Pay, PayPal), realistic card preview with auto-formatted inputs, 1-click **⚡ Autofill Test Card**, and simulated payment processing animation. |
| **10** | **Booking Confirmation** | Animated celebration checkmark, booking reference code (e.g., `#TG-849201`) with copy-to-clipboard, stay summary, and actions (View in My Trips, View Itinerary, Download E-Ticket, Back to Discover). |
| **11** | **My Trips / Bookings** | Segmented tabs (Upcoming vs Completed), newly confirmed reservation card with status badges, past completed stays (Bali, Amalfi Coast), and action buttons. |
| **12** | **Trip Details / Itinerary** | Confirmed reservation hero, check-in / check-out timeline, quick action tools (E-Voucher, Directions, Call Hotel, Message Host), and Day 1 through Day 6 interactive day-by-day activity itinerary. |
| **13** | **Profile** | User profile card (Alex Morgan), Gold Explorer tier badge, loyalty points counter (4,250 Pts), trip stats, editable menu, theme toggle (Dark / Light mode), and sign-out action. |
| **14** | **Favorites** | Saved properties grid synchronized across the entire app with heart toggles, real-time un-save with toast notification, and empty state. |
| **15** | **Notifications** | Notification feed with unread indicators, categories (Bookings, Deals, Reminders), timestamps, click-to-view navigation, and "Mark All as Read" button. |
| **16** | **Review & Rating** | Stay summary card, interactive 5-star rating widget with dynamic mood response, category breakdown (Cleanliness, Service, Location, Value), review headline & comment textarea, photo upload preview, validation, and celebratory "+200 Points Earned! 🎉" modal. |

---

## 🛠️ Technology Stack & Architecture

- **Structure:** HTML5 semantic markup.
- **Styling:** Modular Vanilla CSS (`variables.css`, `reset.css`, `layout.css`, `components.css`, `global.css`, `responsive.css`).
- **Icons:** Lucide icons (`lucide.min.js` bundled locally).
- **Logic & Router:** Pure Vanilla JavaScript (`app.js`, `router.js`, `data.js`, `state.js`, `components.js`, `utils.js`).
- **State Management:** Fully client-side state synchronized with `localStorage` (Favorites, Demo Bookings, Notification states, Theme).
- **Zero Frameworks:** No React, Next.js, Vue, Angular, TypeScript, Tailwind, or backend dependencies.

---

## 🚀 How to Run Locally

### Option 1: VS Code Live Server
1. Open this `HCI` folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.
3. The app will open at `http://localhost:5500` (or `http://127.0.0.1:5500`).

### Option 2: Python Static Server
Run this in PowerShell / Terminal:
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.

### Option 3: Node.js (npx)
```bash
npx serve .
```

---

## 💻 Desktop Showcase & Reviewer Tools

When viewed on desktop viewports (`> 1024px`), the application includes:
- **iPhone 15 Pro Device Frame:** Exact 390 × 844 px mobile viewport with bezel, dynamic island, and status bar.
- **Top Quick Jump Dock:** A floating bar allowing instant jumping to any of the 16 screens directly, toggling between **390px Mobile**, **Tablet (768px)**, and **Fluid Full-Width** modes, and resetting demo data.
- **Native Mobile Experience:** When viewed on actual mobile devices (`≤ 480px`), the outer frame and dock disappear seamlessly so the app behaves like a native mobile app.

---

## 🔒 Demonstration Limitations
- This is a frontend-only prototype. Authentication, payments, and notifications are simulated locally in JavaScript and stored in non-sensitive `localStorage`. No actual financial transactions or network requests to payment gateways take place.
