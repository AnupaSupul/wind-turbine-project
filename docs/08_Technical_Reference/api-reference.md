# API Reference

This is a developer-focused reference for the backend API endpoints.

## Base URL

```
http://localhost:5000
```

---

## Health Check

### `GET /api/health`

Check if the backend is running.

**Response:**
```json
{
  "success": true,
  "message": "Wind Turbine API is healthy",
  "timestamp": "2026-08-29T13:50:07.992Z",
  "uptime": 3600
}
```

---

## Telemetry Endpoints

### `POST /api/telemetry`

Submit a new telemetry measurement. The backend validates the data, calculates power, saves to MongoDB, and updates the in-memory cache.

**Request body:**
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

| Field | Type | Required | Constraints |
|---|---|---|---|
| `experimentId` | string | ✅ | Non-empty |
| `source` | string | Optional | `simulator`, `esp32`, or `manual` (default: `simulator`) |
| `windSpeed` | number | ✅ | 0–100 m/s |
| `pitchAngle` | number | ✅ | -90° to 90° |
| `voltage` | number | ✅ | 0–500 V |
| `current` | number | ✅ | 0–100 A |
| `stepperPosition` | number | Optional | Any number |

**Success response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "66d18aafdb...",
    "experimentId": "EXP-001",
    "source": "simulator",
    "windSpeed": 3.45,
    "pitchAngle": 0,
    "stepperPosition": 2,
    "voltage": 6.82,
    "current": 1.05,
    "power": 7.161,
    "timestamp": "2026-08-29T13:50:07.992Z"
  }
}
```

**Validation error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["windSpeed must be between 0 and 100 m/s"]
}
```

---

### `GET /api/telemetry/latest`

Get the most recent telemetry record. Served from the in-memory cache (no database query).

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "66d18aafdb...",
    "experimentId": "EXP-001",
    "source": "simulator",
    "windSpeed": 3.45,
    "pitchAngle": 0,
    "voltage": 6.82,
    "current": 1.05,
    "power": 7.161,
    "timestamp": "2026-08-29T13:50:07.992Z"
  }
}
```

---

### `GET /api/telemetry/history`

Get historical records with pagination and optional filters.

**Query parameters:**

| Parameter | Default | Description |
|---|---|---|
| `limit` | 50 | Records per page (max varies) |
| `page` | 1 | Page number |
| `experimentId` | — | Filter by experiment |
| `source` | — | Filter by source |

**Example:** `GET /api/telemetry/history?limit=20&page=2&experimentId=EXP-001`

**Response:**
```json
{
  "success": true,
  "data": [ /* array of telemetry records */ ],
  "pagination": {
    "total": 100,
    "page": 2,
    "pages": 5,
    "limit": 20
  }
}
```

---

## Analytics Endpoints

### `GET /api/analytics/summary`

Get aggregate statistics (avg, min, max) for wind speed, power, voltage, and current.

**Query parameters:**

| Parameter | Description |
|---|---|
| `experimentId` | Optional — filter by experiment |

**Response:**
```json
{
  "success": true,
  "data": {
    "count": 300,
    "windSpeed": { "avg": "4.75", "min": "2.66", "max": "6.58" },
    "power": { "avg": "10.71", "min": "3.11", "max": "19.89" },
    "voltage": { "avg": "7.16", "min": "4.48", "max": "9.32" },
    "current": { "avg": "1.44", "min": "0.66", "max": "2.13" }
  }
}
```

---

### `GET /api/analytics/power`

Get power analysis data for charting: power grouped by wind speed and by pitch angle, plus per-experiment summaries.

**Query parameters:**

| Parameter | Description |
|---|---|
| `experimentId` | Optional — filter by experiment |

**Response:**
```json
{
  "success": true,
  "data": {
    "powerByWindSpeed": [
      { "windSpeed": 3, "avgPower": 8.5, "minPower": 6.2, "maxPower": 11.0, "count": 45 }
    ],
    "powerByPitchAngle": [
      { "pitchAngle": 0, "avgPower": 11.2, "avgWindSpeed": 3.5, "count": 100 }
    ],
    "experiments": [
      {
        "experimentId": "EXP-001",
        "avgPower": 11.2,
        "avgWindSpeed": 3.5,
        "pitchAngle": 0,
        "count": 100,
        "source": "simulator"
      }
    ]
  }
}
```
