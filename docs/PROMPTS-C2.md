# Person 2 — C2 Product Catalogue (4 prompts)

**Branch:** `feat/c2-list`  
**Covers:** FR1 — display 8–12 products with name, image, price, category

**Files you own:**
- `server/controllers/c2.listController.js`
- `server/routes/c2.list.routes.js`
- `client/src/components/c2-list/ProductList.jsx`
- `client/src/services/listService.js`
- `client/src/pages/ListPage.jsx`
- `client/src/routes/routeRegistry.jsx` (SLOT C2 only)

**Seed data:** already in `server/models/productsSeed.js` (10 products)

---

## Prompt 1 — Products API

```
Implement GET /api/products in server/controllers/c2.listController.js.

- Import getAll, seed from server/models/entityStore.js
- Import productsSeed from server/models/productsSeed.js
- On first request, call seed(productsSeed) then return { products: getAll() }
- Return 200 with products array

The route is already wired in server/routes/c2.list.routes.js at GET /
```

## Prompt 2 — ProductList Component

```
Create client/src/components/c2-list/ProductList.jsx for CeylonCart.

Props: products (array)

Display products as a responsive grid of cards showing:
- Product image (img tag, placeholder if broken)
- Name, category badge, price formatted as $XX.XX
- Each card links to /products/:id using React Router Link

Show "No products found" when empty.
Use clean card styling with border/shadow.
```

## Prompt 3 — Products Page

```
Create client/src/pages/ListPage.jsx for CeylonCart product catalogue (FR1).

- Fetch products on mount using listService.fetchProducts()
- Show loading spinner and error message states
- Render ProductList with the data
- Page title: "Our Products"
- Optional: category filter dropdown (All, Tea, Spices, Handicrafts, Apparel) using fetchProductsByCategory from listService.js
```

## Prompt 4 — Register Route

```
In client/src/routes/routeRegistry.jsx, fill in SLOT C2:
- Import ListPage
- Add route: path "/products" with ListPage inside Layout

Do not edit SLOT C1, C3, or C4.
```
