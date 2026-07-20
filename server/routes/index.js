const express = require('express');

const healthRoutes = require('./c1.health.routes');
const listRoutes = require('./c2.list.routes');
const orderRoutes = require('./c3.create.routes');
const detailRoutes = require('./c4.detail.routes');
const paymentRoutes = require('./c4.payment.routes');

const router = express.Router();

router.use('/', healthRoutes);

// CeylonCart products (FR1, FR2)
router.use('/products', listRoutes);
router.use('/products', detailRoutes);

// Orders (FR4, FR6) — Person 3
router.use('/orders', orderRoutes);

// Mock payment (FR5) — Person 4
router.use('/payment', paymentRoutes);

module.exports = router;
