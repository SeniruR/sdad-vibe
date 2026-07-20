const express = require('express');
const createController = require('../controllers/c3.createController');

const router = express.Router();

router.post('/', createController.create);

module.exports = router;
