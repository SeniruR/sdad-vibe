# CeylonCart — Team Quick Guide

## What this is
E-commerce MVP for **CeylonCart** (Sri Lankan products). React frontend + Express backend. 4 people build in parallel, merge on GitHub.

## Setup (everyone)
```bash
git clone https://github.com/SeniruR/sdad-vibe.git
cd sdad-vibe   # or my-website depending on repo root

# Terminal 1
cd server && npm install && npm run dev

# Terminal 2
cd client && npm install && npm run dev
```
Open http://localhost:5173 — should show CeylonCart home + "API is running".

**Port 5000 busy?** Only run server once. Kill old process: `netstat -ano | findstr :5000` then `taskkill /PID <id> /F`.

## Pick your part

| You | Branch | Prompt file | What you build |
|-----|--------|-------------|----------------|
| Person 1 | `feat/c1-layout` | `docs/PROMPTS-C1.md` | Header, Home, Layout |
| Person 2 | `feat/c2-list` | `docs/PROMPTS-C2.md` | Product list (10 items) |
| Person 3 | `feat/c3-cart` | `docs/PROMPTS-C3.md` | Cart + Checkout |
| Person 4 | `feat/c4-detail` | `docs/PROMPTS-C4.md` | Product detail, Payment, Confirmation |

Full task map: `docs/TASKS.md`  
API shapes: `docs/API-CONTRACT.md`

## Your workflow
```bash
git checkout main && git pull
git checkout -b feat/c2-list    # YOUR branch
# copy prompts from your PROMPTS file into Cursor
git add . && git commit -m "feat(c2): product catalogue"
git push -u origin feat/c2-list
# open PR on GitHub
```

## Rules
- Only edit **your** files (listed in your prompt doc)
- Don't touch `App.jsx` or other people's slots in `routeRegistry.jsx`
- Merge order: c1 → c2 → c3 → c4

## Demo must show
Home → Products → Detail → Add to Cart → Cart → Checkout → Payment → Order Confirmed
