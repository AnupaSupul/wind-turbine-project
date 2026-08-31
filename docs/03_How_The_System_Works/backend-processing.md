# Backend Processing

## What Does the Backend Do?

The backend is a program that runs on your computer (on port 5000). Think of it as a middleman between the data sources and the dashboard.

## Step-by-Step Processing

When a measurement arrives at the backend, this is what happens:

### Step 1: Receive the Data
The backend listens for incoming measurements at the address:
```
POST http://localhost:5000/api/telemetry
```

### Step 2: Validate the Data
Before accepting a measurement, the backend checks that:

| Check | Rule |
|---|---|
| Experiment ID | Must be a non-empty text string |
| Wind Speed | Required, must be a number between 0 and 100 m/s |
| Pitch Angle | Required, must be a number between -90° and 90° |
| Voltage | Required, must be a number between 0 and 500 V |
| Current | Required, must be a number between 0 and 100 A |
| Source | Must be `simulator`, `esp32`, or `manual` |
| Stepper Position | Optional, must be a number if provided |

If any check fails, the measurement is **rejected** with a clear error message. This prevents bad data from entering the database.

### Step 3: Calculate Power
The backend calculates:

```
power = voltage × current
```

For example: 8.20 V × 1.10 A = **9.02 W**

This is done on the backend (not by the ESP32 or simulator) to ensure consistency.

### Step 4: Save to Database
The validated measurement (with calculated power) is saved to MongoDB Atlas. Every measurement is permanently stored.

### Step 5: Update the Memory Cache
The backend keeps the **most recent measurement** in its memory. This way, when the dashboard asks "what's the latest?", the backend can answer instantly without querying the database.

## Backend Structure

The backend code is organized into layers, each with a specific job:

| Layer | Files | Responsibility |
|---|---|---|
| Routes | `telemetryRoutes.js`, `analyticsRoutes.js` | Map URLs to the right function |
| Middleware | `validation.js` | Check incoming data before processing |
| Controllers | `telemetryController.js`, `analyticsController.js` | Handle requests and send responses |
| Services | `telemetryService.js`, `analyticsService.js` | Business logic (calculations, queries, caching) |
| Models | `Telemetry.js` | Define the data structure for the database |
| Config | `database.js` | Database connection settings |
