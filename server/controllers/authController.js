const userStore = require('../models/userStore');

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = userStore.validateLogin(email, password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.json({ user });
};

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  if (userStore.findByEmail(email)) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const user = userStore.createUser({ name, email, password });
  return res.status(201).json({ user });
};

exports.me = (req, res) => {
  const user = userStore.findById(req.headers['x-user-id']);
  if (!user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  return res.json({ user: userStore.sanitize(user) });
};
