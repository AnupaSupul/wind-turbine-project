/**
 * Validation middleware for incoming telemetry data.
 * Checks required fields, types, and sane numeric ranges.
 */
const validateTelemetry = (req, res, next) => {
    const errors = [];
    const { experimentId, windSpeed, pitchAngle, voltage, current, source } = req.body;

    // Required string fields
    if (!experimentId || typeof experimentId !== 'string' || experimentId.trim() === '') {
        errors.push('experimentId is required and must be a non-empty string');
    }

    // Source validation (optional in request, defaults handled by model)
    if (source !== undefined) {
        const validSources = ['simulator', 'esp32', 'manual'];
        if (!validSources.includes(source)) {
            errors.push(`source must be one of: ${validSources.join(', ')}`);
        }
    }

    // Required numeric fields
    if (windSpeed === undefined || windSpeed === null) {
        errors.push('windSpeed is required');
    } else if (typeof windSpeed !== 'number' || isNaN(windSpeed)) {
        errors.push('windSpeed must be a valid number');
    } else if (windSpeed < 0 || windSpeed > 100) {
        errors.push('windSpeed must be between 0 and 100 m/s');
    }

    if (pitchAngle === undefined || pitchAngle === null) {
        errors.push('pitchAngle is required');
    } else if (typeof pitchAngle !== 'number' || isNaN(pitchAngle)) {
        errors.push('pitchAngle must be a valid number');
    } else if (pitchAngle < -90 || pitchAngle > 90) {
        errors.push('pitchAngle must be between -90 and 90 degrees');
    }

    if (voltage === undefined || voltage === null) {
        errors.push('voltage is required');
    } else if (typeof voltage !== 'number' || isNaN(voltage)) {
        errors.push('voltage must be a valid number');
    } else if (voltage < 0 || voltage > 500) {
        errors.push('voltage must be between 0 and 500 V');
    }

    if (current === undefined || current === null) {
        errors.push('current is required');
    } else if (typeof current !== 'number' || isNaN(current)) {
        errors.push('current must be a valid number');
    } else if (current < 0 || current > 100) {
        errors.push('current must be between 0 and 100 A');
    }

    // Optional numeric fields
    const { stepperPosition } = req.body;
    if (stepperPosition !== undefined && stepperPosition !== null) {
        if (typeof stepperPosition !== 'number' || isNaN(stepperPosition)) {
            errors.push('stepperPosition must be a valid number');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors,
        });
    }

    next();
};

module.exports = { validateTelemetry };
