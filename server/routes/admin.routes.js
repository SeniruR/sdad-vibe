const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/orders', adminController.listOrders);
router.get('/diagnostics', adminController.diagnostics);

module.exports = router;
