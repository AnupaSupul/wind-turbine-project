# Simulator

## What Is the Simulator?

The simulator (`backend/scripts/liveSimulator.js`) is a development tool that generates realistic fake measurements and sends them to the backend. It replaces the ESP32 during software development and demonstrations.

## Why Is It Needed?

- The real ESP32 hardware may not always be available
- The software needs to be tested and demonstrated
- The dashboard needs live-changing data to verify the live-update mechanism
- Supervisors can see the system in action without the physical turbine

## How It Works

### Sending Data
The simulator sends one measurement to the backend every **200 milliseconds** (5 per second) via HTTP POST to:

```
POST http://localhost:5000/api/telemetry
```

This is the same endpoint that the real ESP32 will use.

### Cycling Through Experiments
The simulator cycles through the three experiments:

1. **EXP-001** (pitch 0°, wind 2–4 m/s) — runs for ~60 seconds
2. **EXP-002** (pitch 4°, wind 3–6 m/s) — runs for ~60 seconds
3. **EXP-003** (pitch 20°, wind 5–8 m/s) — runs for ~60 seconds
4. Back to EXP-001, and so on...

### Smooth Value Changes
Values change **gradually**, not randomly. Each new wind speed is a small adjustment from the previous value. This creates smooth, realistic-looking trends on the dashboard.

For example, wind speed might progress like:
```
3.50 → 3.47 → 3.52 → 3.58 → 3.55 → 3.61 → ...
```

Not like:
```
3.50 → 1.20 → 6.89 → 0.44 → 7.31 → ...  (chaotic — NOT how it works)
```

### What It Sends

Each measurement includes:

| Field | Description |
|---|---|
| `experimentId` | Current experiment (e.g., `EXP-001`) |
| `source` | Always `"simulator"` |
| `windSpeed` | Smoothly varying within the experiment's range |
| `pitchAngle` | Fixed for the current experiment |
| `stepperPosition` | Slight drift around the experiment's base position |
| `voltage` | Correlated with wind speed |
| `current` | Correlated with wind speed |

**Power is NOT sent** — the backend calculates it.

## Database Impact

Every measurement sent by the simulator is saved to MongoDB Atlas. At 5 records per second:

| Duration | Records Added |
|---|---|
| 1 minute | ~300 records |
| 5 minutes | ~1,500 records |
| 15 minutes | ~4,500 records |

The simulator is designed for **short demo sessions** (5–15 minutes). For longer sessions, consider increasing the interval using the `SIM_INTERVAL` environment variable.

To clean up simulator records, you can re-run seeding:
```
npm run seed
```
This deletes all existing `source: "simulator"` records and inserts a clean set of 300.

## Starting and Stopping

### Start
```bash
cd backend
node scripts/liveSimulator.js
```
Or:
```bash
cd backend
npm run simulate
```

### Stop
Press **Ctrl+C** in the simulator's terminal. The simulator will print a summary:
```
  Simulator stopped
  Total sent:   1500
  Total errors: 0
```

### Configuration

| Environment Variable | Default | Description |
|---|---|---|
| `API_URL` | `http://localhost:5000` | Backend URL to send data to |
| `SIM_INTERVAL` | `200` | Milliseconds between sends |

Example: Run at 1 record per second instead of 5:
```bash
SIM_INTERVAL=1000 node scripts/liveSimulator.js
```
