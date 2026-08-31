/**
 * Live Telemetry Simulator
 *
 * Sends simulated telemetry to the backend via HTTP POST every 200ms.
 * Designed for live dashboard demonstrations.
 *
 * The backend calculates power = voltage × current.
 * The simulator does NOT calculate power.
 *
 * Usage:   npm run simulate
 * Stop:    Ctrl+C
 *
 * Environment:
 *   API_URL         — backend URL (default: http://localhost:5000)
 *   SIM_INTERVAL    — ms between sends (default: 200)
 *   SIM_EXPERIMENT  — experiment ID (default: cycles through EXP-001/002/003)
 *
 * Database note:
 *   Every POST persists a record to MongoDB Atlas.
 *   At 5 req/s, that is ~300 records/minute.
 *   Intentionally designed for short demo sessions (5–15 minutes).
 *   For longer sessions, consider increasing SIM_INTERVAL or
 *   cleaning up simulated records afterwards with: npm run seed
 */

const API_URL = process.env.API_URL || 'http://localhost:5000';
const SIM_INTERVAL = parseInt(process.env.SIM_INTERVAL) || 200;

// Experiment definitions matching seedData.js
const experiments = [
    {
        experimentId: 'EXP-001',
        pitchAngle: 0,
        windRange: [2, 4],
        voltageBase: 4.0,
        currentBase: 0.5,
        stepperBase: 0,
    },
    {
        experimentId: 'EXP-002',
        pitchAngle: 4,
        windRange: [3, 6],
        voltageBase: 6.0,
        currentBase: 0.8,
        stepperBase: 200,
    },
    {
        experimentId: 'EXP-003',
        pitchAngle: 20,
        windRange: [5, 8],
        voltageBase: 5.0,
        currentBase: 0.6,
        stepperBase: 1000,
    },
];

// ─── Smooth value generator ────────────────────────────────────
function drift(current, min, max, maxStep) {
    const step = (Math.random() - 0.5) * 2 * maxStep;
    return Math.max(min, Math.min(max, parseFloat((current + step).toFixed(3))));
}

// ─── Simulator state ──────────────────────────────────────────
let expIndex = 0;
let exp = experiments[expIndex];
let windSpeed = (exp.windRange[0] + exp.windRange[1]) / 2;
let voltage = exp.voltageBase;
let current = exp.currentBase;
let stepper = exp.stepperBase;

// Switch experiment every ~60 seconds (300 ticks at 200ms)
let tickCount = 0;
const TICKS_PER_EXPERIMENT = 300;

let sendCount = 0;
let errorCount = 0;
let consecutiveErrors = 0;
let inFlight = false;

function nextTick() {
    tickCount++;

    // Cycle experiment
    if (tickCount % TICKS_PER_EXPERIMENT === 0) {
        expIndex = (expIndex + 1) % experiments.length;
        exp = experiments[expIndex];
        windSpeed = (exp.windRange[0] + exp.windRange[1]) / 2;
        voltage = exp.voltageBase;
        current = exp.currentBase;
        stepper = exp.stepperBase;
        console.log(`\n🔄 Switched to ${exp.experimentId} (pitch=${exp.pitchAngle}°, wind=${exp.windRange[0]}–${exp.windRange[1]} m/s)`);
    }

    // Smooth value transitions
    windSpeed = drift(windSpeed, exp.windRange[0], exp.windRange[1], 0.15);

    const windFactor = (windSpeed - exp.windRange[0]) / (exp.windRange[1] - exp.windRange[0]);
    const targetVoltage = exp.voltageBase + windFactor * 4 + (Math.random() - 0.5) * 0.2;
    voltage = drift(voltage, exp.voltageBase * 0.5, exp.voltageBase + 6, 0.15);
    voltage = parseFloat((voltage * 0.8 + targetVoltage * 0.2).toFixed(3));
    voltage = Math.max(0.1, voltage);

    const targetCurrent = exp.currentBase + windFactor * 1.5 + (Math.random() - 0.5) * 0.08;
    current = drift(current, exp.currentBase * 0.3, exp.currentBase + 2, 0.06);
    current = parseFloat((current * 0.8 + targetCurrent * 0.2).toFixed(3));
    current = Math.max(0.01, current);

    stepper = Math.round(drift(stepper, stepper - 3, stepper + 3, 1));

    return {
        experimentId: exp.experimentId,
        source: 'simulator',
        windSpeed,
        pitchAngle: exp.pitchAngle,
        stepperPosition: stepper,
        voltage,
        current,
        // power is NOT included — backend calculates it
    };
}

// ─── HTTP sender ──────────────────────────────────────────────
async function send(payload) {
    if (inFlight) return; // skip if previous request still in-flight
    inFlight = true;

    try {
        const res = await fetch(`${API_URL}/api/telemetry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const body = await res.text();
            throw new Error(`HTTP ${res.status}: ${body}`);
        }

        sendCount++;
        consecutiveErrors = 0;

        // Print progress every 25 sends (~5 seconds)
        if (sendCount % 25 === 0) {
            const elapsed = Math.floor(sendCount * SIM_INTERVAL / 1000);
            console.log(
                `  📊 ${sendCount} sent (${elapsed}s) | ` +
                `${payload.experimentId} | ` +
                `wind=${payload.windSpeed.toFixed(2)} m/s | ` +
                `V=${payload.voltage.toFixed(2)} | ` +
                `I=${payload.current.toFixed(2)}`
            );
        }
    } catch (err) {
        errorCount++;
        consecutiveErrors++;

        // Only log every 5th consecutive error to avoid spam
        if (consecutiveErrors <= 1 || consecutiveErrors % 5 === 0) {
            console.error(`  ❌ Send failed (${consecutiveErrors}x): ${err.message}`);
        }

        if (consecutiveErrors >= 50) {
            console.error('\n🛑 Too many consecutive errors. Is the backend running?');
            console.error(`   Expected: ${API_URL}/api/telemetry`);
            console.error('   Continuing to retry...\n');
            consecutiveErrors = 0; // reset to avoid re-triggering immediately
        }
    } finally {
        inFlight = false;
    }
}

// ─── Main ─────────────────────────────────────────────────────
console.log('═══════════════════════════════════════════');
console.log('  Wind Turbine Live Telemetry Simulator');
console.log('═══════════════════════════════════════════');
console.log(`  Target:     ${API_URL}/api/telemetry`);
console.log(`  Interval:   ${SIM_INTERVAL}ms (${(1000 / SIM_INTERVAL).toFixed(1)} req/s)`);
console.log(`  Source:     simulator`);
console.log(`  Experiments: EXP-001, EXP-002, EXP-003 (cycling)`);
console.log(`  Press Ctrl+C to stop`);
console.log('═══════════════════════════════════════════\n');
console.log(`🚀 Starting with ${exp.experimentId} (pitch=${exp.pitchAngle}°)\n`);

const interval = setInterval(() => {
    const payload = nextTick();
    send(payload);
}, SIM_INTERVAL);

// Graceful shutdown
process.on('SIGINT', () => {
    clearInterval(interval);
    console.log('\n═══════════════════════════════════════════');
    console.log('  Simulator stopped');
    console.log(`  Total sent:   ${sendCount}`);
    console.log(`  Total errors: ${errorCount}`);
    console.log('═══════════════════════════════════════════');
    process.exit(0);
});
