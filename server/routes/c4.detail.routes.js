const express = require('express');
const detailController = require('../controllers/c4.detailController');

const router = express.Router();

router.get('/:id', detailController.getById);
router.delete('/:id', detailController.remove);

module.exports = router;
