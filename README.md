# VIBECODING Assignment — Base Scaffold

App-agnostic full-stack starter for parallel component development. Works for marketplace, todo, blog, booking, or any CRUD-style assignment.

## Structure

```
my-website/
├── client/          React + Vite frontend
├── server/          Node + Express API
└── docs/            Kickoff checklist + per-person prompt sheets
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

Open http://localhost:5173 — Home page should show "API connected" if backend is running.

## 4 Components (one per person)

| Person | Branch | Owns | Prompts |
|--------|--------|------|---------|
| 1 | `feat/c1-layout` | Layout, Header, HomePage | `docs/PROMPTS-C1.md` |
| 2 | `feat/c2-list` | List API + ListPage | `docs/PROMPTS-C2.md` |
| 3 | `feat/c3-create` | Create API + Form | `docs/PROMPTS-C3.md` |
| 4 | `feat/c4-detail` | Detail API + DetailPage | `docs/PROMPTS-C4.md` |

## Assignment Kickoff (first 5 minutes)

1. Read the assignment topic together
2. Fill in `docs/API-CONTRACT.md` (entity name + fields)
3. Replace `[ENTITY]` / `[ASSIGNMENT_TOPIC]` in your prompt sheet
4. Each person: `git checkout -b feat/cX-...` and start prompting

See `docs/KICKOFF.md` for the full checklist.

## GitHub Merge Order

Merge PRs in this order to minimize conflicts:

1. `feat/c1-layout` → main
2. `feat/c2-list` → main
3. `feat/c3-create` → main
4. `feat/c4-detail` → main

Only expected conflict: `client/src/routes/routeRegistry.jsx` — keep all 4 route exports.

## 1-Hour Timeline

| Time | Activity |
|------|----------|
| 0:00–0:05 | Kickoff — name entity, assign branches |
| 0:05–0:45 | Parallel build (3–4 prompts each) |
| 0:45–0:52 | Merge all 4 PRs |
| 0:52–0:58 | Smoke test full flow |
| 0:58–1:00 | Demo |

## Git Setup

```bash
git init
git add .
git commit -m "chore: VIBECODING base scaffold"
# Create repo on GitHub, then:
git remote add origin <your-repo-url>
git push -u origin main
```
