const express = require('express');
const listController = require('../controllers/c2.listController');

const router = express.Router();

router.get('/', listController.getAll);

module.exports = router;
