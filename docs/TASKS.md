# CeylonCart — Task Division

## Requirements mapping

| FR | Feature | Owner | Branch |
|----|---------|-------|--------|
| — | Layout, Home, branding | Person 1 | `feat/c1-layout` |
| FR1 | Product catalogue (8–12 products) | Person 2 | `feat/c2-list` |
| FR2 | Product detail + Add to Cart | Person 4 | `feat/c4-detail` |
| FR3 | Shopping cart (add/remove/qty/total) | Person 3 | `feat/c3-cart` |
| FR4 | Checkout form (name, address, contact) | Person 3 | `feat/c3-cart` |
| FR5 | Mock payment gateway | Person 4 | `feat/c4-detail` |
| FR6 | Order confirmation + order ID | Person 4 | `feat/c4-detail` |

## Person 1 — Layout & Home

**Prompt file:** `docs/PROMPTS-C1.md`  
**Time:** ~30 min | **Prompts:** 3

Files: `Header.jsx`, `Layout.jsx`, `HomePage.jsx`, route SLOT C1

## Person 2 — Product Catalogue

**Prompt file:** `docs/PROMPTS-C2.md`  
**Time:** ~45 min | **Prompts:** 4

Files: `c2.listController.js`, `ProductList.jsx`, `ListPage.jsx`, `listService.js`, route SLOT C2

Delivers: 10 seeded products, `/products` page with cards

## Person 3 — Cart & Checkout

**Prompt file:** `docs/PROMPTS-C3.md`  
**Time:** ~45 min | **Prompts:** 4

Files: `CartContext.jsx`, `CartPage.jsx`, `CheckoutPage.jsx`, `orderService.js`, order API, routes SLOT C3

Delivers: cart CRUD, checkout form, POST `/api/orders`

## Person 4 — Detail, Payment & Confirmation

**Prompt file:** `docs/PROMPTS-C4.md`  
**Time:** ~45 min | **Prompts:** 4

Files: `ProductDetail.jsx`, `DetailPage.jsx`, `PaymentPage.jsx`, `ConfirmationPage.jsx`, payment API, routes SLOT C4

Delivers: product detail, mock payment, order confirmation

## Demo flow (must work end-to-end)

```
Home → Products → Product Detail → Add to Cart → Cart → Checkout → Payment → Confirmation
```

## Merge order

1. `feat/c1-layout`
2. `feat/c2-list`
3. `feat/c3-cart`
4. `feat/c4-detail`

Only expected conflict: `routeRegistry.jsx` — keep all route entries.

## Optional (if time permits)

- Category filter on products page (Person 2)
- Cart item count badge in Header (Person 1 or 3)
- Responsive CSS (anyone)
