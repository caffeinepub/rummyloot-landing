# RummyLoot Landing Page

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full single-page landing page optimized for mobile-first ad traffic
- Hero section with ₹101 Welcome Bonus headline, subheadline, trust line, glowing gradient background animation
- App preview section with floating phone mockup showing app interface
- Features section: Instant signup, Smooth gameplay, Daily rewards & bonuses, 24/7 support
- CTA section with animated "DOWNLOAD APP NOW" button linking to https://rummyloot.in?from_gameid=8979123&channelCode=8959779
  - Pulse glow, hover scale, click bounce, shiny gradient sweep, "🔥 Trending Now" badge
- Social proof section with animated counters (users joined)
- Sticky bottom floating "INSTALL NOW 🚀" button
- Urgency section with countdown timer and "Limited Time Bonus ₹101" copy
- Floating notification popups ("User just joined" style)
- Disclaimer footer: "Play responsibly. This app is for entertainment purposes only."

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
- Backend: minimal Motoko actor (no dynamic data needed)
- Frontend: React single page, Poppins/Montserrat fonts, color palette #0d0d0d / #f5c542 / #00c853
- All animations via CSS keyframes + Tailwind
- Countdown timer via JS/React state
- Animated counters via intersection observer
- Floating notification popups via React state with auto-dismiss
- All download links point to https://rummyloot.in?from_gameid=8979123&channelCode=8959779
- Smooth scroll enabled globally
