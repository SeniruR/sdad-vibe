# Person 1 — C1 Layout & Home (3 prompts)

**Branch:** `feat/c1-layout`  
**Covers:** App shell, CeylonCart branding, navigation

**Files you own:**
- `client/src/components/c1-layout/Header.jsx`
- `client/src/components/c1-layout/Layout.jsx`
- `client/src/pages/HomePage.jsx`
- `client/src/routes/routeRegistry.jsx` (SLOT C1 only)

---

## Prompt 1 — CeylonCart Header

```
In this React + Vite project, update client/src/components/c1-layout/Header.jsx for CeylonCart.

Build a header with:
- Logo/title "CeylonCart" linking to /
- Nav links using React Router Link: Home (/), Products (/products), Cart (/cart)
- Green colour theme (#1a472a background, white text)
- Optional: show cart item count badge if useCart().count > 0 (import from context/CartContext.jsx)
- Clean responsive layout
```

## Prompt 2 — Home Page

```
Update client/src/pages/HomePage.jsx for CeylonCart e-commerce.

Build a landing page with:
- Hero: "Welcome to CeylonCart" + tagline about Sri Lankan tea, spices, handicrafts & apparel
- Featured categories section (Tea, Spices, Handicrafts, Apparel) as clickable cards linking to /products
- "Shop Now" CTA button linking to /products
- Remove the "TODO Person 1" hint text
- Match green CeylonCart theme (#1a472a)
- Keep the API health check working
```

## Prompt 3 — Layout polish

```
Update client/src/components/c1-layout/Layout.jsx:
- Wrap children below Header with max-width container and padding
- Add a simple footer: "CeylonCart © 2026 — Locally made, globally loved"
- Ensure SLOT C1 in routeRegistry.jsx still routes "/" to HomePage inside Layout
- Do not edit SLOT C2, C3, or C4
```
