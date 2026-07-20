# Assignment Kickoff Checklist (2–5 minutes)

Do this together as soon as the assignment topic is revealed.

## Step 1 — Name the entity

Pick one noun for your main data type:

| Assignment type | Entity name | Example fields |
|-----------------|-------------|----------------|
| Marketplace | `products` | name, price, description |
| Todo app | `tasks` | title, completed, dueDate |
| Blog | `posts` | title, body, author |
| Library | `books` | title, author, isbn |
| Events | `events` | name, date, location |

Write your choice in `docs/API-CONTRACT.md`.

## Step 2 — Agree on fields

Keep it to **2–4 fields** for the 1-hour window. Example for marketplace:

```
name: string (required)
price: number (required)
description: string (optional)
```

## Step 3 — Assign branches

| Person | Branch | Prompt file |
|--------|--------|-------------|
| Person 1 | `feat/c1-layout` | `docs/PROMPTS-C1.md` |
| Person 2 | `feat/c2-list` | `docs/PROMPTS-C2.md` |
| Person 3 | `feat/c3-create` | `docs/PROMPTS-C3.md` |
| Person 4 | `feat/c4-detail` | `docs/PROMPTS-C4.md` |

```bash
git checkout main
git pull
git checkout -b feat/c2-list   # example for Person 2
```

## Step 4 — Replace placeholders

In your prompt sheet, replace:

- `[ENTITY]` → your entity name (e.g. `products`)
- `[entity]` → lowercase singular (e.g. `product`)
- `[ASSIGNMENT_TOPIC]` → assignment title (e.g. `Marketplace`)
- Field names from API-CONTRACT

## Step 5 — Start building

Use 3–4 prompts from your sheet. Stay in your owned files only.

## Integration (last 10 minutes)

One person merges all PRs, then smoke test:

1. Home page loads with branding
2. List page shows items
3. Create page adds a new item → appears in list
4. Detail page shows single item
