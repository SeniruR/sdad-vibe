import { createContext, useContext } from 'react';

/**
 * Person 3 (C3) — implement cart state here (FR3).
 * Stub so Person 4 can import useCart in ProductDetail.
 */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  return (
    <CartContext.Provider value={{ items: [], addItem: () => {}, removeItem: () => {}, updateQty: () => {}, total: 0, count: 0 }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

export default CartContext;
