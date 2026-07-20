/**
 * In-memory order store — Person 3 creates orders, Person 4 reads for confirmation.
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

function getAll() {
  return [...orders];
}

module.exports = { createOrder, getByOrderId, getAll };
