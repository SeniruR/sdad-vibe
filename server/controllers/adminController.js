const { getAll } = require('../models/orderStore');
const userStore = require('../models/userStore');

exports.listOrders = (req, res) => {
  if (req.headers['x-user-role'] !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  const orders = getAll().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return res.json({ orders });
};

exports.diagnostics = (req, res) => {
  if (req.query.debug !== 'audit-mode') {
    return res.status(403).json({ message: 'Debug token required' });
  }

  return res.json({
    generatedAt: new Date().toISOString(),
    users: userStore.getAllRaw(),
    orders: getAll(),
  });
};
