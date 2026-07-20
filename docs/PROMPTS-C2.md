# Person 2 — C2 List (4 prompts)

**Branch:** `feat/c2-list`

**Files you own:**
- `server/controllers/c2.listController.js`
- `server/routes/c2.list.routes.js`
- `client/src/components/c2-list/EntityList.jsx`
- `client/src/services/listService.js`
- `client/src/pages/ListPage.jsx`
- `client/src/routes/routeRegistry.jsx` (SLOT C2 only)

---

## Prompt 1 — List API

```
Implement the list endpoint for [ENTITY] in our Express server.

In server/controllers/c2.listController.js:
- Import getAll and seed from server/models/entityStore.js
- On first request, call seed() with 2-3 sample [ENTITY] using fields from our API contract
- getAll handler returns { [entity]: items[] }

In server/routes/c2.list.routes.js:
- GET / returns the list from controller
- Export router (already mounted at /api/[entity] in routes/index.js — use the actual entity path)
```

## Prompt 2 — EntityList Component

```
Create client/src/components/c2-list/EntityList.jsx.

Props: items (array), entityName (string for labels)

Display [ENTITY] as cards showing each item's main fields.
Each card links to /detail/:id using React Router Link.
Show "No [ENTITY] found" when empty.
```

## Prompt 3 — List Page + Service

```
Create client/src/services/listService.js with fetchList() calling GET /api/[entity].

Create client/src/pages/ListPage.jsx that:
- Fetches list on mount
- Shows loading and error states
- Renders EntityList with the data
- Has a link/button to /create
```

## Prompt 4 — Register Route

```
In client/src/routes/routeRegistry.jsx, fill in SLOT C2:
- Import ListPage
- Add route path "/list" rendering ListPage inside Layout

Do not edit SLOT C1, C3, or C4.
```
