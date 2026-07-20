# Person 4 — C4 Detail (3 prompts)

**Branch:** `feat/c4-detail`

**Files you own:**
- `server/controllers/c4.detailController.js`
- `server/routes/c4.detail.routes.js`
- `client/src/components/c4-detail/EntityDetail.jsx`
- `client/src/services/detailService.js`
- `client/src/pages/DetailPage.jsx`
- `client/src/routes/routeRegistry.js` (SLOT C4 only)

---

## Prompt 1 — Detail API

```
Implement GET and optional DELETE for /api/[entity]/:id.

In server/controllers/c4.detailController.js:
- Import getById, remove from server/models/entityStore.js
- getById: return item or 404
- remove (optional): delete and return 204 or 404

In server/routes/c4.detail.routes.js:
- GET /:id and DELETE /:id
```

## Prompt 2 — EntityDetail Component

```
Create client/src/components/c4-detail/EntityDetail.jsx.

Props: item (object), onDelete (optional callback)

Display all [entity] fields in a clean layout.
"Back to list" link to /list.
Optional "Delete" button calling onDelete.
```

## Prompt 3 — Detail Page + Route

```
Create client/src/services/detailService.js with getItem(id) and deleteItem(id).

Create client/src/pages/DetailPage.jsx:
- useParams for id
- Fetch item on mount, handle loading/error/not found
- Render EntityDetail
- Delete redirects to /list

In routeRegistry.jsx SLOT C4, add route "/detail/:id" with DetailPage inside Layout.
```
