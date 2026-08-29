const Telemetry = require('../models/Telemetry');

/**
 * In-memory cache for the latest telemetry record.
 * Updated on every successful save; returned by getLatest().
 * This avoids hitting MongoDB Atlas on every 200ms poll from the React dashboard.
 */
let currentLatest = null;

/**
 * Save a validated telemetry record.
 * Calculates power from voltage × current (server-side).
 * Updates the in-memory latest cache after saving.
 */
const saveTelemetry = async (data) => {
    const power = data.voltage * data.current;

    const telemetry = new Telemetry({
        experimentId: data.experimentId,
        source: data.source || 'simulator',
        timestamp: data.timestamp || new Date(),
        windSpeed: data.windSpeed,
        pitchAngle: data.pitchAngle,
        stepperPosition: data.stepperPosition || null,
        voltage: data.voltage,
        current: data.current,
        power,
    });

    const saved = await telemetry.save();

    // Update in-memory cache
    currentLatest = saved.toObject();

    return saved;
};

/**
 * Get the most recent telemetry record from in-memory cache.
 * Falls back to a MongoDB query only if the cache is empty (e.g. first request after restart).
 */
const getLatest = async () => {
    if (currentLatest) {
        return currentLatest;
    }

    // Fallback: populate cache from DB (runs at most once per server lifetime)
    const latest = await Telemetry.findOne().sort({ timestamp: -1 }).lean();
    if (latest) {
        currentLatest = latest;
    }
    return latest;
};

/**
 * Initialize the in-memory cache from MongoDB.
 * Should be called once at server startup so the cache is warm
 * before the first GET /latest request arrives.
 */
const initializeCache = async () => {
    try {
        const latest = await Telemetry.findOne().sort({ timestamp: -1 }).lean();
        if (latest) {
            currentLatest = latest;
            console.log(`Telemetry cache initialized: ${latest.experimentId} @ ${latest.timestamp}`);
        } else {
            console.log('Telemetry cache: no existing records found');
        }
    } catch (error) {
        console.error('Failed to initialize telemetry cache:', error.message);
    }
};

/**
 * Get historical telemetry with optional filters and pagination.
 *
 * Supported filters:
 *   - from / to         (ISO date strings)
 *   - experimentId
 *   - pitchAngle
 *   - source
 *   - minWindSpeed / maxWindSpeed
 *   - limit / page
 */
const getHistory = async (filters = {}) => {
    const query = {};

    // Date range
    if (filters.from || filters.to) {
        query.timestamp = {};
        if (filters.from) query.timestamp.$gte = new Date(filters.from);
        if (filters.to) query.timestamp.$lte = new Date(filters.to);
    }

    // Experiment
    if (filters.experimentId) {
        query.experimentId = filters.experimentId;
    }

    // Pitch angle
    if (filters.pitchAngle !== undefined) {
        query.pitchAngle = Number(filters.pitchAngle);
    }

    // Source
    if (filters.source) {
        query.source = filters.source;
    }

    // Wind speed range
    if (filters.minWindSpeed || filters.maxWindSpeed) {
        query.windSpeed = {};
        if (filters.minWindSpeed) query.windSpeed.$gte = Number(filters.minWindSpeed);
        if (filters.maxWindSpeed) query.windSpeed.$lte = Number(filters.maxWindSpeed);
    }

    // Pagination
    const limit = Math.min(Math.max(parseInt(filters.limit) || 50, 1), 1000);
    const page = Math.max(parseInt(filters.page) || 1, 1);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        Telemetry.find(query).sort({ timestamp: -1 }).skip(skip).limit(limit).lean(),
        Telemetry.countDocuments(query),
    ]);

    return {
        data,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        },
    };
};

module.exports = { saveTelemetry, getLatest, getHistory, initializeCache };

