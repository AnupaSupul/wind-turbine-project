# Hardware Demo Guide

## Status: Not Yet Connected

The real ESP32 hardware is **not currently connected** to this system. This page describes the plan for when it is ready.

## What Changes When Hardware Is Connected

Almost nothing on the software side:

| Component | Change Required |
|---|---|
| Backend | ❌ No changes |
| Dashboard | ❌ No changes |
| Database | ❌ No changes |
| Simulator | Stop running it (no longer needed) |
| ESP32 firmware | ✅ Must be programmed |

## How It Will Work

### 1. ESP32 Firmware
The ESP32 must be programmed to:
- Read sensor values (INA219 for voltage/current, wind sensor for wind speed)
- Know the current pitch angle and stepper position
- Format data as JSON
- Send HTTP POST requests to the backend over Wi-Fi

### 2. Wi-Fi Connection
The ESP32 connects to the same Wi-Fi network as the computer running the backend.

### 3. HTTP POST
The ESP32 sends data to:
```
POST http://<computer-ip>:5000/api/telemetry
```

With `source` set to `"esp32"`:
```json
{
  "experimentId": "EXP-001",
  "source": "esp32",
  "windSpeed": 4.52,
  "pitchAngle": 4,
  "stepperPosition": 200,
  "voltage": 8.20,
  "current": 1.10
}
```

### 4. Dashboard Changes Automatically
The dashboard will:
- Show **REAL HARDWARE** (green badge) instead of SIMULATOR
- Display real sensor values
- Show the same charts and analytics with real data
- No code changes needed

## Before the Demo

1. Connect ESP32 to Wi-Fi
2. Verify the backend is reachable from the ESP32's network
3. Stop the simulator (if running)
4. Start sending data from the ESP32
5. Open the dashboard — it should show live real values

## Verify Hardware Data

To confirm real data is being received:
- Dashboard shows `REAL HARDWARE` badge
- Historical table shows records with source `ESP32`
- Values match expected ranges from actual sensors
