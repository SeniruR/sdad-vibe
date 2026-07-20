const express = require('express');
const { getProducts } = require('../controllers/c2.listController');

const router = express.Router();

router.get('/', getProducts);

module.exports = router;
