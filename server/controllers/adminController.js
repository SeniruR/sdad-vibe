const { getAll } = require('../models/orderStore');

exports.listOrders = (req, res) => {
  if (req.headers['x-user-role'] !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  const orders = getAll().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return res.json({ orders });
};
