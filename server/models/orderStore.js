/**
 * In-memory order store — Person 3 creates orders, Person 4 reads/updates for payment.
 */

let orders = [];
let nextOrderId = 1001;

function createOrder(data) {
  const order = {
    orderId: `CC-${nextOrderId++}`,
    ...data,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

function getByOrderId(orderId) {
  return orders.find((o) => o.orderId === orderId) || null;
}

function updateOrder(orderId, updates) {
  const index = orders.findIndex((o) => o.orderId === orderId);
  if (index === -1) {
    throw new Error('Order not found');
  }
  orders[index] = { ...orders[index], ...updates };
  return orders[index];
}

function getAll() {
  return [...orders];
}

module.exports = { createOrder, getByOrderId, updateOrder, getAll };
