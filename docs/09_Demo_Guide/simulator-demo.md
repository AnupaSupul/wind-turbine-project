# Simulator Demo Guide

A short guide for demonstrating the live simulator feature specifically.

## Quick Start

```bash
# Terminal 1 — Backend (must be running first)
cd backend
npm start

# Terminal 2 — Frontend
cd frontend
npm run dev

# Terminal 3 — Simulator
cd backend
npm run simulate
```

Then open `http://localhost:5173/` in a browser.

## What to Show

### 1. Live Metric Cards
The six metric cards at the top update continuously. Point out:
- Wind Speed changing gradually
- Power changing as wind speed changes
- Voltage and Current fluctuating realistically

### 2. Live Trend Chart
Click different metrics in the chart selector to show:
- **Power** — trends up and down with wind
- **Wind Speed** — smooth gradual changes
- **Voltage** — correlated with wind speed

### 3. Experiment Cycling
Wait ~60 seconds and the terminal will show:
```
🔄 Switched to EXP-002 (pitch=4°, wind=3–6 m/s)
```
The dashboard values will jump to the new experiment's range.

### 4. Data Persistence
After stopping the simulator, the data is still in the database:
- The summary statistics include the new data
- The historical table shows all generated records
- The power charts reflect the combined dataset

## Stopping

Press **Ctrl+C** in the simulator terminal. The backend and dashboard continue running normally.

## Adjusting Speed

To slow down the simulator (e.g., 1 record per second):

```bash
SIM_INTERVAL=1000 node scripts/liveSimulator.js
```
