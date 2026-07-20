const { getByOrderId, updateOrder } = require('../models/orderStore');

exports.processPayment = (req, res) => {
  try {
    const { orderId, cardNumber } = req.body;

    if (!orderId || !cardNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment details',
      });
    }

    const order = getByOrderId(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const cardStr = String(cardNumber).replace(/\s+/g, '');

    if (cardStr.endsWith('0000')) {
      updateOrder(orderId, { paymentStatus: 'failed' });
      return res.status(400).json({
        success: false,
        message: 'Payment declined',
      });
    }

    updateOrder(orderId, { paymentStatus: 'success' });
    return res.status(200).json({
      success: true,
      message: 'Payment successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error during payment processing',
    });
  }
};
