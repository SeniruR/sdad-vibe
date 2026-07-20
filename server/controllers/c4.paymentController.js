/**
 * Person 4 (C4) — mock payment gateway (FR5).
 * Deterministic: card ending in 0000 = failure, anything else = success.
 */
exports.processPayment = (req, res) => {
  res.status(501).json({ message: 'Not implemented — Person 4 (C4)' });
};
