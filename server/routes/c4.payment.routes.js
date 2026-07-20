const express = require('express');
const paymentController = require('../controllers/c4.paymentController');

const router = express.Router();

router.post('/process', paymentController.processPayment);

module.exports = router;
