
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import paymentService from "../services/paymentService";

function SimulatedPaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract orderId: first from state, then from localStorage
  const [orderId, setOrderId] = useState(() => {
    const stateOrderId = location.state?.orderId;
    if (stateOrderId) return stateOrderId;
    const lsOrderId = localStorage.getItem("orderId");
    if (lsOrderId) return lsOrderId;
    return null;
  });

  // Form state
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  // If orderId not found, redirect or display warning
  useEffect(() => {
    if (!orderId) {
      // Optionally, could redirect automatically:
      // navigate("/cart");
      // For now, stay and show the warning
    }
  }, [orderId, navigate]);

  // Simple front-end validation
  const isValid =
    nameOnCard.trim().length > 0 &&
    cardNumber.replace(/\s+/g, '').length >= 12 &&
    expiry.trim().length >= 5 &&
    cvv.trim().length >= 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormTouched(true);
    setError("");
    if (!isValid || !orderId) return;
    setProcessing(true);
    try {
      const result = await paymentService.processPayment({
        orderId,
        cardName: nameOnCard,
        cardNumber,
        expiry,
        cvv,
      });
      if (result.success) {
        // Clear error, store orderId for confirmation page, and navigate
        setError("");
        localStorage.setItem("orderId", orderId);
        navigate(`/confirmation/${orderId}`);
      } else {
        setError(result.message || "Payment failed. Please try again.");
        setProcessing(false);
      }
    } catch (err) {
      setError("Something went wrong while processing payment.");
      setProcessing(false);
    }
  };

  if (!orderId) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-red-50 border border-red-300 rounded shadow">
        <div className="mb-4 text-red-700 font-semibold">
          No order found. Please return to checkout.
        </div>
        <button
          className="px-6 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600"
          onClick={() => navigate("/cart")}
        >
          Back to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow border">
      {/* Simulated Payment Disclaimer */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-semibold text-sm border border-yellow-300">
          Simulated Payment — no real charges
        </span>
      </div>

      <h2 className="text-2xl font-bold mb-4">Payment for Order #{orderId}</h2>

      {error && (
        <div className="mb-4 px-3 py-2 bg-red-100 border border-red-300 text-red-800 rounded">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
        {/* Name on Card */}
        <div>
          <label htmlFor="nameOnCard" className="block mb-1 font-medium">
            Name on Card<span className="text-red-500">*</span>
          </label>
          <input
            id="nameOnCard"
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            placeholder="Jane Doe"
            value={nameOnCard}
            onChange={e => setNameOnCard(e.target.value)}
            disabled={processing}
            required
          />
          {formTouched && !nameOnCard.trim() && (
            <span className="text-sm text-red-600">Required</span>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className="block mb-1 font-medium">
            Card Number<span className="text-red-500">*</span>
          </label>
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value.replace(/[^\d ]/g, ""))}
            maxLength={19}
            disabled={processing}
            required
          />
          {formTouched && cardNumber.replace(/\s+/g, '').length < 12 && (
            <span className="text-sm text-red-600">Enter a valid card number</span>
          )}
        </div>

        {/* Expiry */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="expiry" className="block mb-1 font-medium">
              Expiry Date<span className="text-red-500">*</span>
            </label>
            <input
              id="expiry"
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              placeholder="MM/YY"
              value={expiry}
              onChange={e => setExpiry(e.target.value)}
              maxLength={5}
              disabled={processing}
              required
            />
            {formTouched && expiry.trim().length < 5 && (
              <span className="text-sm text-red-600">MM/YY</span>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block mb-1 font-medium">
              CVV<span className="text-red-500">*</span>
            </label>
            <input
              id="cvv"
              type="text"
              inputMode="numeric"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              placeholder="123"
              value={cvv}
              onChange={e => setCvv(e.target.value.replace(/\D/, ""))}
              maxLength={4}
              disabled={processing}
              required
            />
            {formTouched && cvv.trim().length < 3 && (
              <span className="text-sm text-red-600">3 or 4 digits</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded text-white ${
            !isValid || processing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={!isValid || processing}
        >
          {processing && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          )}
          Pay Now
        </button>
      </form>
    </div>
  );
}

// Replace the placeholder default export:
export default SimulatedPaymentPage;