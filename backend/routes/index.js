const express = require('express');
const healthRouter = require('./health');

const router = express.Router();

// Register v1 sub-routes here
router.use('/', healthRouter); // Registers /health under /api/v1/health

module.exports = router;
