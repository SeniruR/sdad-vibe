# Person 1 — C1 Layout (3 prompts)

**Branch:** `feat/c1-layout`

**Files you own:**
- `client/src/components/c1-layout/Header.jsx`
- `client/src/components/c1-layout/Layout.jsx`
- `client/src/pages/HomePage.jsx`
- `client/src/routes/routeRegistry.jsx` (SLOT C1 only)

---

## Prompt 1 — Header

```
In this React + Vite project, create client/src/components/c1-layout/Header.jsx.

Build a responsive header for a [ASSIGNMENT_TOPIC] app with:
- App title/logo text for "[ASSIGNMENT_TOPIC]"
- Nav links: Home (/), List (/list), Create (/create)
- Simple clean styling (plain CSS or inline styles)
- Export as default component
```

## Prompt 2 — Home Page

```
Create client/src/pages/HomePage.jsx for our [ASSIGNMENT_TOPIC] app.

Build a landing page with:
- Hero section with title and short description of the [ASSIGNMENT_TOPIC]
- A "Get Started" or "Browse [ENTITY]" button linking to /list
- Match the style of Header.jsx
- Export as default component
```

## Prompt 3 — Layout + Route

```
Create client/src/components/c1-layout/Layout.jsx that wraps children with Header.

Then in client/src/routes/routeRegistry.jsx, fill in SLOT C1:
- Import HomePage and Layout
- Export a route: path "/" with HomePage inside Layout

Do not edit other slots (C2, C3, C4).
```
