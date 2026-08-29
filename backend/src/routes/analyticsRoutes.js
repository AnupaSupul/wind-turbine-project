const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// GET /api/analytics/summary — overall statistics
router.get('/summary', analyticsController.getSummary);

// GET /api/analytics/power — power analysis data for charts
router.get('/power', analyticsController.getPowerAnalytics);

module.exports = router;
