# Running the System

## Quick Start (3 Terminals)

You need **three separate terminal windows**. Each runs one part of the system.

---

### Terminal 1 — Backend Server

```bash
cd backend
npm start
```

**Expected output:**
```
Server running on port 5000
Health check: http://localhost:5000/api/health
```

The backend must be running before starting the frontend or simulator.

**Test it:** Open your browser to `http://localhost:5000/api/health` — you should see:
```json
{ "success": true, "message": "Wind Turbine API is healthy" }
```

---

### Terminal 2 — Frontend Dashboard

```bash
cd frontend
npm run dev
```

**Expected output:**
```
VITE v8.2.2  ready in 350 ms

  ➜  Local:   http://localhost:5173/
```

**Open the dashboard:** Navigate to `http://localhost:5173/` in your browser.

---

### Terminal 3 — Live Simulator (Optional)

```bash
cd backend
npm run simulate
```

Or equivalently:
```bash
cd backend
node scripts/liveSimulator.js
```

**Expected output:**
```
═══════════════════════════════════════════
  Wind Turbine Live Telemetry Simulator
═══════════════════════════════════════════
  Target:     http://localhost:5000/api/telemetry
  Interval:   200ms (5.0 req/s)
  ...
🚀 Starting with EXP-001 (pitch=0°)
```

The dashboard should now show **live updating values**.

---

## Startup Order

Always start in this order:

```
1. Backend     ← must be first (database connection + API)
2. Frontend    ← second (needs backend to fetch data)
3. Simulator   ← third, optional (needs backend to send data)
```

## Stopping the System

To stop each process, press **Ctrl+C** in its terminal.

You can stop them in any order. Stopping the simulator does not affect the backend. Stopping the backend causes the dashboard to show "Backend Offline" (it will reconnect when the backend restarts).

## Loading Seed Data (Optional)

To populate the database with 300 pre-generated records:

```bash
cd backend
npm run seed
```

This is useful when you want to start with a clean set of data for analytics and charts. The seed script:
1. Deletes all existing `source: "simulator"` records
2. Inserts 300 fresh records across 3 experiments

## Available npm Commands

### Backend (`cd backend`)

| Command | Purpose |
|---|---|
| `npm start` | Start the backend server |
| `npm run seed` | Load 300 seed records into the database |
| `npm run simulate` | Start the live simulator |

### Frontend (`cd frontend`)

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dashboard development server |
