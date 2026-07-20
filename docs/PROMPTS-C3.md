# Person 3 — C3 Cart & Checkout (4 prompts)

**Branch:** `feat/c3-cart`  
**Covers:** FR3 (cart), FR4 (checkout form), order creation

**Files you own:**
- `client/src/context/CartContext.jsx`
- `client/src/pages/CartPage.jsx`
- `client/src/pages/CheckoutPage.jsx`
- `client/src/services/orderService.js`
- `server/controllers/c3.createController.js`
- `server/routes/c3.create.routes.js`
- `client/src/routes/routeRegistry.jsx` (SLOT C3 only)

**Do NOT edit:** ProductDetail.jsx (Person 4) — they will call useCart() from your context

---

## Prompt 1 — Cart Context (FR3)

```
Implement client/src/context/CartContext.jsx for CeylonCart shopping cart.

CartProvider should manage:
- items: array of { productId, name, price, qty }
- addItem(product, qty=1) — merge if same productId exists
- removeItem(productId)
- updateQty(productId, qty) — remove if qty <= 0
- total: sum of price * qty
- count: total item count
- Persist cart to localStorage, restore on mount

Export useCart hook. App.jsx already wraps with CartProvider.
```

## Prompt 2 — Cart Page (FR3)

```
Create client/src/pages/CartPage.jsx for CeylonCart.

Use useCart() to show:
- Table/list of cart items: name, price, qty (with +/- buttons), line total
- Remove button per item
- Running subtotal at bottom
- "Proceed to Checkout" button linking to /checkout (disabled if cart empty)
- "Continue Shopping" link to /products
- Empty cart message with link to /products
```

## Prompt 3 — Checkout + Order API (FR4)

```
Backend — server/controllers/c3.createController.js:
- POST / creates order using orderStore.createOrder()
- Body: { customer: { name, address, contact }, items, total }
- Validate customer fields are present, return 201 with order
- GET /:orderId returns order or 404

Frontend — client/src/pages/CheckoutPage.jsx:
- Form: customer name, address, contact (required)
- Show order summary (items + total) from useCart()
- On submit: call orderService.createOrder(), store orderId in localStorage or navigate state
- Navigate to /payment on success

Update client/src/services/orderService.js with createOrder() and getOrder() using apiPost/apiGet.
```

## Prompt 4 — Register Routes

```
In client/src/routes/routeRegistry.jsx, fill in SLOT C3:
- Import CartPage and CheckoutPage
- Add routes:
  - path "/cart" → CartPage inside Layout
  - path "/checkout" → CheckoutPage inside Layout

Do not edit SLOT C1, C2, or C4.
```
