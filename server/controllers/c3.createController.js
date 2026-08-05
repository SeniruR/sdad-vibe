const { createOrder, getByOrderId } = require('../models/orderStore');

function validateCustomer(customer) {
  if (!customer || typeof customer !== 'object') {
    return 'Customer details are required';
  }
  const { name, address, contact } = customer;
  if (!name?.trim()) return 'Customer name is required';
  if (!address?.trim()) return 'Customer address is required';
  if (!contact?.trim()) return 'Customer contact is required';
  return null;
}

exports.create = (req, res) => {
  const { customer, items, total, specialInstructions } = req.body;

  const customerError = validateCustomer(customer);
  if (customerError) {
    return res.status(400).json({ message: customerError });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order must include at least one item' });
  }

  if (typeof total !== 'number' || total < 0) {
    return res.status(400).json({ message: 'Valid order total is required' });
  }

  const order = createOrder({
    customer: {
      name: customer.name.trim(),
      address: customer.address.trim(),
      contact: customer.contact.trim(),
    },
    items,
    total,
    specialInstructions: typeof specialInstructions === 'string' ? specialInstructions : '',
    paymentStatus: 'pending',
  });

  return res.status(201).json({ order });
};

exports.getByOrderId = (req, res) => {
  const order = getByOrderId(req.params.orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  return res.json({ order });
};
