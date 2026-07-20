const express = require('express');
const { healthCheck } = require('../controllers/c1.healthController');

const router = express.Router();

router.get('/health', healthCheck);

module.exports = router;
