# Person 3 — C3 Create (4 prompts)

**Branch:** `feat/c3-create`

**Files you own:**
- `server/controllers/c3.createController.js`
- `server/routes/c3.create.routes.js`
- `client/src/components/c3-form/EntityForm.jsx`
- `client/src/services/createService.js`
- `client/src/pages/CreatePage.jsx`
- `client/src/routes/routeRegistry.jsx` (SLOT C3 only)

---

## Prompt 1 — Create API

```
Implement POST /api/[entity] in our Express server.

In server/controllers/c3.createController.js:
- Import create from server/models/entityStore.js
- Validate required fields from API contract: [list your fields]
- Return 201 with created item, or 400 with error message

In server/routes/c3.create.routes.js:
- POST / calls the create controller
```

## Prompt 2 — EntityForm Component

```
Create client/src/components/c3-form/EntityForm.jsx.

Controlled form with inputs for each [entity] field from API contract.
Props: onSubmit(data), loading (boolean)
Submit button disabled while loading.
Basic client-side validation for required fields.
```

## Prompt 3 — Create Page + Service

```
Create client/src/services/createService.js with createItem(data) calling POST /api/[entity].

Create client/src/pages/CreatePage.jsx that:
- Uses EntityForm
- On submit, calls createService
- On success, navigate to /list using useNavigate
- Shows error message on failure
```

## Prompt 4 — Register Route

```
In client/src/routes/routeRegistry.jsx, fill in SLOT C3:
- Import CreatePage
- Add route path "/create" rendering CreatePage inside Layout

Do not edit SLOT C1, C2, or C4.
```
