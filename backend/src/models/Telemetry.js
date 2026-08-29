const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema(
    {
        experimentId: {
            type: String,
            required: [true, 'Experiment ID is required'],
            trim: true,
        },
        source: {
            type: String,
            required: [true, 'Source is required'],
            enum: {
                values: ['simulator', 'esp32', 'manual'],
                message: 'Source must be simulator, esp32, or manual',
            },
            default: 'simulator',
        },
        timestamp: {
            type: Date,
            required: [true, 'Timestamp is required'],
            default: Date.now,
        },
        windSpeed: {
            type: Number,
            required: [true, 'Wind speed is required'],
        },
        pitchAngle: {
            type: Number,
            required: [true, 'Pitch angle is required'],
        },
        stepperPosition: {
            type: Number,
            default: null,
        },
        voltage: {
            type: Number,
            required: [true, 'Voltage is required'],
        },
        current: {
            type: Number,
            required: [true, 'Current is required'],
        },
        power: {
            type: Number,
            required: [true, 'Power is required'],
        },
    },
    {
        timestamps: true, // adds createdAt, updatedAt
    }
);

// Index for efficient time-based and experiment-based queries
telemetrySchema.index({ timestamp: -1 });
telemetrySchema.index({ experimentId: 1, timestamp: -1 });

const Telemetry = mongoose.model('Telemetry', telemetrySchema);

module.exports = Telemetry;
