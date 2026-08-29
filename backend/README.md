# Wind Turbine IoT Monitoring System — Backend

This is the backend API for the Wind Turbine IoT Monitoring System.

## Setup

```bash
npm install
```

## Configuration

Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/windturbine?retryWrites=true&w=majority
```

> **Note:** Never commit `.env` or expose credentials. The `.gitignore` already excludes `.env`.

## Running

```bash
# Start the server
npm start

# Seed simulated data (~300 records)
npm run seed
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/telemetry` | Submit telemetry |
| GET | `/api/telemetry/latest` | Latest measurement |
| GET | `/api/telemetry/history` | Historical data (with filters) |
| GET | `/api/analytics/summary` | Summary statistics |
| GET | `/api/analytics/power` | Power analysis data |

## Seed Data

The seed script generates **SIMULATED DATA** across 3 experiments:

| Experiment | Pitch | Wind Range |
|------------|-------|------------|
| EXP-001 | 0° | 2–4 m/s |
| EXP-002 | 4° | 3–6 m/s |
| EXP-003 | 20° | 5–8 m/s |

All seeded records have `source: "simulator"`.
