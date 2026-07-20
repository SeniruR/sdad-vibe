# Person 4 — C4 Detail, Payment & Confirmation (4 prompts)

**Branch:** `feat/c4-detail`  
**Covers:** FR2 (product detail + Add to Cart), FR5 (mock payment), FR6 (order confirmation)

**Files you own:**
- `server/controllers/c4.detailController.js`
- `server/routes/c4.detail.routes.js`
- `server/controllers/c4.paymentController.js`
- `server/routes/c4.payment.routes.js`
- `client/src/components/c4-detail/ProductDetail.jsx`
- `client/src/pages/DetailPage.jsx`
- `client/src/pages/PaymentPage.jsx`
- `client/src/pages/ConfirmationPage.jsx`
- `client/src/services/paymentService.js`
- `client/src/services/detailService.js`
- `client/src/routes/routeRegistry.jsx` (SLOT C4 only)

**Uses:** `useCart()` from `client/src/context/CartContext.jsx` (built by Person 3)

---

## Prompt 1 — Product Detail API + Page (FR2)

```
Backend — server/controllers/c4.detailController.js:
- getById: import getById from entityStore, return { product } or 404
- Remove the delete handler (not needed for e-commerce)

Frontend — client/src/pages/DetailPage.jsx + ProductDetail.jsx:
- useParams for id, fetch product via detailService.getProduct(id)
- Show image, name, category, price, full description
- "Add to Cart" button: calls useCart().addItem(product, 1), show brief "Added!" feedback
- "Back to Products" link to /products
- Handle loading, error, not found states

Update client/src/services/detailService.js with getProduct(id) calling GET /api/products/:id
```

## Prompt 2 — Mock Payment (FR5)

```
Backend — server/controllers/c4.paymentController.js:
- POST /process accepts { orderId, cardNumber, cardName }
- If cardNumber ends with "0000" → return { success: false, message: "Payment declined" }
- Otherwise → return { success: true, message: "Payment successful" }
- Update order in orderStore: set paymentStatus to "success" or "failed"

Frontend — client/src/pages/PaymentPage.jsx:
- Fake card form: card number, name on card, "Pay Now" button
- Read orderId from location.state or localStorage (set by checkout)
- Call paymentService.processPayment()
- On success → navigate to /confirmation/:orderId
- On failure → show error message, allow retry
- Label clearly: "Simulated Payment — no real charges"
```

## Prompt 3 — Order Confirmation (FR6)

```
Create client/src/pages/ConfirmationPage.jsx for CeylonCart.

- useParams for orderId
- Fetch order via orderService.getOrder(orderId)
- Display:
  - "Order Confirmed!" heading with order ID prominently shown
  - Customer details (name, address, contact)
  - Items list with quantities and prices
  - Order total
  - Payment status
- "Continue Shopping" button to /products
- Clear cart using useCart() after successful confirmation
- Handle order not found
```

## Prompt 4 — Register Routes

```
In client/src/routes/routeRegistry.jsx, fill in SLOT C4:
- Import DetailPage, PaymentPage, ConfirmationPage
- Add routes:
  - path "/products/:id" → DetailPage inside Layout
  - path "/payment" → PaymentPage inside Layout
  - path "/confirmation/:orderId" → ConfirmationPage inside Layout

Do not edit SLOT C1, C2, or C3.
Also update client/src/services/paymentService.js with processPayment() calling POST /api/payment/process
```
