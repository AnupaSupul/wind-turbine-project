# Configuration Reference

## All Configuration Settings

### Backend — `.env` file (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Port the backend server listens on |
| `MONGO_URI` | *(required)* | MongoDB Atlas connection string |

### Frontend — `.env` file (`frontend/.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:5000` | Backend API URL |

### Simulator — Environment Variables

These can be set when running the simulator:

| Variable | Default | Description |
|---|---|---|
| `API_URL` | `http://localhost:5000` | Backend URL to send telemetry to |
| `SIM_INTERVAL` | `200` | Milliseconds between simulated measurements |

**Example usage:**
```bash
SIM_INTERVAL=1000 node scripts/liveSimulator.js
```

### Frontend — Hardcoded Settings (in source code)

| Setting | Value | Location |
|---|---|---|
| Polling interval | 200 ms | `src/hooks/usePolling.js` |
| Chart buffer size | 60 points | `src/hooks/usePolling.js` |
| History page size | 20 records | `src/components/HistoryTable.jsx` |

### Backend — Hardcoded Settings (in source code)

| Setting | Value | Location |
|---|---|---|
| Server timeout | 15000 ms | `src/config/database.js` |

### Database Indexes

| Index | Fields | Purpose |
|---|---|---|
| Timestamp index | `{ timestamp: -1 }` | Fast "most recent" queries |
| Experiment index | `{ experimentId: 1, timestamp: -1 }` | Fast per-experiment queries |

### Ports Summary

| Service | Port | Configurable? |
|---|---|---|
| Backend | 5000 | ✅ Via `PORT` in `.env` |
| Frontend | 5173 | ⚠️ Vite picks automatically |
