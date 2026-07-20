const express = require('express');

const healthRoutes = require('./c1.health.routes');
const listRoutes = require('./c2.list.routes');
const createRoutes = require('./c3.create.routes');
const detailRoutes = require('./c4.detail.routes');

const router = express.Router();

// Health check
router.use('/', healthRoutes);

// Change ENTITY_PATH at kickoff (e.g. '/products', '/tasks', '/posts')
const ENTITY_PATH = '/items';

router.use(ENTITY_PATH, listRoutes);
router.use(ENTITY_PATH, createRoutes);
router.use(ENTITY_PATH, detailRoutes);

module.exports = router;
