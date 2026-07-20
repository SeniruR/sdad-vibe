# CeylonCart Kickoff Checklist (5 minutes)

Assignment: **CeylonCart** e-commerce MVP — already configured in this repo.

## Step 1 — Confirm API contract

Open `docs/API-CONTRACT.md` — product fields and endpoints are pre-filled. No changes needed unless your team agrees on extras.

## Step 2 — Assign branches

| Person | Branch | Prompt file | Delivers |
|--------|--------|-------------|----------|
| Person 1 | `feat/c1-layout` | `docs/PROMPTS-C1.md` | Header, Home, Layout |
| Person 2 | `feat/c2-list` | `docs/PROMPTS-C2.md` | Product catalogue (FR1) |
| Person 3 | `feat/c3-cart` | `docs/PROMPTS-C3.md` | Cart + Checkout (FR3, FR4) |
| Person 4 | `feat/c4-detail` | `docs/PROMPTS-C4.md` | Detail + Payment + Confirm (FR2, FR5, FR6) |

```bash
git checkout main
git pull
git checkout -b feat/c2-list   # use YOUR branch name
```

## Step 3 — Start building

1. Open your prompt file
2. Copy each prompt into Cursor (3–4 prompts total)
3. Stay in your owned files only
4. Commit and push after each prompt

## Step 4 — Merge (last 30 min of 3-hour window)

Merge PRs in order:

1. `feat/c1-layout` → main
2. `feat/c2-list` → main
3. `feat/c3-cart` → main
4. `feat/c4-detail` → main

Only expected conflict: `routeRegistry.jsx` — keep all route entries.

## Step 5 — Smoke test

Full demo flow:

1. Home page → Browse Products
2. Click a product → Add to Cart
3. Cart → change qty → Checkout
4. Fill customer form → Payment
5. Enter card (NOT ending 0000) → Order Confirmed with order ID
6. Test failure: card ending in 0000 → shows decline message

## Capture for report

- Screenshot each prompt + AI output
- Record 5–15 min screen demo of full flow
- Note what you corrected in AI-generated code
