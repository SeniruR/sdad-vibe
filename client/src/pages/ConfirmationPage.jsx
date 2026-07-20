
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import orderService from "../services/orderService";
import { useCart } from "../context/CartContext";

function formatCurrency(amount) {
  // Defaults to LKR; adjust as needed.
  if (typeof amount !== "number") return amount;
  return `LKR ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2 })}`;
}

export default function ConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCart();
  const cartCleared = useRef(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setOrder(null);

    orderService
      .getOrder(orderId)
      .then((data) => {
        if (!isMounted) return;
        if (!data || typeof data !== "object") {
          setError("Order not found or invalid order ID.");
        } else {
          setOrder(data);
          // Only clear cart once per page view, never again for remounts
          if (!cartCleared.current) {
            clearCart();
            cartCleared.current = true;
          }
        }
      })
      .catch((err) => {
        setError("Order not found or invalid order ID.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [orderId, clearCart]);

  // ==== UI ====
  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-8 text-center">
        <span className="inline-block animate-spin mr-2 align-middle" style={{ border: "4px solid #efefef", borderTop: "4px solid #2ecc40", borderRadius: "9999px", width: 28, height: 28, verticalAlign: "middle" }} />
        <span className="align-middle font-medium text-lg">Fetching your order...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-16 p-8 rounded bg-red-50 border border-red-200 text-center">
        <div className="mb-4 text-2xl font-bold text-red-600">Order Not Found</div>
        <div className="mb-6 text-base">{error}</div>
        <Link
          to="/products"
          className="inline-block px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  // Defensive: if order loads but no data
  if (!order) {
    return (
      <div className="max-w-lg mx-auto mt-16 p-8 rounded text-center">
        <div className="mb-4 text-xl font-semibold text-gray-800">Order missing.</div>
        <Link
          to="/products"
          className="inline-block px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Shorthand access for different possible shape
  const customer = order.customer || order.customerDetails || {};
  const shipping = order.shippingDetails || {};
  // Array of order items; fallback to [] if missing
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded shadow border">
      {/* Heading and Success Badge */}
      <div className="flex items-center justify-center mb-6 gap-3">
        <span
          className="text-green-600"
          style={{
            display: 'inline-block',
            borderRadius: '99px',
            background: '#eafaf1',
            fontWeight: 700,
            padding: '0.4rem 1.1rem',
            fontSize: '1.02rem',
            border: '1.5px solid #39d353',
          }}
        >
          <span role="img" aria-label="success" style={{ marginRight: 8 }}>✅</span>
          Order Confirmed!
        </span>
      </div>
      <h2 className="text-center text-2xl font-semibold mb-2">Thank you for your order</h2>
      <div className="text-center mb-8">
        <span className="inline-block text-sm bg-gray-50 text-gray-800 px-3 py-1 rounded font-mono tracking-wide">
          Order ID:&nbsp;<b>{orderId}</b>
        </span>
      </div>

      {/* Customer Details */}
      <div className="mb-8">
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="text-md font-semibold mb-2 text-gray-700">Customer Details</div>
          <div className="text-gray-800 mb-1"><b>Name:</b> {customer.name || shipping.name || "N/A"}</div>
          <div className="text-gray-800 mb-1">
            <b>Address:</b>{" "}
            {shipping.address ||
             customer.address ||
             [shipping.line1, shipping.line2, shipping.city, shipping.postalCode, shipping.country].filter(Boolean).join(', ') ||
             "N/A"}
          </div>
          <div className="text-gray-800 mb-1">
            <b>Email:</b> {customer.email || shipping.email || "N/A"}
          </div>
          <div className="text-gray-800">
            <b>Contact:</b> {customer.phone || customer.contact || shipping.phone || "N/A"}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-8">
        <div className="text-md font-semibold mb-2 text-gray-700">Order Items</div>
        <div className="overflow-x-auto">
          <table className="min-w-full border" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th className="px-2 py-2 text-left text-sm font-bold border-b">Item</th>
                <th className="px-2 py-2 text-left text-sm font-bold border-b">Unit Price</th>
                <th className="px-2 py-2 text-left text-sm font-bold border-b">Qty</th>
                <th className="px-2 py-2 text-right text-sm font-bold border-b">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center">
                    <span className="text-gray-500 italic">No items found in this order.</span>
                  </td>
                </tr>
              )}
              {items.map((item, idx) => (
                <tr key={item.id || item.productId || idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.name} style={{ width: 38, height: 38, objectFit: 'cover', borderRadius: 4, border: "1px solid #eee" }} />
                      )}
                      <span>{item.name || item.productName || `Product ${item.productId || item.id || idx}`}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2">{formatCurrency(item.unitPrice || item.price || 0)}</td>
                  <td className="px-2 py-2">{item.quantity || item.qty || 1}</td>
                  <td className="px-2 py-2 text-right">
                    {formatCurrency(
                      (item.unitPrice || item.price || 0) * (item.quantity || item.qty || 1)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="pt-4 pr-2 text-right font-semibold text-lg">
                  Total:
                </td>
                <td className="pt-4 px-2 text-right font-bold text-lg">
                  {formatCurrency(order.totalAmount || order.total || 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Payment Status */}
      <div className="mb-8">
        <div className="inline-block px-4 py-2 rounded text-white font-semibold"
          style={{
            background: order.paymentStatus === "success" || order.paymentStatus === "paid"
              ? "#27ae60"
              : order.paymentStatus === "pending"
              ? "#e2a516"
              : "#bf1f2f",
            minWidth: 110,
            textAlign: "center",
            letterSpacing: "0.5px"
          }}
        >
          Payment:&nbsp;
          {order.paymentStatus === "success" || order.paymentStatus === "paid"
            ? "Paid"
            : order.paymentStatus === "pending"
            ? "Pending"
            : "Failed"}
        </div>
      </div>

      {/* Continue Shopping */}
      <div className="text-center">
        <Link
          to="/products"
          className="inline-block px-8 py-3 rounded bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition"
          style={{ boxShadow: "0 2px 8px rgba(44,62,80,0.07)" }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}