const apiBase = import.meta.env.VITE_API_BASE || "";

/**
 * Process payment for an order using native fetch.
 * @param {Object} paymentData - Payment details ({ orderId, cardNumber, cardName })
 * @returns {Promise<Object>} API response shape: { success: boolean, message: string }
 */
export const processPayment = async (paymentData) => {
  try {
    const response = await fetch(`${apiBase}/api/payment/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || "Payment failed",
      };
    }

    return data;
  } catch (err) {
    return {
      success: false,
      message: err?.message || "A network error occurred during payment processing.",
    };
  }
};

export default { processPayment };