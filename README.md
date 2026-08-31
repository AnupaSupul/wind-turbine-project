# Wind Turbine IoT Monitoring System

A real-time wind turbine monitoring and analysis system built for a university mechanical engineering project.

## What It Does

This system collects measurements from a wind turbine (wind speed, voltage, current, blade pitch angle), stores them in a cloud database, and displays them on a live dashboard.

```
ESP32 / Simulator  →  Backend (Node.js)  →  MongoDB Atlas
                                           ↕
                                    React Dashboard
```

## Architecture

<p align="center">
  <img src="./docs/assets/diagrams/overall-architecture.svg" alt="System Architecture" width="100%">
</p>

## Features

- **Live monitoring** — Dashboard updates 5 times per second
- **6 metric cards** — Wind speed, pitch angle, voltage, current, power, stepper position
- **Live trend chart** — Rolling time-series with metric selector
- **3 experiments** — EXP-001 (0°), EXP-002 (4°), EXP-003 (20°) pitch angles
- **Summary statistics** — Average, min, max across all measurements
- **Power analysis** — Power vs Wind Speed and Power vs Pitch Angle charts
- **Historical data** — Paginated table of all past measurements
- **Live simulator** — Generates realistic simulated telemetry for demonstrations

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)

### 1. Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment
Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/windturbine?retryWrites=true&w=majority
```

### 3. Seed data (optional)
```bash
cd backend
npm run seed
```

### 4. Run (3 terminals)

| Terminal | Command | Purpose |
|---|---|---|
| 1 | `cd backend && npm start` | Backend server |
| 2 | `cd frontend && npm run dev` | Dashboard |
| 3 | `cd backend && npm run simulate` | Live simulator |

### 5. Open dashboard
Navigate to `http://localhost:5173/`

## Current Status

| ⚙️ Component | 🚥 Status |
|---|---|
| **Backend + MongoDB Atlas** | ✅ Complete |
| **React Dashboard** | ✅ Complete |
| **Live Simulator** | ✅ Complete |
| **ESP32 Hardware** | ⏳ Not yet connected |

> [!NOTE]
> The system is fully functional with simulated data. The ESP32 will replace the simulator using the same HTTP API — no software changes needed.

## 📖 Documentation Index

Full documentation is neatly organized in the [`docs/`](./docs/) directory. We recommend reading in this order:

| 📁 Folder | 📄 Contents |
|---|---|
| **[`01_Overview`](./docs/01_Overview/)** | Project overview, purpose, and glossary |
| **[`02_System_Architecture`](./docs/02_System_Architecture/)** | Architecture, data flows, and SVG diagrams |
| **[`03_How_The_System_Works`](./docs/03_How_The_System_Works/)** | ESP32 logic, backend processing, MongoDB, frontend polling |
| **[`04_Wind_Turbine_Data`](./docs/04_Wind_Turbine_Data/)** | Telemetry measurements, experiment limits, power calculations |
| **[`05_Dashboard`](./docs/05_Dashboard/)** | Dashboard UI guide, live monitoring, analytics, and history |
| **[`06_Setup_And_Running`](./docs/06_Setup_And_Running/)** | Dependencies, installation steps, running the system & troubleshooting |
| **[`07_Data_Communication`](./docs/07_Data_Communication/)** | Internal HTTP API communication patterns and data persistence |
| **[`08_Technical_Reference`](./docs/08_Technical_Reference/)** | Full API reference, detailed project structure, and configurations |
| **[`09_Demo_Guide`](./docs/09_Demo_Guide/)** | University demo scripts, software simulation, and hardware plans |

## Technology Stack

| 🧩 Component | 🛠️ Technology |
|---|---|
| **Backend Server** | Node.js, Express, Mongoose |
| **Cloud Database** | MongoDB Atlas |
| **Frontend UI** | React, Vite, Recharts |
| **Communication** | HTTP (polling at 200ms) |
