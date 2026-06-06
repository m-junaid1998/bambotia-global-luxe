
## Goal
Build a premium tactile interaction layer (sound + haptics + animated toasts) across the entire BAMBOTIA app, with user-controlled preferences.

## Architecture

### 1. Core feedback engine — `src/lib/feedback.ts`
A single module exposing:
- `playSound(type)` — Web Audio API generated tones (no asset downloads). Types: `tap`, `success`, `error`, `warning`, `info`, `cartAdd`, `cartRemove`, `wishlistAdd`, `wishlistRemove`, `orderPlaced`, `admin`.
  - Synthesized soft "iPhone keyboard" style click using a short sine + noise envelope (~30ms, low volume ~0.08).
  - Premium chord-style success (two-note arpeggio).
  - Throttle: ignore calls within 40ms of last play to prevent overlap.
- `vibrate(pattern)` — wraps `navigator.vibrate` with patterns:
  - tap: 20, success: 50, error: 100, warning: [30,30,30], orderPlaced: 200, info: 15.
- `feedback(eventName)` — high-level helper combining sound + vibration per event.
- Reads enable flags from `localStorage` (`bambotia.soundEnabled`, `bambotia.hapticsEnabled`, defaults true).
- A lazy `AudioContext` initialized on first user gesture (browser autoplay rules).

### 2. Preferences context — `src/contexts/FeedbackContext.tsx`
- Provides `{ soundEnabled, hapticsEnabled, setSoundEnabled, setHapticsEnabled, feedback }`.
- Persists to localStorage and syncs with engine.
- Wrap app in `App.tsx`.

### 3. Global click handler
- Mount a passive `document` `pointerdown` listener inside `FeedbackProvider` that:
  - Detects nearest `button`, `a`, `[role="button"]`, `[data-feedback]`.
  - Skips elements with `data-feedback="off"`.
  - Plays the `tap` feedback. This covers buttons, nav links, icons, category tabs, product cards (cards have inner buttons/links), checkout actions, admin actions automatically — no per-component edits needed.

### 4. Toast integration
- Wrap `sonner` toasts via a tiny helper `src/lib/toast.ts`:
  - `notify.success/error/warning/info(...)` → triggers matching sound + vibration, then calls sonner with custom `className` for animations:
    - success: `animate-fade-in slide-in-right`
    - error: `animate-[shake_0.4s_ease-in-out]`
    - warning/info: `animate-fade-in`
- Add `shake` keyframe + animation in `tailwind.config.ts`.
- Replace existing `toast.*` import sites we already control (CartContext, WishlistContext, Checkout, admin pages, auth pages) with `notify.*`. Other call sites keep working through sonner directly (still get global click sound).

### 5. Domain event wiring
Targeted `feedback(eventName)` calls (in addition to the global tap) at:
- `CartContext`: addItem → `cartAdd`; removeItem → `cartRemove`.
- `WishlistContext`: add → `wishlistAdd`; remove → `wishlistRemove`.
- `Checkout`/`OrderConfirmation`: place order → `orderPlaced`.
- Auth pages SignIn/SignUp: success → `success`.
- Admin pages (Products, Categories, Orders): create/update/delete/status-change → matching success/admin sound + vibration.

### 6. User settings UI
- Add a "Sound & Haptics" card to `src/pages/admin/AdminSettings.tsx` (admin-side) AND a small section on `src/pages/Contact.tsx`? → Better: add a public preferences panel inside the cart drawer footer or a new compact dropdown in the navbar profile area.
- Decision: Add toggles to two places:
  1. `Navbar` user dropdown (storefront users): two switches "Sounds", "Haptics".
  2. `AdminSettings`: same toggles for admin convenience.
- Use existing `Switch` shadcn component.

### 7. Animations
- Add `shake` keyframe to `tailwind.config.ts`:
  - `0%,100% { transform: translateX(0) } 25% { translateX(-6px) } 75% { translateX(6px) }`
- Reuse existing `fade-in`, `slide-in-right`, `scale-in`.

## Technical Details

- All sounds generated at runtime via `AudioContext` oscillators + gain envelopes — zero binary assets, no network cost, perfectly tiny.
- Vibration gracefully no-ops on iOS Safari (no API) — silent fallback.
- Engine is SSR-safe (guards `typeof window`).
- Throttling: shared `lastPlayedAt` timestamp prevents audio stacking on rapid clicks.
- Respects `prefers-reduced-motion` for toast shake/fade (downgrade to fade-in only).
- No breaking changes to existing components beyond imports/wiring.

## Files

New:
- `src/lib/feedback.ts`
- `src/lib/toast.ts`
- `src/contexts/FeedbackContext.tsx`

Edited:
- `src/App.tsx` (wrap with `FeedbackProvider`)
- `tailwind.config.ts` (shake keyframe)
- `src/contexts/CartContext.tsx`
- `src/contexts/WishlistContext.tsx`
- `src/contexts/OrdersContext.tsx` (or wherever order placed)
- `src/pages/Checkout.tsx`, `src/pages/OrderConfirmation.tsx`
- `src/pages/SignIn.tsx`, `src/pages/SignUp.tsx`
- `src/pages/admin/AdminProducts.tsx`, `AdminCategories.tsx`, `AdminOrders.tsx`, `AdminSettings.tsx`
- `src/components/Navbar.tsx` (preferences toggle in user menu)

## Out of Scope
- Custom recorded audio files (using synthesized tones for premium feel + zero asset weight).
- Per-event volume sliders (single global on/off for simplicity; can add later).
