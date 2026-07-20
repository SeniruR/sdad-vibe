# CeylonCart — VIBECODING E-Commerce MVP

Full-stack starter for **IS4105 / CS4127** assignment. React + Vite frontend, Node + Express backend, in-memory data store.

## Structure

```
my-website/
├── client/          React + Vite frontend
├── server/          Node + Express API
└── docs/            API contract, task split, per-person prompts
```

## Quick Start

```bash
# Terminal 1 — Backend (port 5000)
cd server
npm install
npm run dev

# Terminal 2 — Frontend (port 5173)
cd client
npm install
npm run dev
```

Open http://localhost:5173

## 4 Components

| Person | Branch | FRs | Prompts |
|--------|--------|-----|---------|
| 1 | `feat/c1-layout` | Layout, Home | `docs/PROMPTS-C1.md` (3) |
| 2 | `feat/c2-list` | FR1 — catalogue | `docs/PROMPTS-C2.md` (4) |
| 3 | `feat/c3-cart` | FR3, FR4 — cart & checkout | `docs/PROMPTS-C3.md` (4) |
| 4 | `feat/c4-detail` | FR2, FR5, FR6 — detail, payment, confirm | `docs/PROMPTS-C4.md` (4) |

See `docs/TASKS.md` for full requirement mapping.

## Key docs

- **Team guide:** `TEAM-Guide.md` — start here
- **Kickoff:** `docs/KICKOFF.md`
- **API contract:** `docs/API-CONTRACT.md`
- **Task split:** `docs/TASKS.md`

## GitHub Merge Order

1. `feat/c1-layout` → main
2. `feat/c2-list` → main
3. `feat/c3-cart` → main
4. `feat/c4-detail` → main

## 3-Hour Timeline (assignment window)

| Time | Activity |
|------|----------|
| 0:00–0:15 | Clone, setup, assign branches |
| 0:15–2:00 | Parallel build (3–4 prompts each) |
| 2:00–2:30 | Merge all 4 PRs + fix conflicts |
| 2:30–3:00 | Smoke test, screen recording, report screenshots |

## Seeded Products

10 Ceylon products pre-defined in `server/models/productsSeed.js` (tea, spices, handicrafts, apparel). Person 2 loads them via the list API.

## Mock Payment Rule

Card number ending in `0000` = declined. Anything else = success.
