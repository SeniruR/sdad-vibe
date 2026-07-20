
export const processPayment = (req, res) => {
  res.status(501).json({ message: 'Not implemented — Person 4 (C4)' });
};
const orderStore = require('../store/orderStore');

exports.processPayment = async (req, res) => {
  try {
    const { orderId, cardNumber, cardName } = req.body;

    // Basic input validation
    if (!orderId || !cardNumber) {
      return res.status(400).json({
        success: false,
        message: "Missing required payment details"
      });
    }

    const cardStr = String(cardNumber).trim();
    let statusToSet, resp;

    if (cardStr.endsWith('0000')) {
      // Decline
      statusToSet = "failed";
      await orderStore.update(orderId, { paymentStatus: statusToSet });
      return res.status(400).json({
        success: false,
        message: "Payment declined"
      });
    } else {
      // Succeed
      statusToSet = "success";
      await orderStore.update(orderId, { paymentStatus: statusToSet });
      return res.status(200).json({
        success: true,
        message: "Payment successful"
      });
    }
  } catch (err) {
    // Could be order not found, db errors, etc
    if (
      err &&
      typeof err.message === "string" &&
      err.message.toLowerCase().includes("not found")
    ) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error during payment processing"
    });
  }
};