/**
 * In-memory dummy user store for login/registration.
 */

const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@ceyloncart.lk',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Demo Customer',
    email: 'customer@ceyloncart.lk',
    password: 'customer123',
    role: 'customer',
  },
];

let nextId = 3;

function findByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

function findById(id) {
  return users.find((u) => u.id === id) || null;
}

function createUser({ name, email, password }) {
  const user = {
    id: String(nextId++),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role: 'customer',
  };
  users.push(user);
  return sanitize(user);
}

function sanitize(user) {
  const { password, ...safe } = user;
  return safe;
}

function validateLogin(email, password) {
  const user = findByEmail(email);
  if (!user || user.password !== password) return null;
  return sanitize(user);
}

module.exports = { findByEmail, findById, createUser, validateLogin, sanitize };
