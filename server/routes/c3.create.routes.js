const express = require('express');
const orderController = require('../controllers/c3.createController');

const router = express.Router();

router.post('/', orderController.create);
router.get('/:orderId', orderController.getByOrderId);

module.exports = router;
