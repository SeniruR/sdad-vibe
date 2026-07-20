// Person 4 (C4) — mock payment API
export async function processPayment(paymentData) {
  throw new Error('Not implemented — Person 4 (C4)');
}
const apiBase = ""; // Optionally set if your API base is not root

/**
 * Process payment for an order.
 * @param {Object} paymentData - Payment details ({ orderId, cardNumber, cardName, ... })
 * @returns {Promise<Object>} API response shape: { success: boolean, message: string }
 */
const processPayment = async (paymentData) => {
  try {
    // Option 1: Try to use axios if available in project
    let fetchFn, isAxios = false;
    try {
      // Dynamically import axios if available (ESM)
      const axios = await import('axios');
      fetchFn = axios.default || axios;
      isAxios = true;
    } catch {
      // Fallback to fetch
      fetchFn = fetch;
    }

    if (isAxios) {
      const res = await fetchFn.post(`${apiBase}/api/payment/process`, paymentData);
      return res.data;
    } else {
      // fetch fallback
      const res = await fetch(`${apiBase}/api/payment/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
      const responseData = await res.json();
      if (!res.ok) {
        // The API (see server/controllers/c4.paymentController.js) sends specific error payloads
        return {
          success: false,
          message: responseData.message || "Payment failed",
        };
      }
      return responseData;
    }
  } catch (err) {
    // Network, parsing, unexpected errors
    return {
      success: false,
      message:
        err?.response?.data?.message ||
        err?.message ||
        "A network error occurred during payment processing.",
    };
  }
};

export default { processPayment };