# ESP32 to Backend Communication

## Overview

The ESP32 (or simulator) sends measurement data to the backend using standard web communication (HTTP).

## How It Works (Simple Explanation)

Think of it like a delivery service:

1. The ESP32 packages its sensor readings into a small data "parcel" (JSON format)
2. It sends this parcel over Wi-Fi to the backend's address
3. The backend opens the parcel, checks the contents, and stores it

This happens continuously — one delivery every 200 milliseconds (5 per second).

## Technical Details

**Protocol:** HTTP POST  
**URL:** `http://localhost:5000/api/telemetry`  
**Content type:** `application/json`

**Example message sent by ESP32/simulator:**

```json
{
  "experimentId": "EXP-001",
  "source": "simulator",
  "windSpeed": 3.45,
  "pitchAngle": 0,
  "stepperPosition": 2,
  "voltage": 6.82,
  "current": 1.05
}
```

**Backend responds with:**

```json
{
  "success": true,
  "data": {
    "experimentId": "EXP-001",
    "source": "simulator",
    "windSpeed": 3.45,
    "pitchAngle": 0,
    "stepperPosition": 2,
    "voltage": 6.82,
    "current": 1.05,
    "power": 7.161,
    "timestamp": "2026-08-29T13:50:07.992Z",
    "_id": "66d18aafdb..."
  }
}
```

Notice that `power` (7.161 W = 6.82 V × 1.05 A) was **calculated by the backend** and included in the response.

## Current vs Future

| | Current (Simulator) | Future (ESP32) |
|---|---|---|
| Sender | `liveSimulator.js` on the same computer | ESP32 hardware on the local network |
| Network | localhost (same machine) | Wi-Fi (local network) |
| `source` field | `"simulator"` | `"esp32"` |
| Data format | Identical | Identical |
| Backend changes needed | None | None |
