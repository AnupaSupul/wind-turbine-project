# Demo Steps — University Demonstration Guide

This guide walks you through a complete demonstration of the Wind Turbine IoT Monitoring System. Follow each step in order.

## Prerequisites

Before starting the demo:
- ✅ Node.js installed
- ✅ `npm install` completed in both `backend/` and `frontend/`
- ✅ `backend/.env` configured with MongoDB Atlas credentials
- ✅ Seed data loaded (`npm run seed` in backend/)

## Step-by-Step Demo

### Step 1: Start the Backend

**Terminal 1:**
```bash
cd backend
npm start
```

**What you should see:**
```
Server running on port 5000
Health check: http://localhost:5000/api/health
```

**Tell the audience:**
> "The backend server is now running. It connects to our cloud database and is ready to receive and serve measurement data."

---

### Step 2: Start the Dashboard

**Terminal 2:**
```bash
cd frontend
npm run dev
```

**What you should see:**
```
VITE v8.2.2  ready in 350 ms
  ➜  Local:   http://localhost:5173/
```

Open `http://localhost:5173/` in a web browser.

**Tell the audience:**
> "This is our monitoring dashboard. It shows data from our wind turbine experiments."

---

### Step 3: Show the Static Dashboard

With only the backend running (no simulator), the dashboard shows:
- **Green "Backend Connected"** indicator
- **Metric cards** with the latest stored values
- **Experiment cards** (EXP-001, EXP-002, EXP-003)
- **Summary statistics** from the seed data
- **Power analysis charts**
- **Historical data table** (Page 1 of 15)

**Tell the audience:**
> "The dashboard currently shows data from our 300 pre-generated test measurements across three experiments, each with a different blade pitch angle."

---

### Step 4: Point Out Key Dashboard Sections

Scroll through and explain:

1. **Metric Cards** — "These show the most recent wind speed, voltage, current, and power."
2. **Experiment Section** — "We tested three pitch angles: 0°, 4°, and 20°."
3. **Summary Statistics** — "Average power across all experiments was about 10.7 watts."
4. **Power vs Wind Speed** — "This chart shows how power increases with wind speed."
5. **Power vs Pitch Angle** — "This shows average power at each pitch angle, but note the caveat about different wind conditions."

---

### Step 5: Start the Live Simulator

**Terminal 3:**
```bash
cd backend
npm run simulate
```

**What you should see:**
```
═══════════════════════════════════════════
  Wind Turbine Live Telemetry Simulator
═══════════════════════════════════════════
  🚀 Starting with EXP-001 (pitch=0°)
```

**Tell the audience:**
> "We're now simulating live measurement data — as if the real wind turbine were running. The simulator sends a new measurement 5 times per second."

---

### Step 6: Show Live Values Changing

Switch to the browser. The dashboard should now show:
- **Metric card values updating continuously** (wind speed, voltage, current, power changing)
- **SIMULATOR badge** in the header
- **Live chart moving** — select different metrics (Power, Wind Speed, Voltage)

**Tell the audience:**
> "Watch the numbers changing in real time. The live chart shows the trend over the last few seconds. When the real ESP32 hardware is connected, it will send data in exactly the same way."

---

### Step 7: Show Experiment Switching

Wait approximately 60 seconds. The simulator will switch experiments:
```
🔄 Switched to EXP-002 (pitch=4°, wind=3–6 m/s)
```

You should see the values change on the dashboard — different wind speed range, different pitch angle.

**Tell the audience:**
> "The simulator just switched to a different experiment with a different pitch angle. Notice how the wind speed range and power output changed."

---

### Step 8: Show Experiment Filtering

Click on the **EXP-002** card in the Experiments section. Observe:
- Summary statistics update to show only EXP-002 data
- Historical table shows only EXP-002 records
- Power charts update

**Tell the audience:**
> "By clicking an experiment, we can filter all the data to see only measurements from that specific test configuration."

---

### Step 9: Stop the Simulator

Press **Ctrl+C** in Terminal 3.

The simulator stops and prints:
```
  Simulator stopped
  Total sent:   1500
  Total errors: 0
```

The dashboard continues working — it shows the last known values and the historical data is still available.

**Tell the audience:**
> "The simulator has stopped. All the data it generated is permanently stored in our cloud database and can be analyzed at any time."

---

### Step 10: Explain the Future

**Tell the audience:**
> "In the final version, the software simulator will be replaced by the real ESP32 microcontroller connected to the wind turbine. The ESP32 will send real sensor readings over Wi-Fi in exactly the same format. No software changes will be needed — the system is ready for real hardware."
