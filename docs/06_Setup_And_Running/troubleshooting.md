# Troubleshooting

## Common Problems and Solutions

### Backend Won't Start

**Symptom:** `npm start` fails or shows an error.

| 🚨 Error Message | 🔍 Cause | 🛠️ Solution |
|---|---|---|
| `Error: MONGO_URI is not set` | Missing `.env` file | Create `backend/.env` with `PORT` and `MONGO_URI` |
| `MongoServerSelectionError` | Wrong Atlas credentials or network | Check username/password in `MONGO_URI` |
| `address already in use :::5000` | Port `5000` is taken | Close the other program using port 5000, or change `PORT` in `.env` |
| `Cannot find module ...` | Missing dependencies | Run `npm install` in the `backend/` folder |

**How to find what's using port 5000 (Windows):**
```bash
netstat -ano | findstr :5000
```

---

### Frontend Won't Start

**Symptom:** `npm run dev` fails or the page won't load.

| 🚨 Error Message | 🔍 Cause | 🛠️ Solution |
|---|---|---|
| Port `5173` is in use | Another Vite instance is running | Close the other terminal running Vite, or kill the process |
| Shows port `5174` instead of `5173` | Another instance already on `5173` | Close all terminals and restart |
| Blank page | JavaScript error | Open browser console (F12) and check for errors |
| `Cannot find module ...` | Missing dependencies | Run `npm install` in the `frontend/` folder |

**How to find what's using port 5173 (Windows):**
```bash
netstat -ano | findstr :5173
```

---

### Dashboard Shows "Backend Offline"

**Symptom:** The red "Backend Offline" indicator appears.

**Causes:**
1. The backend is not running → Start it with `npm start` in the `backend/` folder
2. The backend crashed → Check the backend terminal for error messages
3. Wrong API URL → Check `frontend/.env` has `VITE_API_BASE_URL=http://localhost:5000`
4. CORS issue → The backend already has CORS enabled, but check for browser extensions blocking requests

---

### Simulator Cannot Send Data

**Symptom:** Simulator shows "Send failed" errors.

**Causes:**
1. Backend is not running → Start the backend first
2. Wrong URL → The simulator defaults to `http://localhost:5000`. If the backend runs on a different port, set `API_URL` environment variable

**When the backend comes back:** The simulator automatically resumes sending — no need to restart it.

---

### No Live Values on Dashboard

**Symptom:** Metric cards show "—" instead of numbers.

**Causes:**
1. No data in the database → Run `npm run seed` to add seed data
2. Simulator is not running → Start it with `npm run simulate`
3. Backend is offline → Start the backend

---

### MongoDB Atlas Connection Failed

**Symptom:** Backend shows a `MongoServerSelectionError`.

**Check list:**
1. ✅ Is the MONGO_URI in `.env` correct?
2. ✅ Is the password correct? (no special characters that need escaping?)
3. ✅ Is the database name `windturbine` in the URI?
4. ✅ Is your IP address whitelisted in Atlas?
   - In Atlas → Network Access → check your current IP is listed
   - For development, you can allow `0.0.0.0/0` (allow all IPs)
5. ✅ Is your internet connection working?

---

### Port Conflict — Multiple Instances Running

**Symptom:** Getting port 5174 instead of 5173, or port 5001 instead of 5000.

**Cause:** A previous instance is still running in the background.

**Solution (Windows):**
```bash
# Find and kill processes on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Find and kill processes on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

Then restart the backend and frontend.
