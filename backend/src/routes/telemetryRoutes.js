const express = require('express');
const router = express.Router();
const { validateTelemetry } = require('../middleware/validation');
const telemetryController = require('../controllers/telemetryController');

// POST /api/telemetry — receive and save telemetry
router.post('/', validateTelemetry, telemetryController.createTelemetry);

// GET /api/telemetry/latest — most recent record
router.get('/latest', telemetryController.getLatest);

// GET /api/telemetry/history — historical records with filters
router.get('/history', telemetryController.getHistory);

module.exports = router;
